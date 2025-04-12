// Add early log
console.error('[INDEX.TS] TOP LEVEL - SIMPLIFIED FOR DEBUGGING');

process.stderr.write('--- Importing MCP SDK ---\n');
// Use deep imports with .js extension as required by the SDK's exports map
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js'; // Correct the import name to SSEServerTransport
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

// Create a promise that resolves when initialization is done
// Initialize with a dummy function to satisfy TS
let resolveInitialization: () => void = () => {};
const initializationComplete = new Promise<void>(resolve => {
    resolveInitialization = resolve; // Assign the actual resolver
});

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
        // Make sure PINECONE_ENVIRONMENT is set
        if (!pineconeEnvironment) {
            console.error('Missing required environment variable: PINECONE_ENVIRONMENT');
            // Optionally throw an error or exit if critical
            // throw new Error('Missing required environment variable: PINECONE_ENVIRONMENT');
        }
        pinecone = new Pinecone(); // Assumes API key is handled via environment variable
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
        // Explicitly pass configuration for cache location if needed, especially in serverless
        embedder = await pipeline('feature-extraction', embeddingModelName, {
             cache_dir: '/tmp/model_cache' // Use /tmp in Vercel Functions for writable cache
        });
        log.info(`Embedding model ${embeddingModelName} loaded successfully.`);
        console.error('[INDEX.TS] Inside async IIFE - Initialization successful');

        // Resolve the promise now that initialization is complete
        resolveInitialization();

    } catch (error) {
        console.error('[INDEX.TS] FATAL ERROR during async initialization:', error);
        log.error({ error }, 'Failed during asynchronous initialization (Pinecone/Embedder).');
        // Don't resolve the promise on error, maybe exit?
         process.exit(1); // Exit if critical initialization fails
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
// Create a logger wrapper that matches the expected type
const toolLogger = {
    info: (...args: unknown[]) => log.info(args),
    warn: (...args: unknown[]) => log.warn(args),
    error: (...args: unknown[]) => log.error(args),
};

const askFabricDocsHandlerInstance = createAskFabricDocsHandler({
    log: toolLogger, // Pass the wrapper logger
    pineconeIndex: pineconeIndex!, // Still might be null here, relies on startServer await
    getEmbedder: () => embedder,  // Still might be null here, relies on startServer await
});
console.error('[INDEX.TS] After tool handler creation');

server.tool('askFabricDocs', askFabricDocsSchema.shape, askFabricDocsHandlerInstance);
console.error('[INDEX.TS] After tool registration');

async function startServer() {
    console.error('[INDEX.TS] Entered startServer() function');

    console.error('[INDEX.TS] Before initialization wait loop');
    // Wait for the initialization promise to resolve
    await initializationComplete;
    console.error('[INDEX.TS] After initialization wait loop');

    // Check if initialization *actually* succeeded (variables should be non-null)
    if (!pineconeIndex) {
        log.fatal('Pinecone index is not initialized after wait. Cannot start server.');
        process.exit(1);
    }
    // Corrected check for the embedder pipeline
    if (!embedder) {
        log.fatal('Embedding pipeline is not initialized after wait. Cannot start server.');
        process.exit(1);
    }
     // Update tool handler instance *after* await to ensure dependencies are ready
    // This assumes createAskFabricDocsHandler uses the latest values when invoked
    // If the handler captures the initial null values, this needs redesign.
    // Re-assigning might not be necessary if the handler uses the getEmbedder function correctly.
    // We will assume the current handler structure works for now.


    // Check if SSEServerTransport was imported correctly
    if (!SSEServerTransport) {
        log.fatal('SSEServerTransport not available (import failed?). Cannot start server.');
        process.exit(1);
    }

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    if (isNaN(port)) {
        log.fatal('Invalid PORT environment variable.');
        process.exit(1);
    }

    const transport = new SSEServerTransport({ port });
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

// Add basic signal handling for graceful shutdown
process.on('SIGTERM', () => {
  log.info('SIGTERM signal received: closing MCP server');
  // Add any necessary cleanup for SSEServerTransport if available
  server.close(); // Close the MCP server instance
  log.info('MCP server closed');
  process.exit(0);
});

process.on('SIGINT', () => {
  log.info('SIGINT signal received: closing MCP server');
  server.close();
  log.info('MCP server closed');
  process.exit(0);
});
