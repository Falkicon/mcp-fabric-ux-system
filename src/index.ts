// Add early log
console.error('[INDEX.TS] TOP LEVEL - SIMPLIFIED FOR DEBUGGING');

process.stderr.write('--- Importing MCP SDK ---\n');
// Use deep imports with .js extension as required by the SDK's exports map
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HttpServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'; // Assuming SSE transport is in server/sse.js
import { TextContent } from '@modelcontextprotocol/sdk/types.js';
process.stderr.write('--- Finished Importing MCP SDK ---\n');

process.stderr.write('--- Importing Node HTTP ---\n');
import http from 'node:http';
process.stderr.write('--- Finished Importing Node HTTP ---\n');

process.stderr.write('--- Importing Zod ---\n');
import { z } from 'zod';
process.stderr.write('--- Finished Importing Zod ---\n');

process.stderr.write('--- Importing Logger ---\n');
import logger from './logger.js';
console.error('[INDEX.TS] Imports completed');
process.stderr.write('--- Finished Importing Logger ---\n');

process.stderr.write('--- Importing Pinecone Client ---\n');
import { Pinecone, type Index } from '@pinecone-database/pinecone';
process.stderr.write('--- Finished Importing Pinecone Client ---\n');

process.stderr.write('--- Importing Transformers Pipeline ---\n');
import { pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';
process.stderr.write('--- Finished Importing Transformers Pipeline ---\n');

process.stderr.write('--- Importing Config ---\n');
import {
    embeddingModelName,
    pineconeApiKey,
    pineconeEnvironment,
    pineconeIndexName,
    mcpApiKey,
    serverPort
} from './config.js';
process.stderr.write('--- Finished Importing Config ---\n');

process.stderr.write('--- Importing askFabricDocs Tool ---\n');
import { askFabricDocsSchema, createAskFabricDocsHandler, type DocMetadata } from './tools/askFabricDocsTool.js';
process.stderr.write('--- Finished Importing askFabricDocs Tool ---\n');

process.stderr.write('--- Global Initializations ---\n');
console.error('[INDEX.TS] Before logger assignment');
const log = logger;
console.error('[INDEX.TS] After logger assignment');

let pinecone: Pinecone | null = null;
let pineconeIndex: Index<DocMetadata> | null = null;

let embedder: FeatureExtractionPipeline | null = null;
console.error('[INDEX.TS] Starting async IIFE for initialization');
(async () => {
    console.error('[INDEX.TS] Inside async IIFE - Before try block');
    try {
        console.error('[INDEX.TS] Inside async IIFE - Start try block');
        // --- Initialize Pinecone Client ---
        log.info('Initializing Pinecone client...');
        if (!pineconeApiKey) {
            throw new Error('PINECONE_API_KEY is not set. Cannot initialize Pinecone.');
        }
        pinecone = new Pinecone();
        log.info('Pinecone client initialized.');

        // --- Get Pinecone Index Handle ---
        if (!pineconeIndexName) {
            throw new Error('PINECONE_INDEX_NAME is not set. Cannot get index handle.');
        }
        log.info(`Checking and getting handle for Pinecone index '${pineconeIndexName}'...`);
        pineconeIndex = pinecone.Index<DocMetadata>(pineconeIndexName);
        log.info(`Obtained handle for Pinecone index '${pineconeIndexName}'.`);

        // --- Initialize Embedder ---
        log.info(`Loading embedding model: ${embeddingModelName}...`);
        embedder = await pipeline('feature-extraction', embeddingModelName);
        log.info(`Embedding model ${embeddingModelName} loaded successfully.`);
        console.error('[INDEX.TS] Inside async IIFE - Initialization successful');

    } catch (error) {
        console.error('[INDEX.TS] FATAL ERROR during async initialization:', error);
        log.error({ error }, 'Failed during asynchronous initialization (Pinecone/Embedder).');
        process.exit(1);
    }
})();
console.error('[INDEX.TS] After async IIFE definition');

console.error('[INDEX.TS] Creating McpServer instance (top level)');
const server = new McpServer({
    name: 'mcp_fabric_ux_system',
    version: '1.0.0',
    capabilities: {
        tools: true,
        resources: false,
        prompts: false,
    },
});
console.error('[INDEX.TS] McpServer instance created');

console.error('[INDEX.TS] Before tool handler creation');
const askFabricDocsHandlerInstance = createAskFabricDocsHandler({
    log: {
        info: (...args: unknown[]) => log.info(args),
        warn: (...args: unknown[]) => log.warn(args),
        error: (...args: unknown[]) => log.error(args),
    },
    pineconeIndex: pineconeIndex!,
    getEmbedder: () => embedder,
});
console.error('[INDEX.TS] After tool handler creation');

server.tool('askFabricDocs', askFabricDocsSchema.shape, askFabricDocsHandlerInstance);
console.error('[INDEX.TS] After tool registration');

async function startServer() {
    console.error('[INDEX.TS] Entered startServer() function');

    console.error('[INDEX.TS] Before initialization wait loop');
    // Wait for async initializations to complete
    await initializationComplete;
    console.error('[INDEX.TS] After initialization wait loop');

    if (!pineconeIndex) {
        log.fatal('Pinecone index is not initialized. Cannot start server.');
        process.exit(1);
    }
    if (!pipeline) {
        log.fatal('Embedding pipeline is not initialized. Cannot start server.');
        process.exit(1);
    }

    if (!HttpServerTransport) {
        log.fatal('HttpServerTransport not available (import failed?). Cannot start server.');
        process.exit(1);
    }

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    if (isNaN(port)) {
        log.fatal('Invalid PORT environment variable.');
        process.exit(1);
    }

    const transport = new HttpServerTransport({ port });
    log.info(`Attempting to connect server via SSE transport on port ${port}...`);

    await server.connect(transport);

    log.info(`MCP Server connected via SSE transport on port ${port}`);

    console.error('[INDEX.TS] Returned from server.connect()');
}

const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST;
if (!isTestEnv) {
    console.error('[INDEX.TS] Calling startServer()');
    startServer();
    console.error('[INDEX.TS] Returned from startServer() call (process might wait)');
} else {
    console.error('[INDEX.TS] Skipping startServer() in test environment');
}
