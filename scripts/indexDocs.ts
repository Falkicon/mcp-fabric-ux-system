import { promises as fs } from 'node:fs';
import path from 'node:path';
import * as glob from 'glob';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
// @ts-ignore - Suppress type error for remark-stringify
import remarkStringify from 'remark-stringify';
import yaml from 'js-yaml';
import { pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';
import url from 'node:url'; // Import the url module

// --- Pinecone Client Import ---\
import { Pinecone, type Index, type PineconeRecord, type RecordMetadata } from '@pinecone-database/pinecone';

// --- Configuration Import ---\
import {
    docsPath,
    embeddingModelName,
    pineconeApiKey,
    // pineconeEnvironment, // Environment likely inferred or not needed for Index()
    pineconeIndexName,
} from '../src/config.js';

// --- Constants ---\
const EMBEDDING_MODEL = embeddingModelName;
const PINECONE_UPSERT_BATCH_SIZE = 100;

// --- Interfaces ---\
// Define interface explicitly matching Pinecone requirements
// Keep lastUpdated as string, but handle undefined during assignment
interface DocMetadata extends RecordMetadata {
    doc_id: string;
    title: string;
    area: string;
    tags: string[];
    lastUpdated: string; // Required string if present on the object
    filePath: string;
    chunkId: string;
    section: string;
    textContent: string;
}

// --- Initialization ---\
let embedder: FeatureExtractionPipeline | null = null;
let pinecone: Pinecone | null = null;
let pineconeIndex: Index<DocMetadata> | null = null; // Specify metadata type

export async function initialize() {
    // --- Input Validation ---\
    if (!pineconeApiKey) {
        throw new Error("Pinecone API key is missing. Check PINECONE_API_KEY environment variable.");
    }
    if (!pineconeIndexName) {
        throw new Error("Pinecone index name is missing. Check PINECONE_INDEX_NAME environment variable.");
    }

    console.log(`Initializing embedding model: ${EMBEDDING_MODEL}...`);
    embedder = await pipeline('feature-extraction', EMBEDDING_MODEL, {
        quantized: true,
    });
    console.log('Embedding model initialized.');

    console.log(`Initializing Pinecone client...`);
    // Initialize relying on environment variable PINECONE_API_KEY
    pinecone = new Pinecone();
    console.log('Pinecone client initialized.');

    // Check if index exists and is ready
    console.log(`Checking Pinecone index '${pineconeIndexName}'...`);
    try {
        const description = await pinecone.describeIndex(pineconeIndexName);
        if (!description.status?.ready) {
             throw new Error(`Pinecone index '${pineconeIndexName}' exists but is not ready. Status: ${JSON.stringify(description.status)}`);
        }
         console.log(`Pinecone index '${pineconeIndexName}' is ready. Status: ${JSON.stringify(description.status)}`);
    } catch (error: any) {
        if (error.message && error.message.includes('NotFound')) {
             console.error(`ERROR: Pinecone index '${pineconeIndexName}' not found.`);
             console.error('Please create the index in the Pinecone console with the correct dimension (e.g., 384) and metric (e.g., cosine).');
        } else {
             console.error(`ERROR: Failed to describe Pinecone index '${pineconeIndexName}'.`, error);
        }
        throw error;
    }

    // Get a handle to the index, specifying the metadata type
    pineconeIndex = pinecone.Index<DocMetadata>(pineconeIndexName);
    console.log(`Obtained handle for Pinecone index '${pineconeIndexName}'.`);
}

// --- Core Logic ---\
export async function processFile(
    filePath: string,
    embedderPipeline: FeatureExtractionPipeline
): Promise<PineconeRecord<DocMetadata>[]> {
    console.log(`[processFile: ${path.basename(filePath)}] Entering function.`);

    if (!embedderPipeline) {
        console.error(`[processFile: ${path.basename(filePath)}] ERROR: Embedder pipeline was not provided.`);
        throw new Error('Embedder pipeline was not provided to processFile.');
    }
    console.log(`[processFile: ${path.basename(filePath)}] Processing: ${path.relative(process.cwd(), filePath)}`);

    const vectorsForPinecone: PineconeRecord<DocMetadata>[] = [];

    try {
        console.log(`[processFile: ${path.basename(filePath)}] Attempting to read file: ${filePath}`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        console.log(`[processFile: ${path.basename(filePath)}] Successfully read file (${fileContent.length} chars).`);

        console.log(`[processFile: ${path.basename(filePath)}] Initializing unified processor.`);
        const processor = unified()
            .use(remarkParse)
            .use(remarkFrontmatter, ['yaml'])
            .use(remarkStringify);

        console.log(`[processFile: ${path.basename(filePath)}] Parsing file content with unified.`);
        const tree = processor.parse(fileContent);
        console.log(`[processFile: ${path.basename(filePath)}] Content parsed. Tree root type: ${tree.type}`);

        let frontmatter: Record<string, unknown> = {};
        let yamlEndOffset = 0;
        console.log(`[processFile: ${path.basename(filePath)}] Checking for YAML frontmatter node.`);
        const firstChild = tree.children?.[0];
        if (firstChild?.type === 'yaml') {
           const yamlNode = firstChild;
           console.log(`[processFile: ${path.basename(filePath)}] Found YAML node, attempting to parse.`);
            try {
                frontmatter = yaml.load(yamlNode.value as string) as Record<string, unknown>;
                yamlEndOffset = yamlNode.position?.end?.offset ?? 0;
                console.log(`[processFile: ${path.basename(filePath)}] Successfully parsed YAML frontmatter:`, Object.keys(frontmatter));
            } catch (e) {
                 console.warn(`[processFile: ${path.basename(filePath)}] WARN: Failed to parse YAML frontmatter. Error:`, e);
                return vectorsForPinecone;
            }
        } else {
            console.warn(`[processFile: ${path.basename(filePath)}] WARN: No YAML frontmatter node found. Skipping file.`);
            return vectorsForPinecone;
        }

        console.log(`[processFile: ${path.basename(filePath)}] Validating required frontmatter fields (id, title, area).`);
        const requiredFields = ['id', 'title', 'area'];
        const missingFields = requiredFields.filter(field => !frontmatter[field] || typeof frontmatter[field] !== 'string');

        if (missingFields.length > 0) {
             console.warn(`[processFile: ${path.basename(filePath)}] WARN: Missing required string frontmatter fields: [${missingFields.join(', ')}]. Skipping file.`);
             return vectorsForPinecone;
        }
        const docId = frontmatter.id as string;
        const title = frontmatter.title as string;
        const area = frontmatter.area as string;

        let tags: string[] = [];
        if (Array.isArray(frontmatter.tags)) {
            tags = frontmatter.tags.map(String).filter(tag => tag.trim() !== '');
        } else if (typeof frontmatter.tags === 'string') {
            tags = frontmatter.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
        }
        // Get lastUpdated as string | undefined
        const lastUpdated = frontmatter.lastUpdated ? String(frontmatter.lastUpdated) : undefined;

        console.log(`[processFile: ${path.basename(filePath)}] Extracting content based on section markers.`);
        const rawContentWithoutFrontmatter = fileContent.substring(yamlEndOffset).trim();

        const sectionRegex = /<!--\s*BEGIN-SECTION:\s*(.*?)\s*-->(.*?)<!--\s*END-SECTION:\s*\1\s*-->/gs;
        let match: RegExpExecArray | null;
        let lastIndex = 0;
        const sections: { name: string; text: string }[] = [];

        while ((match = sectionRegex.exec(rawContentWithoutFrontmatter)) !== null) {
            const sectionName = match[1]?.trim() || 'unknown-section';
            const sectionText = match[2]?.trim() || '';
            const precedingText = rawContentWithoutFrontmatter.substring(lastIndex, match.index).trim();

            let combinedText = sectionText;
            if (precedingText) {
                combinedText = `${precedingText}\n\n${sectionText}`;
            }
            if (combinedText) {
                 sections.push({ name: sectionName, text: combinedText });
                 console.log(`[processFile: ${path.basename(filePath)}] Found section: '${sectionName}', Length: ${combinedText.length}`);
            }
            lastIndex = sectionRegex.lastIndex;
        }
        const remainingText = rawContentWithoutFrontmatter.substring(lastIndex).trim();

        // Add extra check before accessing last element
        if (remainingText && sections.length > 0) {
             const lastSection = sections[sections.length - 1];
             if(lastSection){ // Satisfy linter
                lastSection.text += `\n\n${remainingText}`;
                console.log(`[processFile: ${path.basename(filePath)}] Appended ${remainingText.length} trailing chars to last section '${lastSection.name}'`);
             }
        } else if (remainingText && sections.length === 0) {
             console.log(`[processFile: ${path.basename(filePath)}] No section markers found, treating entire content as one chunk.`);
             sections.push({ name: 'content', text: remainingText });
        }

        if (sections.length === 0) {
            console.warn(`[processFile: ${path.basename(filePath)}] WARN: No content sections found or extracted in ${filePath}. Skipping.`);
        }

        console.log(`[processFile: ${path.basename(filePath)}] Starting chunk processing loop for ${sections.length} sections.`);
        for (const section of sections) {
            const sanitizedSectionName = section.name.toLowerCase().replace(/[^a-z0-9\-]+/g, '-').replace(/^-+|-+$/g, '');
            const chunkId = `${docId}-section-${sanitizedSectionName || 'content'}`;

            let textToEmbed = section.text;
            let sectionHeaderText = section.name;
            const headerRegex = /^##\s+(.*?)(?:\s*\(.*\))?\s*$/m;
            const headerMatch = section.text.match(headerRegex);
            if (headerMatch?.[1]) { // Use optional chaining
                sectionHeaderText = headerMatch[1].trim();
                textToEmbed = `${sectionHeaderText}\n\n${section.text}`;
            } else {
                 console.log(`[processFile: ${path.basename(filePath)}] No H2 header found in section '${section.name}', using marker name.`);
                 sectionHeaderText = section.name;
            }

            if (!textToEmbed || textToEmbed.length === 0) {
                console.warn(`[processFile: ${path.basename(filePath)}] WARN: Skipping empty chunk ${chunkId}.`);
                continue;
            }

            console.log(`[processFile: ${path.basename(filePath)}] Generating embedding for chunk ${chunkId}. Input length: ${textToEmbed.length}`);
            const output = await embedderPipeline(textToEmbed, { pooling: 'mean', normalize: true });
            const embeddingValues: number[] = Array.from(output.data as Float32Array);
            console.log(`[processFile: ${path.basename(filePath)}] Embedding generated for chunk ${chunkId}. Dimension: ${embeddingValues.length}`);

            // Create metadata object for Pinecone, omitting lastUpdated if undefined
            // Initialize without lastUpdated first
            const metadataPayload: DocMetadata = {
                doc_id: docId,
                title: title,
                area: area,
                tags: tags,
                filePath: path.relative(process.cwd(), filePath),
                chunkId: chunkId,
                section: sectionHeaderText,
                textContent: section.text,
                // We need to assign lastUpdated conditionally but satisfy the type
                // Since the interface requires it, but Pinecone doesn't allow undefined,
                // we only add it if it exists. TypeScript should infer this correctly
                // when checking the final object shape against the Index<DocMetadata> type.
                // Hacky: Assign an empty string initially to satisfy the type checker for the object literal,
                // then overwrite or ensure it's set correctly in the conditional.
                // This property will be effectively absent if lastUpdated is undefined.
                lastUpdated: '', // Temporary placeholder to satisfy the type
            };

            // Conditionally assign the actual lastUpdated value if it exists
            if (lastUpdated !== undefined) {
                metadataPayload.lastUpdated = lastUpdated;
            } else {
                // If lastUpdated is undefined, remove the placeholder property
                // This ensures we don't send an empty string if it wasn't defined.
                delete (metadataPayload as Partial<DocMetadata>).lastUpdated;
            }

            const vector: PineconeRecord<DocMetadata> = {
                id: chunkId,
                values: embeddingValues,
                metadata: metadataPayload,
            };

            vectorsForPinecone.push(vector);
            console.log(`[processFile: ${path.basename(filePath)}] Prepared Pinecone vector for chunk ${chunkId}.`);
        }
        console.log(`[processFile: ${path.basename(filePath)}] Finished chunk processing loop.`);

    } catch (error) {
        console.error(`[processFile: ${path.basename(filePath)}] ERROR during processing:`, error);
        return [];
    }

    console.log(`[processFile: ${path.basename(filePath)}] Returning ${vectorsForPinecone.length} processed vectors.`);
    return vectorsForPinecone;
}

// --- Main Execution ---\
export async function main() {
    try {
        await initialize();

        if (!pineconeIndex || !embedder) {
             throw new Error("Pinecone index handle or embedder not available after initialization.");
        }
        const currentIndex = pineconeIndex;
        const currentEmbedder = embedder;

        // --- Optional: Clear existing vectors (USE WITH CAUTION) ---\
        // console.log(`WARNING: Clearing all vectors from index '${pineconeIndexName}'...`);
        // await currentIndex.deleteAll();
        // console.log(`Index '${pineconeIndexName}' cleared.`);
        // await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second pause

        console.log(`\nScanning for markdown files in: ${docsPath}`);
        const files = glob.sync('**/*.md', { cwd: docsPath, absolute: true });
        console.log(`Found ${files.length} markdown files.`);

        console.log('\nProcessing files and preparing data for Pinecone...');
        let totalVectorsProcessed = 0;
        const vectorBatch: PineconeRecord<DocMetadata>[] = [];

        console.log(`Processing ${files.length} files...`);
        for (const file of files) {
            const fileVectors = await processFile(file, currentEmbedder);

            if (fileVectors.length > 0) {
                vectorBatch.push(...fileVectors);
                totalVectorsProcessed += fileVectors.length;

                // Upsert in batches
                if (vectorBatch.length >= PINECONE_UPSERT_BATCH_SIZE) {
                    console.log(`Upserting batch of ${vectorBatch.length} vectors to Pinecone index '${pineconeIndexName}'...`);
                    try {
                        // Use the correctly typed index handle
                        await currentIndex.upsert(vectorBatch);
                        console.log(`Batch upsert successful.`);
                    } catch (upsertError) {
                        console.error(`ERROR during Pinecone batch upsert:`, upsertError);
                    }
                    vectorBatch.length = 0; // Clear the batch
                }
            } else {
                 console.log(`[Main] No vectors generated for file: ${path.basename(file)}. Skipping.`);
            }
        }

        // Upsert any remaining vectors in the last batch
        if (vectorBatch.length > 0) {
            console.log(`Upserting final batch of ${vectorBatch.length} vectors to Pinecone index '${pineconeIndexName}'...`);
            try {
                 // Use the correctly typed index handle
                await currentIndex.upsert(vectorBatch);
                console.log(`Final batch upsert successful.`);
            } catch (upsertError) {
                 console.error(`ERROR during final Pinecone batch upsert:`, upsertError);
            }
            vectorBatch.length = 0; // Clear the batch
        }

        console.log(`\nCollected and attempted to upsert ${totalVectorsProcessed} total vectors from ${files.length} files.`);

        // Optional: Get index stats after upserting
        try {
             console.log(`Fetching final stats for index '${pineconeIndexName}'...`);
             await new Promise(resolve => setTimeout(resolve, 2000)); // Short delay
             const stats = await currentIndex.describeIndexStats();
             console.log(`Index stats: ${JSON.stringify(stats, null, 2)}`);
        } catch (statsError) {
             console.error(`WARN: Could not fetch final index stats.`, statsError);
        }


        console.log('\nIndexing script logic finished.');

    } catch (error) {
        console.error('FATAL ERROR during indexing:', error);
        process.exitCode = 1;
    } finally {
        console.log('Script execution finished.');
    }
}

// Check if the script is being run directly
if (process.argv[1] && import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    main().catch(error => {
        console.error("Unhandled error in main execution:", error);
        process.exit(1);
    });
}
