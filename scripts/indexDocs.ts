import { promises as fs } from 'node:fs';
import path from 'node:path';
import * as glob from 'glob';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
// @ts-ignore - Suppress type error for remark-stringify
import remarkStringify from 'remark-stringify';
import yaml from 'js-yaml';
import { pipeline, env, type Pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';
// Import ChromaDB types
import { ChromaClient, type Collection, type Embedding, type Metadatas, type Documents, type IDs, type Embeddings, type Metadata, IncludeEnum } from 'chromadb';
import url from 'node:url'; // Import the url module

// --- Constants ---
const DOCS_PATH = path.resolve(process.cwd(), '_docs_fabric_ux');
// Use Chroma server path instead of local path - Use IPv4 loopback
const CHROMA_SERVER_URL = process.env.CHROMA_SERVER_URL || 'http://127.0.0.1:8000';
const COLLECTION_NAME = 'fabric_ux_docs';
const EMBEDDING_MODEL = 'Xenova/all-MiniLM-L6-v2';
// const VECTOR_COLUMN_NAME = 'vector'; // No longer needed

// --- Interfaces ---
// Chroma uses Metadatas type which is Record<string, any>
interface DocMetadata extends Record<string, unknown> {
    id: string;
    title: string;
    area: string;
    tags: string; // Keep as JSON string for Chroma metadata
    lastUpdated: string;
    filePath: string;
    chunkId: string;
}

// --- Initialization ---
let embedder: FeatureExtractionPipeline | null = null;
let collection: Collection | null = null; // ChromaDB collection
let chromaClient: ChromaClient | null = null;

// Export for testing
export async function initialize() {
    console.log(`Initializing embedding model: ${EMBEDDING_MODEL}...`);
    embedder = await pipeline('feature-extraction', EMBEDDING_MODEL, {
        quantized: true,
    });
    console.log('Embedding model initialized.');

    console.log(`Initializing ChromaDB client for server at ${CHROMA_SERVER_URL}...`);
    chromaClient = new ChromaClient({ path: CHROMA_SERVER_URL }); // Connect to server URL
    // Optional: Add auth headers if needed via fetchOptions
    // chromaClient = new ChromaClient({
    //     path: CHROMA_SERVER_URL,
    //     fetchOptions: {
    //         headers: {
    //             Authorization: `Bearer ${process.env.CHROMA_API_KEY}`,
    //             'X-Chroma-Token': process.env.CHROMA_AUTH_TOKEN // Example auth methods
    //         }
    //     }
    // });
    console.log('ChromaDB client initialized.');

    // Ping server to check connection
    try {
        console.log('Pinging ChromaDB server...');
        const version = await chromaClient.version();
        console.log(`ChromaDB server version: ${version}`);
        const heartbeat = await chromaClient.heartbeat(); // Returns nanoseconds
        console.log(`ChromaDB server heartbeat: ${heartbeat / 1_000_000_000} seconds`);
    } catch (pingError) {
        console.error('ERROR: Failed to connect to ChromaDB server. Is it running?', pingError);
        throw pingError; // Re-throw to stop the script
    }

    console.log(`Getting or creating collection: ${COLLECTION_NAME}...`);
    collection = await chromaClient.getOrCreateCollection({ name: COLLECTION_NAME });
    console.log('Collection obtained.');
}

// --- Core Logic ---
// Accept embedder as an argument for testability
export async function processFile(filePath: string, embedderPipeline: FeatureExtractionPipeline): Promise<{
    ids: IDs;
    embeddings: Embeddings;
    metadatas: Metadata[];
    documents: Documents;
}> {
    // [LOG] Entering processFile
    console.log(`[processFile: ${path.basename(filePath)}] Entering function.`);

    // Use the passed embedderPipeline instead of the global variable
    if (!embedderPipeline) {
        // [LOG] Missing embedder pipeline
        console.error(`[processFile: ${path.basename(filePath)}] ERROR: Embedder pipeline was not provided.`);
        throw new Error('Embedder pipeline was not provided to processFile.');
    }
    console.log(`[processFile: ${path.basename(filePath)}] Processing: ${path.relative(process.cwd(), filePath)}`);

    const result = {
        ids: [] as IDs,
        embeddings: [] as Embeddings,
        metadatas: [] as Metadata[],
        documents: [] as Documents,
    };

    try {
        // [LOG] Before reading file
        console.log(`[processFile: ${path.basename(filePath)}] Attempting to read file: ${filePath}`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        // [LOG] After reading file
        console.log(`[processFile: ${path.basename(filePath)}] Successfully read file (${fileContent.length} chars).`);

        // [LOG] Before unified processing
        console.log(`[processFile: ${path.basename(filePath)}] Initializing unified processor.`);
        const processor = unified()
            .use(remarkParse)
            .use(remarkFrontmatter, ['yaml'])
            .use(remarkStringify);
        // [LOG] Before parsing content
        console.log(`[processFile: ${path.basename(filePath)}] Parsing file content with unified.`);
        const tree = processor.parse(fileContent);
        // [LOG] After parsing content
        console.log(`[processFile: ${path.basename(filePath)}] Content parsed. Tree root type: ${tree.type}`);

        let frontmatter: Record<string, unknown> = {};
        let yamlEndOffset = 0; // Variable to store the end offset
        // [LOG] Checking for frontmatter
        console.log(`[processFile: ${path.basename(filePath)}] Checking for YAML frontmatter node.`);
        const firstChild = tree.children?.[0]; // Use optional chaining
        if (firstChild?.type === 'yaml') {
           const yamlNode = firstChild;
           // [LOG] Found YAML node, attempting to parse.
           console.log(`[processFile: ${path.basename(filePath)}] Found YAML node, attempting to parse.`);
            try {
                frontmatter = yaml.load(yamlNode.value as string) as Record<string, unknown>;
                yamlEndOffset = yamlNode.position?.end?.offset ?? 0; // Store the end offset
                // [LOG] Successfully parsed YAML.
                console.log(`[processFile: ${path.basename(filePath)}] Successfully parsed YAML frontmatter:`, Object.keys(frontmatter));
            } catch (e) {
                // [LOG] YAML parse error.
                 console.warn(`[processFile: ${path.basename(filePath)}] WARN: Failed to parse YAML frontmatter. Error:`, e);
                // Return empty result as parsing failed
                return result;
            }
            tree.children.shift(); // Remove frontmatter node
        } else {
             // [LOG] No YAML node found.
            console.warn(`[processFile: ${path.basename(filePath)}] WARN: No YAML frontmatter node found at the beginning of the document.`);
             // Return empty result as frontmatter is required
            return result;
        }

        // [LOG] Validating required frontmatter fields.
        console.log(`[processFile: ${path.basename(filePath)}] Validating required frontmatter fields (id, title, area).`);
        const requiredFields = ['id', 'title', 'area'];
        const missingFields = requiredFields.filter(field => !frontmatter[field]);

        if (missingFields.length > 0) {
            // [LOG] Missing required frontmatter fields.
             // Log a more specific warning about which fields are missing
             console.warn(`[processFile: ${path.basename(filePath)}] WARN: Missing required frontmatter fields in file '${path.relative(process.cwd(), filePath)}'. Missing: [${missingFields.join(', ')}]. Found keys: [${Object.keys(frontmatter).join(', ')}]`);
             // Return empty result as required fields are missing for indexing
             return result;
        }
        // [LOG] Required fields present.
        console.log(`[processFile: ${path.basename(filePath)}] Required frontmatter fields found.`);

        // [LOG] Processing content using SECTION markers.
        console.log(`[processFile: ${path.basename(filePath)}] Extracting content based on section markers.`);

        // Use raw file content for regex matching to preserve structure within markers
        const rawContentWithoutFrontmatter = fileContent.substring(yamlEndOffset).trim();

        const sectionRegex = /<!--\s*BEGIN-SECTION:\s*(.*?)\s*-->(.*?)<!--\s*END-SECTION:\s*\1\s*-->/gs;
        let match: RegExpExecArray | null;
        let lastIndex = 0;
        const sections: { name: string; text: string }[] = [];

        while (true) {
            match = sectionRegex.exec(rawContentWithoutFrontmatter);
            if (match === null) {
                break; // Exit loop if no more matches
            }
            const sectionName = match[1]?.trim() ?? 'unknown-section'; // Add nullish coalescing
            const sectionText = match[2]?.trim() ?? ''; // Add nullish coalescing
            const precedingText = rawContentWithoutFrontmatter.substring(lastIndex, match.index).trim();

            let combinedText = sectionText;
            // Prepend preceding text to the current section's content
            if (precedingText) {
                combinedText = `${precedingText}\n\n${sectionText}`;
                console.log(`[processFile: ${path.basename(filePath)}] Prepended ${precedingText.length} chars to section '${sectionName}'`);
            }

            if (combinedText) {
                 sections.push({ name: sectionName, text: combinedText });
                 console.log(`[processFile: ${path.basename(filePath)}] Found section: '${sectionName}', Length: ${combinedText.length}`);
            }
            lastIndex = sectionRegex.lastIndex;
        }

        // Handle any remaining content after the last marker
        const remainingText = rawContentWithoutFrontmatter.substring(lastIndex).trim();
        const lastSection = sections[sections.length - 1]; // Get last section once
        if (remainingText && lastSection) { // Check if lastSection exists
            lastSection.text += `\n\n${remainingText}`; // Append to the last section
            console.log(`[processFile: ${path.basename(filePath)}] Appended ${remainingText.length} trailing chars to last section '${lastSection.name}'`);
        } else if (remainingText && sections.length === 0) {
             // If NO sections were found, treat the whole remaining content as one chunk
             console.log(`[processFile: ${path.basename(filePath)}] No section markers found, treating entire content as one chunk.`);
             sections.push({ name: 'default', text: remainingText });
        }

        if (sections.length === 0) {
            console.warn(`[processFile: ${path.basename(filePath)}] WARN: No content sections found or extracted in ${filePath}`);
        }

        // [LOG] Starting chunk processing loop based on sections.
        console.log(`[processFile: ${path.basename(filePath)}] Starting chunk processing loop for ${sections.length} sections.`);
        for (const section of sections) { // Use for...of loop
            if (!section) continue; // Add safety check for undefined section (though unlikely with for...of)
            // Sanitize section name for use in ID
            const sanitizedSectionName = section.name.toLowerCase().replace(/[^a-z0-9\-]+/g, '-').replace(/^-+|-+$/g, '');
            const chunkId = `${frontmatter.id}-section-${sanitizedSectionName || 'content'}`;

            // --- BEGIN: Prepend Header Logic ---
            let textToEmbed = section.text;
            let sectionHeaderText = section.name; // Default to name from marker

            // Regex to find the first H2 header within the section text
            const headerRegex = /^##\s+(.*?)(?:\s*\(.*\))?\s*$/m;
            const headerMatch = section.text.match(headerRegex);

            if (headerMatch?.[1]) {
                sectionHeaderText = headerMatch[1].trim(); // Get clean header text
                // Prepend the found header to the text for embedding
                textToEmbed = `${sectionHeaderText}\n\n${section.text}`;
                console.log(`[processFile: ${path.basename(filePath)}] Prepended header '${sectionHeaderText}' to chunk ${section.name}`);
            } else {
                 console.log(`[processFile: ${path.basename(filePath)}] No H2 header found in section '${section.name}', using marker name.`);
                 // Optionally prepend the marker name if no header found?
                 // textToEmbed = `${section.name}\n\n${section.text}`;
            }
            // --- END: Prepend Header Logic ---

            // [LOG] Processing chunk.
            console.log(`[processFile: ${path.basename(filePath)}] Processing chunk ${section.name}. Length: ${section.text.length} (Embedding length: ${textToEmbed.length})`);

            // [LOG] Before generating embedding.
            console.log(`[processFile: ${path.basename(filePath)}] Generating embedding for chunk ${section.name}.`);
            // Use textToEmbed (Header + Content) for embedding
            const output = await embedderPipeline(textToEmbed, { pooling: 'mean', normalize: true });
            const embedding: Embedding = Array.from(output.data as Float32Array);
            // [LOG] After generating embedding.
            console.log(`[processFile: ${path.basename(filePath)}] Embedding generated for chunk ${section.name}. Length: ${embedding.length}`);

            result.ids.push(chunkId);
            result.embeddings.push(embedding);
            result.documents.push(section.text); // Store the ORIGINAL section text (without prepended header)
            const metadataItem: Metadata = {
                id: frontmatter.id as string,
                title: frontmatter.title as string,
                area: frontmatter.area as string,
                tags: JSON.stringify(frontmatter.tags || []), 
                lastUpdated: frontmatter.lastUpdated as string,
                filePath: path.relative(process.cwd(), filePath),
                chunkId: chunkId,
                section: sectionHeaderText // Store the extracted or marker section name
            };
            result.metadatas.push(metadataItem);
            // [LOG] Added chunk data to results.
            console.log(`[processFile: ${path.basename(filePath)}] Added chunk ${section.name} data to results array.`);
        }
         // [LOG] Finished chunk processing loop.
        console.log(`[processFile: ${path.basename(filePath)}] Finished chunk processing loop.`);

    } catch (error) {
        // [LOG] Error during processing.
        console.error(`[processFile: ${path.basename(filePath)}] ERROR during processing:`, error);
        // Return empty result on error
    }

    // [LOG] Returning results.
    console.log(`[processFile: ${path.basename(filePath)}] Returning ${result.ids.length} processed chunks.`);
    return result;
}

// --- Main Execution ---
// Export for potential integration testing
export async function main() {
    try {
        await initialize(); // Initialization now includes server ping

        // Type assertion for embedder after check
        if (!collection || !embedder) { 
             throw new Error("ChromaDB collection or embedder not available after initialization.");
        }
        const currentEmbedder = embedder; // Use a new variable after the check

        console.log(`\nScanning for markdown files in: ${DOCS_PATH}`);
        const files = glob.sync('**/*.md', { cwd: DOCS_PATH, absolute: true });
        console.log(`Found ${files.length} markdown files.`);

        // Optional: Clear existing collection
        console.log(`Clearing existing collection: ${COLLECTION_NAME}...`);
        const count = await collection.count();
        if (count > 0) {
            // Correct peek call with options object
            const existingIds = await collection.peek({ limit: count });
            if(existingIds.ids.length > 0){
                await collection.delete({ ids: existingIds.ids });
                console.log(`Deleted ${existingIds.ids.length} items from collection.`);
            } else {
                 console.log('Collection count > 0 but peek returned no IDs.');
            }
        } else {
            console.log('Collection is already empty.');
        }

        console.log('\nProcessing files and preparing data for ChromaDB...');
        let allIds: IDs = [];
        let allEmbeddings: Embeddings = [];
        let allMetadatas: Metadata[] = []; // Correct type here
        let allDocuments: Documents = [];

        console.log(`Processing ${files.length} files...`);
        for (const file of files) {
            // Pass the checked embedder
            // Explicitly cast embedder type to satisfy compiler, even if signature differs
            const fileResult = await processFile(file, currentEmbedder as unknown as Pipeline);
            if (fileResult.ids.length > 0) {
                allIds.push(...fileResult.ids);
                allEmbeddings.push(...fileResult.embeddings);
                allMetadatas.push(...fileResult.metadatas);
                allDocuments.push(...fileResult.documents);
            }
        }
        console.log(`Collected ${allIds.length} total chunks from ${files.length} files.`);

        if (allIds.length > 0) {
            console.log(`\nAdding ${allIds.length} chunks to ChromaDB collection '${COLLECTION_NAME}'...`);
            await collection.add({
                ids: allIds,
                embeddings: allEmbeddings,
                metadatas: allMetadatas, // Should be Metadata[] now
                documents: allDocuments,
            });
            console.log('>>> ChromaDB collection.add call completed.');

            // Verify count
            const finalCount = await collection.count();
            console.log(`>>> Verification: collection.count() returned ${finalCount}.`);
             if (finalCount !== allIds.length) {
                 console.warn(`WARN: Final count (${finalCount}) does not match expected count (${allIds.length})!`);
            }
        } else {
            console.log('\nNo chunks collected, skipping add operation.');
        }

        console.log('\nIndexing script logic finished.');

    } catch (error) {
        console.error('FATAL ERROR during indexing:', error);
        process.exitCode = 1;
    } finally {
        // No explicit close needed for HTTP client
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