import { promises as fs } from 'fs';
import path from 'path';
import * as glob from 'glob';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
// @ts-ignore - Suppress type error for remark-stringify
import remarkStringify from 'remark-stringify';
import yaml from 'js-yaml';
import { pipeline } from '@xenova/transformers';
// Import ChromaDB types
import { ChromaClient, Collection, type Embedding, type Metadatas, type Documents, type IDs, type Embeddings, type Metadata } from 'chromadb';

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

async function initialize() {
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
async function processFile(filePath: string): Promise<{
    ids: IDs;
    embeddings: Embeddings;
    metadatas: Metadata[];
    documents: Documents;
}> {
    if (!embedder) {
        throw new Error('Embedder not initialized.');
    }
    console.log(`Processing: ${path.relative(process.cwd(), filePath)}`);

    const result = {
        ids: [] as IDs,
        embeddings: [] as Embeddings,
        metadatas: [] as Metadata[],
        documents: [] as Documents,
    };

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const processor = unified()
            .use(remarkParse)
            .use(remarkFrontmatter, ['yaml'])
            .use(remarkStringify);
        const tree = processor.parse(fileContent);
        let frontmatter: Record<string, any> = {};
        if (tree.children.length > 0 && tree.children[0].type === 'yaml') {
           const yamlNode = tree.children[0];
            try {
                frontmatter = yaml.load(yamlNode.value as string) as Record<string, any>;
            } catch (e) {
                console.warn(`  WARN: Failed to parse YAML frontmatter in ${filePath}`, e);
                return result;
            }
            tree.children.shift();
        } else {
            console.warn(`  WARN: No frontmatter found in ${filePath}`);
            return result;
        }
        if (!frontmatter.id || !frontmatter.title || !frontmatter.area) {
             console.warn(`  WARN: Missing required frontmatter (id, title, area) in ${filePath}`);
             return result;
        }
        const content = String(processor.stringify(tree)).trim();
        const chunks = content.split(/\n\s*\n+/).filter(chunk => chunk.trim().length > 0);
        console.log(`  Found ${chunks.length} chunks.`);
        if (chunks.length === 0) {
            console.warn(`  WARN: No content chunks found after parsing ${filePath}`);
        }
        // -----------------------------------------------------

        for (let i = 0; i < chunks.length; i++) {
            const chunkText = chunks[i];
            const chunkId = `${frontmatter.id}-chunk-${i}`;

            const output = await embedder(chunkText, { pooling: 'mean', normalize: true });
            const embedding: Embedding = Array.from(output.data as Float32Array);

            result.ids.push(chunkId);
            result.embeddings.push(embedding);
            result.documents.push(chunkText);
            // Create the metadata object - it conforms to Metadata type
            const metadataItem: Metadata = {
                id: frontmatter.id as string,
                title: frontmatter.title as string,
                area: frontmatter.area as string,
                tags: JSON.stringify(frontmatter.tags || []), 
                lastUpdated: frontmatter.lastUpdated as string,
                filePath: path.relative(process.cwd(), filePath),
                chunkId: chunkId,
            };
            result.metadatas.push(metadataItem); // Push the correctly typed object
        }

    } catch (error) {
        console.error(`  ERROR processing file ${filePath}:`, error);
        // Return empty result on error
    }
    return result;
}

// --- Main Execution ---
async function main() {
    try {
        await initialize(); // Initialization now includes server ping

        if (!collection) {
            throw new Error("ChromaDB collection not available after initialization.");
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
            const fileResult = await processFile(file);
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

main();