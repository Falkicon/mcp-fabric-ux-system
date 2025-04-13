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
            const error = new Error('PINECONE_API_KEY is not set. Cannot initialize Pinecone.');
            log.error({ error }, 'Failed to initialize Pinecone client');
            throw error;
        }

        try {
            // Initialize with explicit configuration using environment variables
            log.info({ environment: pineconeEnvironment, indexName: pineconeIndexName }, 'Configuring Pinecone client');
            pinecone = new Pinecone({
                apiKey: pineconeApiKey,
                environment: pineconeEnvironment  // This will now always have a value from config.ts
            });
            log.info('Pinecone client initialized successfully');

            // Verify we can get the index handle
            log.info(`Getting handle for Pinecone index '${pineconeIndexName}'`);
            pineconeIndex = pinecone.Index<DocMetadata>(pineconeIndexName);
            log.info(`Obtained handle for Pinecone index '${pineconeIndexName}'`);
        } catch (pineconeError) {
            log.error({ error: pineconeError }, 'Failed to initialize Pinecone client or get index handle');
            console.error('[INDEX.TS] FATAL ERROR: Failed to initialize Pinecone:', pineconeError);
            throw pineconeError; // Re-throw to halt initialization
        }

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

    // Check if initialization *actually* succeeded
    if (!pineconeIndex) {
        log.fatal('Pinecone index is not initialized after wait. Cannot start server.');
        process.exit(1);
    }
    if (!embedder) {
        log.fatal('Embedding pipeline is not initialized after wait. Cannot start server.');
        process.exit(1);
    }
    // No need to check SSEServerTransport import here, it's used below

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    if (isNaN(port)) {
        log.fatal('Invalid PORT environment variable.');
        process.exit(1);
    }

    // Create a standard Node HTTP server
    console.error('[INDEX.TS] Creating HTTP server...');
    const httpServer = http.createServer(async (req, res) => {
        console.error(`[INDEX.TS] Incoming HTTP request: ${req.method} ${req.url}`);
        log.debug({ url: req.url, method: req.method }, 'Incoming HTTP request');

        // --- API Key Authentication ---
        const providedApiKeyHeader = req.headers['x-api-key'] || req.headers['X-API-Key'];
        const providedApiKey = Array.isArray(providedApiKeyHeader) ? providedApiKeyHeader[0] : providedApiKeyHeader;

        // === Read API Key directly from process.env INSIDE the handler ===
        const apiKeyFromEnvDirectly = process.env.MCP_API_KEY;

        // Log the value read directly from process.env
        const directKeyPreview = typeof apiKeyFromEnvDirectly === 'string' ? apiKeyFromEnvDirectly.substring(0, 3) + '...' + apiKeyFromEnvDirectly.substring(apiKeyFromEnvDirectly.length - 3) : '[Not Set Directly]';
        const directKeyLength = typeof apiKeyFromEnvDirectly === 'string' ? apiKeyFromEnvDirectly.length : 0;
        log.info({ directKeyPreview, directKeyLength }, 'MCP_API_KEY value read directly inside handler');
        console.error(`[INDEX.TS] MCP_API_KEY direct read: ${directKeyPreview} (Length: ${directKeyLength})`);

        // ******** RE-ENABLE API Key Check for VS Code Compatibility ********
        // Perform check using the directly read key
        if (!apiKeyFromEnvDirectly) {
            log.warn('DIRECT READ: MCP_API_KEY check failed (!apiKeyFromEnvDirectly is true). Cannot authenticate.');
            console.error('[INDEX.TS] WARNING: DIRECT READ: MCP_API_KEY check failed.');
            // Send 401 if key is expected but not configured/available
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unauthorized - Server Configuration Issue (Direct Read Fail)' }));
            return;
        } else {
            // Log using the directly read key's length
            const expectedLen = apiKeyFromEnvDirectly.length;
            const receivedLen = typeof providedApiKey === 'string' ? providedApiKey.length : -1;
            console.error(`[KEY CHECK] Path: ${req.url}, Expected Length: ${expectedLen}, Received Type: ${typeof providedApiKey}, Received Length: ${receivedLen}`);
            log.info({ expectedKeyLength: expectedLen, receivedKeyType: typeof providedApiKey, receivedKeyLength: receivedLen }, 'Performing API Key Check (Direct Read)');

            // Compare received key with the directly read key
            if (providedApiKey !== apiKeyFromEnvDirectly) {
                const loggableKey = typeof providedApiKey === 'string' ? providedApiKey.substring(0, 5) + '...' : '[Invalid Format/Absent]';
                log.warn({ provided: loggableKey }, 'Unauthorized attempt (Direct Read): Invalid or missing X-API-Key header.');
                console.error(`[INDEX.TS] Unauthorized attempt (Direct Read): Invalid or missing X-API-Key`);
                res.writeHead(401, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Unauthorized' }));
                return;
            }
        }
        log.debug('API Key validated successfully (Direct Read).');
        console.error('[INDEX.TS] API Key validated successfully (Direct Read).');

        // --- Handle MCP connection requests at root path --- 
        if (req.url === '/' && req.method === 'GET') {
            console.error('[INDEX.TS] Root path request. Handing off to MCP SSE Transport...');
            log.info('MCP connection request received. Initializing SSE transport for this request...');
            try {
                // Initialize SSEServerTransport with request and response objects
                // Vercel serverless environment compatible approach
                const transport = new SSEServerTransport({
                    request: req,
                    response: res,
                    // Add Vercel-specific headers if needed
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'X-Accel-Buffering': 'no' // Prevents Vercel from buffering the response
                    }
                });
                    
                // Connect the main server instance to this request-specific transport
                await server.connect(transport);
                log.info('SSEServerTransport connected for this request.');
                console.error('[INDEX.TS] SSEServerTransport connected.');
                // Transport handles closing the response when done
            } catch (transportError) {
                console.error('[INDEX.TS] Error initializing or connecting MCP SSE transport:', transportError);
                log.error({ error: transportError }, 'Error initializing or connecting MCP SSE transport');
                if (!res.headersSent) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error during transport setup' }));
                }
            }
        } 
        // --- Diagnostics endpoint for troubleshooting ---
        else if (req.url?.startsWith('/_diagnostics') || req.url?.includes('_diag=')) {
            console.error('[INDEX.TS] Diagnostics endpoint accessed');
            log.info('Diagnostics endpoint accessed');
            
            // Import the diagnostics function from config.js
            import { getDiagnostics } from './config.js';
            
            // Gather diagnostic information including the environment variables
            const diagnostics = {
                serverStatus: {
                    pineconeInitialized: pinecone !== null,
                    indexHandleObtained: pineconeIndex !== null,
                    embedderLoaded: embedder !== null,
                    serverReady: pinecone !== null && pineconeIndex !== null && embedder !== null
                },
                config: getDiagnostics(),
                rawEnvironmentVariables: {
                    PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT || '[not set]',
                    PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME || '[not set]',
                    PINECONE_API_KEY: process.env.PINECONE_API_KEY ? '[present]' : '[not set]',
                    MCP_API_KEY: process.env.MCP_API_KEY ? '[present]' : '[not set]'
                },
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            };
            
            // Send the diagnostics info back
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(diagnostics, null, 2));
        } 
        else {
            console.error(`[INDEX.TS] Path ${req.url} not handled. Sending 404.`);
            log.warn({ url: req.url }, 'Request path not handled by MCP server.');
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
    console.error('[INDEX.TS] HTTP server created');

    // --- Start Listening --- 
    console.error('[INDEX.TS] Setting up httpServer listeners...');
    httpServer.listen(port, () => {
        console.error(`[INDEX.TS] Server listening on port ${port}`);
        log.info(`HTTP server listening on port ${port} for MCP connections at '/'`);
    });

    httpServer.on('error', (error) => {
        console.error('[INDEX.TS] HTTP server error:', error);
        log.fatal({ error }, 'HTTP server error');
        process.exit(1);
    });
    console.error('[INDEX.TS] HTTP server listeners attached');

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
