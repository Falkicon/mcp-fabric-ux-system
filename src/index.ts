// Add early log
console.error('[INDEX.TS] TOP LEVEL - SIMPLIFIED FOR DEBUGGING');

process.stderr.write('--- Importing MCP SDK ---\n');
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
// import { McpServer, HttpServerTransport } from '@modelcontextprotocol/sdk';
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
// --- Temporarily COMMENT OUT Async Initialization ---
/*
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
        // Use console.error here as logger might not be fully ready or working
        console.error('[INDEX.TS] FATAL ERROR during async initialization:', error);
        log.error({ error }, 'Failed during asynchronous initialization (Pinecone/Embedder).');
        process.exit(1);
    }
})();
console.error('[INDEX.TS] After async IIFE definition');
*/
console.error('[INDEX.TS] SKIPPED Async Initialization');
// --- End Initializations ---

// --- Temporarily COMMENT OUT McpServer and Tool Registration ---
/*
console.error('[INDEX.TS] Creating McpServer instance (top level)');
const server = new McpServer({ ... });
console.error('[INDEX.TS] McpServer instance created');

console.error('[INDEX.TS] Before tool handler creation');
const askFabricDocsHandlerInstance = createAskFabricDocsHandler({ ... });
console.error('[INDEX.TS] After tool handler creation');

server.tool('askFabricDocs', askFabricDocsSchema.shape, askFabricDocsHandlerInstance);
console.error('[INDEX.TS] After tool registration');
*/
console.error('[INDEX.TS] SKIPPED MCP Server/Tool Setup');
// --- End Tool Registration ---

// --- Start Server (HTTP - Simplified) ---
async function startServer() {
    console.error('[INDEX.TS] Entered startServer() function - SIMPLIFIED');

    // --- Temporarily COMMENT OUT Dynamic Import ---
    /*
    let HttpServerTransport: any;
    console.error('[INDEX.TS] Before dynamic import attempt');
    try {
        // @ts-ignore
        const sdkHttpModule = await import('@modelcontextprotocol/sdk/server/http.js');
        // ... dynamic import logic ...
    } catch (importError) {
        console.error('[INDEX.TS] FATAL ERROR during dynamic import:', importError);
        log.fatal({ error: importError }, 'Failed to dynamically import HttpServerTransport.');
        process.exit(1);
    }
    console.error('[INDEX.TS] After dynamic import section');
    */
    console.error('[INDEX.TS] SKIPPED Dynamic Import');

    // --- Temporarily COMMENT OUT Initialization Wait Loop ---
    /*
    console.error('[INDEX.TS] Before initialization wait loop');
    while (!pineconeIndex || !embedder) {
        console.error('[INDEX.TS] Waiting for initialization...');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.error('[INDEX.TS] Initialization complete. Proceeding to start HTTP server.');
    log.info('Pinecone index and embedder initialized. Proceeding to start HTTP server.');
    */
    console.error('[INDEX.TS] SKIPPED Init Wait Loop');

    console.error('[INDEX.TS] Before httpServer try block');
    try {
        console.error('[INDEX.TS] Creating HTTP server...');
        const httpServer = http.createServer(async (req, res) => {
            // Simplified Handler for Debugging
            console.error(`[INDEX.TS] DEBUG HANDLER: Received request: ${req.method} ${req.url}`);
            log.info({ url: req.url, method: req.method, headers: req.headers }, 'DEBUG HANDLER: Request received');

            // --- Temporarily COMMENT OUT Auth Check ---
            /*
            const providedApiKey = req.headers['x-api-key'];
            if (!mcpApiKey) {
                log.warn('MCP_API_KEY is not set. Allowing connection without authentication (NOT RECOMMENDED).');
            } else if (providedApiKey !== mcpApiKey) {
                log.warn({ provided: providedApiKey }, 'Unauthorized attempt: Invalid or missing X-API-Key header.');
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized - DEBUG MODE' }));
                return;
            }
            log.debug('API Key validated successfully.');
            */
            console.error('[INDEX.TS] DEBUG HANDLER: SKIPPED Auth Check');

            // --- Temporarily COMMENT OUT MCP Transport Logic ---
            if (req.url === '/' && req.method === 'GET') {
                 console.error('[INDEX.TS] DEBUG HANDLER: Root path requested. Sending basic OK response.');
                 log.info('DEBUG HANDLER: Root path requested. Sending basic OK.');
                 res.writeHead(200, { 'Content-Type': 'text/plain' });
                 res.end('Server is running (Debug Mode)');
            /*
                log.info('MCP connection request received. Initializing transport...');
                try {
                     const transport = new HttpServerTransport({
                        server: server, // server would be undefined here now
                        request: req,
                        response: res,
                        keepAliveInterval: 30000
                    });
                     log.info('HttpServerTransport initialized for request.');
                } catch (transportError) {
                     log.error({ error: transportError }, 'Error initializing or handling MCP transport');
                     if (!res.headersSent) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error during transport setup' }));
                     }
                }
            */
            } else {
                console.error(`[INDEX.TS] DEBUG HANDLER: Path ${req.url} not handled. Sending 404.`);
                log.warn({ url: req.url }, 'DEBUG HANDLER: Path not handled.');
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found (Debug Mode)');
            }
        });
        console.error('[INDEX.TS] HTTP server created');

        console.error('[INDEX.TS] Setting up httpServer listeners...');
        httpServer.listen(serverPort, () => {
            console.error(`[INDEX.TS] Server listening on port ${serverPort}`);
        });
        // ... rest of listeners and signal handlers ...
        httpServer.on('error', (error) => {
            console.error('[INDEX.TS] HTTP server error:', error);
            process.exit(1);
        });
        console.error('[INDEX.TS] HTTP server listeners attached');

        // Graceful shutdown handling
        process.on('SIGTERM', () => {
            log.info('SIGTERM signal received: closing HTTP server');
            httpServer.close(() => {
                log.info('HTTP server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
             log.info('SIGINT signal received: closing HTTP server');
             httpServer.close(() => {
                 log.info('HTTP server closed');
                 process.exit(0);
             });
         });

        // Add global error handlers
        process.on('uncaughtException', (error) => {
            log.fatal({ error }, 'UNCAUGHT EXCEPTION');
            process.exit(1);
        });
        process.on('unhandledRejection', (reason) => {
            log.fatal({ reason }, 'UNHANDLED REJECTION');
            process.exit(1);
        });

    } catch (error) {
        console.error('[INDEX.TS] FATAL ERROR during server startup:', error);
        process.exit(1);
    }
}

// Start the server if not testing
const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST;
if (!isTestEnv) {
    console.error('[INDEX.TS] Calling startServer()');
    startServer();
    console.error('[INDEX.TS] Returned from startServer() call (process might wait)');
} else {
    console.error('[INDEX.TS] Skipping startServer() in test environment');
}
