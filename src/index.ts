process.stderr.write('--- Top of src/index.ts ---\n');

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

const log = logger;

let pinecone: Pinecone | null = null;
let pineconeIndex: Index<DocMetadata> | null = null;

let embedder: FeatureExtractionPipeline | null = null;
(async () => {
    try {
        log.info('Initializing Pinecone client...');
        if (!pineconeApiKey) {
            throw new Error('PINECONE_API_KEY is not set. Cannot initialize Pinecone.');
        }
        pinecone = new Pinecone();
        log.info('Pinecone client initialized.');

        if (!pineconeIndexName) {
            throw new Error('PINECONE_INDEX_NAME is not set. Cannot get index handle.');
        }
        log.info(`Checking and getting handle for Pinecone index '${pineconeIndexName}'...`);
        pineconeIndex = pinecone.Index<DocMetadata>(pineconeIndexName);
        log.info(`Obtained handle for Pinecone index '${pineconeIndexName}'.`);

        log.info(`Loading embedding model: ${embeddingModelName}...`);
        embedder = await pipeline('feature-extraction', embeddingModelName);
        log.info(`Embedding model ${embeddingModelName} loaded successfully.`);

    } catch (error) {
        log.error({ error }, 'Failed during asynchronous initialization (Pinecone/Embedder).');
        process.exit(1);
    }
})();

process.stderr.write('--- Creating McpServer instance (top level) ---\n');
const server = new McpServer({
    name: 'mcp_fabric_ux_system',
    version: '1.0.0',
    capabilities: {
        tools: true,
        resources: false,
        prompts: false,
    },
});
process.stderr.write('--- Finished creating McpServer instance (top level) ---\n');

const askFabricDocsHandlerInstance = createAskFabricDocsHandler({
    log: {
        info: (...args: unknown[]) => log.info(args),
        warn: (...args: unknown[]) => log.warn(args),
        error: (...args: unknown[]) => log.error(args),
    },
    pineconeIndex: pineconeIndex!,
    getEmbedder: () => embedder,
});

server.tool(
    'askFabricDocs',
    askFabricDocsSchema.shape,
    askFabricDocsHandlerInstance
);

log.info('Registered tool: askFabricDocs');

async function startServer() {
    process.stderr.write('--- Entered startServer() ---\n');

    // --- Dynamically import HttpServerTransport ---
    let HttpServerTransport: any;
    try {
        // Add @ts-ignore to suppress the TS2307 error for now
        // @ts-ignore
        const sdkHttpModule = await import('@modelcontextprotocol/sdk/server/http.js');
        HttpServerTransport = sdkHttpModule.HttpServerTransport;
        if (!HttpServerTransport) {
             throw new Error('HttpServerTransport not found in dynamic import.');
        }
        log.info('Dynamically imported HttpServerTransport successfully.');
    } catch (importError) {
         log.fatal({ error: importError }, 'Failed to dynamically import HttpServerTransport.');
         process.exit(1);
    }
    // --- End Dynamic Import ---

    while (!pineconeIndex || !embedder) {
        log.info('Waiting for Pinecone index and embedder initialization...');
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    log.info('Pinecone index and embedder initialized. Proceeding to start HTTP server.');

    try {
        const httpServer = http.createServer(async (req, res) => {
            log.debug({ url: req.url, method: req.method }, 'Incoming HTTP request');

            const providedApiKey = req.headers['x-api-key'];
            if (!mcpApiKey) {
                log.warn('MCP_API_KEY is not set. Allowing connection without authentication (NOT RECOMMENDED).');
            } else if (providedApiKey !== mcpApiKey) {
                log.warn({ provided: providedApiKey }, 'Unauthorized attempt: Invalid or missing X-API-Key header.');
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
            log.debug('API Key validated successfully.');

            if (req.url === '/' && req.method === 'GET') {
                log.info('MCP connection request received. Initializing transport...');
                try {
                     const transport = new HttpServerTransport({
                        server: server,
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
            } else {
                log.debug({ url: req.url }, 'Request path not handled by MCP server.');
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Not Found' }));
            }
        });

        httpServer.listen(serverPort, () => {
            log.info({ port: serverPort }, `MCP server listening for SSE connections on port ${serverPort}`);
            process.stderr.write(`--- MCP server ready on port ${serverPort} ---\n`);
        });

        httpServer.on('error', (error) => {
            log.error({ error }, 'HTTP server error');
            process.exit(1);
        });

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
        log.fatal({ error }, 'Fatal error during server startup');
        process.exit(1);
    }
}

const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST;
if (!isTestEnv) {
    process.stderr.write('--- Calling startServer() ---\n');
    startServer();
    process.stderr.write('--- Returned from startServer() call (process might wait) ---\n');
}
