import { promises as fs } from 'fs';
import path from 'path';
import * as glob from 'glob';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
// @ts-ignore - Suppress type error for remark-stringify
import remarkStringify from 'remark-stringify';
import yaml from 'js-yaml';
import { pipeline, env, Pipeline } from '@xenova/transformers';
// Import ChromaDB types
import { ChromaClient, Collection, type Embedding, type Metadatas, type Documents, type IDs, type Embeddings, type Metadata, IncludeEnum } from 'chromadb';
import url from 'url'; // Import the url module

// --- Constants ---
const DOCS_PATH = path.resolve(process.cwd(), '_docs_fabric_ux');
// Use Chroma server path instead of local path - Use IPv4 loopback
const CHROMA_SERVER_URL = process.env.CHROMA_SERVER_URL || 'http://127.0.0.1:8000';
const COLLECTION_NAME = 'fabric_ux_docs';
const EMBEDDING_MODEL = 'Xenova/all-MiniLM-L6-v2';
// const VECTOR_COLUMN_NAME = 'vector'; // No longer needed

// --- Interfaces ---
// Chroma uses Metadatas type which is Record<string, any>
interface DocMetadata extends Record<string, any> {
    id: string;
    title: string;
    area: string;
    tags: string; // Keep as JSON string for Chroma metadata
    lastUpdated: string;
    filePath: string;
    chunkId: string;
}

// --- Initialization ---
let embedder: any = null;
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
export async function processFile(filePath: string, embedderPipeline: Pipeline): Promise<{
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

        let frontmatter: Record<string, any> = {};
        // [LOG] Checking for frontmatter
        console.log(`[processFile: ${path.basename(filePath)}] Checking for YAML frontmatter node.`);
        if (tree.children.length > 0 && tree.children[0].type === 'yaml') {
           const yamlNode = tree.children[0];
           // [LOG] Found YAML node, attempting to parse.
           console.log(`[processFile: ${path.basename(filePath)}] Found YAML node, attempting to parse.`);
            try {
                frontmatter = yaml.load(yamlNode.value as string) as Record<string, any>;
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

        // [LOG] Stringifying remaining content.
        console.log(`[processFile: ${path.basename(filePath)}] Stringifying remaining AST content.`);
        const content = String(processor.stringify(tree)).trim();
        // [LOG] Splitting content into chunks.
        console.log(`[processFile: ${path.basename(filePath)}] Splitting content into chunks based on double newlines.`);
        const chunks = content.split(/\n\s*\n+/).filter(chunk => chunk.trim().length > 0);
        // [LOG] Found chunks.
        console.log(`[processFile: ${path.basename(filePath)}] Found ${chunks.length} non-empty chunks.`);
        if (chunks.length === 0) {
             // [LOG] No content chunks warning.
            console.warn(`[processFile: ${path.basename(filePath)}] WARN: No content chunks found after parsing ${filePath}`);
            // No need to return here, can proceed and add nothing
        }

        // [LOG] Starting chunk processing loop.
        console.log(`[processFile: ${path.basename(filePath)}] Starting chunk processing loop for ${chunks.length} chunks.`);
        for (let i = 0; i < chunks.length; i++) {
            const chunkText = chunks[i];
            const chunkId = `${frontmatter.id}-chunk-${i}`;
             // [LOG] Processing chunk.
            console.log(`[processFile: ${path.basename(filePath)}] Processing chunk ${i} (ID: ${chunkId}). Length: ${chunkText.length}`);

            // [LOG] Before generating embedding.
            console.log(`[processFile: ${path.basename(filePath)}] Generating embedding for chunk ${i}.`);
            const output = await embedderPipeline(chunkText, { pooling: 'mean', normalize: true });
            const embedding: Embedding = Array.from(output.data as Float32Array);
            // [LOG] After generating embedding.
            console.log(`[processFile: ${path.basename(filePath)}] Embedding generated for chunk ${i}. Length: ${embedding.length}`);

            result.ids.push(chunkId);
            result.embeddings.push(embedding);
            result.documents.push(chunkText);
            const metadataItem: Metadata = {
                id: frontmatter.id as string,
                title: frontmatter.title as string,
                area: frontmatter.area as string,
                tags: JSON.stringify(frontmatter.tags || []), 
                lastUpdated: frontmatter.lastUpdated as string,
                filePath: path.relative(process.cwd(), filePath),
                chunkId: chunkId,
            };
            result.metadatas.push(metadataItem);
            // [LOG] Added chunk data to results.
            console.log(`[processFile: ${path.basename(filePath)}] Added chunk ${i} data to results array.`);
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

        if (!collection || !embedder) {
            throw new Error("ChromaDB collection or embedder not available after initialization.");
        }

        console.log(`\nScanning for markdown files in: ${DOCS_PATH}`);
        const files = glob.sync(`**/*.md`, { cwd: DOCS_PATH, absolute: true });
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

        for (const file of files) {
            const fileResult = await processFile(file, embedder);
            allIds = allIds.concat(fileResult.ids);
            allEmbeddings = allEmbeddings.concat(fileResult.embeddings);
            allMetadatas = allMetadatas.concat(fileResult.metadatas);
            allDocuments = allDocuments.concat(fileResult.documents);
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
            console.log(`>>> ChromaDB collection.add call completed.`);

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

// Execute main only if the script is run directly
// Use url.pathToFileURL instead of path.ToFileURL
if (import.meta.url === url.pathToFileURL(process.argv[1]).href) {
    main();
}