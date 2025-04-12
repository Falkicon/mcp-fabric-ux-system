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

    let HttpServerTransport: any;
    console.error('[INDEX.TS] Before dynamic import attempt');
    try {
        // Keep @ts-ignore as build fails without it
        // @ts-ignore
        const sdkHttpModule = await import('@modelcontextprotocol/sdk/server/http.js');
        console.error('[INDEX.TS] Dynamic import successful');
        HttpServerTransport = sdkHttpModule.HttpServerTransport;
        if (!HttpServerTransport) {
             throw new Error('HttpServerTransport not found in dynamic import.');
        }
        log.info('Dynamically imported HttpServerTransport successfully.');
    } catch (importError) {
         console.error('[INDEX.TS] FATAL ERROR during dynamic import:', importError);
         log.fatal({ error: importError }, 'Failed to dynamically import HttpServerTransport.');
         process.exit(1);
    }
    console.error('[INDEX.TS] After dynamic import section');

    console.error('[INDEX.TS] Before initialization wait loop');
    while (!pineconeIndex || !embedder) {
        console.error('[INDEX.TS] Waiting for initialization...');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.error('[INDEX.TS] Initialization complete. Proceeding to start HTTP server.');
    log.info('Pinecone index and embedder initialized. Proceeding to start HTTP server.');

    console.error('[INDEX.TS] Before httpServer try block');
    try {
        console.error('[INDEX.TS] Creating HTTP server...');
        const httpServer = http.createServer(async (req, res) => {
            console.error(`[INDEX.TS] Incoming HTTP request: ${req.method} ${req.url}`);
            log.debug({ url: req.url, method: req.method }, 'Incoming HTTP request');

            const providedApiKey = req.headers['x-api-key'];
            if (!mcpApiKey) {
                log.warn('MCP_API_KEY is not set. Allowing connection without authentication (NOT RECOMMENDED).');
                console.error('[INDEX.TS] WARNING: MCP_API_KEY not set, skipping auth.');
            } else if (providedApiKey !== mcpApiKey) {
                log.warn({ provided: providedApiKey }, 'Unauthorized attempt: Invalid or missing X-API-Key header.');
                console.error(`[INDEX.TS] Unauthorized attempt: Key provided: ${providedApiKey}`);
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            log.debug('API Key validated successfully.');
            console.error('[INDEX.TS] API Key validated successfully.');

            if (req.url === '/' && req.method === 'GET') {
                console.error('[INDEX.TS] Root path requested. Handing off to MCP Transport...');
                log.info('MCP connection request received. Initializing transport...');
                try {
                     const transport = new HttpServerTransport({
                        server: server,
                        request: req,
                        response: res,
                        keepAliveInterval: 30000
                    });
                     log.info('HttpServerTransport initialized for request.');
                     console.error('[INDEX.TS] HttpServerTransport initialized.');
                } catch (transportError) {
                     console.error('[INDEX.TS] Error initializing MCP transport:', transportError);
                     log.error({ error: transportError }, 'Error initializing or handling MCP transport');
                     if (!res.headersSent) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Internal Server Error during transport setup' }));
                     }
                }
            } else {
                 console.error(`[INDEX.TS] Path ${req.url} not handled. Sending 404.`);
                 log.warn({ url: req.url }, 'Request path not handled by MCP server.');
                 res.writeHead(404, { 'Content-Type': 'text/plain' });
                 res.end('Not Found');
            }
        });
        console.error('[INDEX.TS] HTTP server created');

        console.error('[INDEX.TS] Setting up httpServer listeners...');
        httpServer.listen(serverPort, () => {
            console.error(`[INDEX.TS] Server listening on port ${serverPort}`);
        });

        httpServer.on('error', (error) => {
            console.error('[INDEX.TS] HTTP server error:', error);
            process.exit(1);
        });
        console.error('[INDEX.TS] HTTP server listeners attached');

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

const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST;
if (!isTestEnv) {
    console.error('[INDEX.TS] Calling startServer()');
    startServer();
    console.error('[INDEX.TS] Returned from startServer() call (process might wait)');
} else {
    console.error('[INDEX.TS] Skipping startServer() in test environment');
}
