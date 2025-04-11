process.stderr.write('--- Top of src/index.ts ---\n');

process.stderr.write('--- Importing MCP SDK ---\n');
// Import from specific SDK paths
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { TextContent } from '@modelcontextprotocol/sdk/types.js';
process.stderr.write('--- Finished Importing MCP SDK ---\n');

process.stderr.write('--- Importing Zod ---\n');
import { z } from 'zod';
process.stderr.write('--- Finished Importing Zod ---\n');

process.stderr.write('--- Importing Logger ---\n');
import logger from './logger.js';
process.stderr.write('--- Finished Importing Logger ---\n');

process.stderr.write('--- Importing ChromaDB Client ---\n');
import { ChromaClient } from 'chromadb';
process.stderr.write('--- Finished Importing ChromaDB Client ---\n');

process.stderr.write('--- Importing Transformers Pipeline ---\n');
import { pipeline, type FeatureExtractionPipeline } from '@xenova/transformers';
process.stderr.write('--- Finished Importing Transformers Pipeline ---\n');

process.stderr.write('--- Importing Config ---\n');
import { chromaCollectionName, embeddingModelName, chromaServerUrl } from './config.js';
process.stderr.write('--- Finished Importing Config ---\n');

// Import tool schema and handler factory
process.stderr.write('--- Importing askFabricDocs Tool ---\n');
import { askFabricDocsSchema, createAskFabricDocsHandler } from './tools/askFabricDocsTool.js';
process.stderr.write('--- Finished Importing askFabricDocs Tool ---\n');

// Only import config/errors if absolutely needed by minimal server
// import { customGreetingPrefix, transportType } from './config.js';
// import { ToolExecutionError, AppError } from './errors.js';

process.stderr.write('--- Global Initializations ---\n');

const log = logger; // Assign logger after imports

log.info('Initializing ChromaDB client...');
const chromaClient = new ChromaClient({ path: chromaServerUrl });
log.info({ path: chromaServerUrl }, 'ChromaDB client initialized.');

// Variable to hold the embedding pipeline - Use specific type
let embedder: FeatureExtractionPipeline | null = null;

// Initialize the embedding model pipeline asynchronously
(async () => {
    try {
        log.info(`Loading embedding model: ${embeddingModelName}...`);
        // No type assertion needed now
        embedder = await pipeline('feature-extraction', embeddingModelName);
        log.info(`Embedding model ${embeddingModelName} loaded successfully.`);
    } catch (error) {
        log.error({ error, model: embeddingModelName }, 'Failed to load embedding model.');
        // Depending on requirements, might want to exit or handle gracefully
        process.exit(1); 
    }
})();

// Function to check embedder status (for testing)
// export function isEmbedderLoaded(): boolean {
//     return embedder !== null;
// }

process.stderr.write('--- Creating McpServer instance (top level) ---\n');
const server = new McpServer({
    name: 'MCP Template Server',
    version: '1.0.0',
    capabilities: { // Declare capabilities even if none registered
        tools: true,
        resources: true,
        prompts: true,
    },
});
process.stderr.write('--- Finished creating McpServer instance (top level) ---\n');

// --- Tool Registration ---

// Create the handler instance by injecting dependencies
const askFabricDocsHandlerInstance = createAskFabricDocsHandler({
    log: log,
    chromaClient: chromaClient,
    getEmbedder: () => embedder, 
    collectionName: chromaCollectionName,
});

// Register the tool using the 3-argument signature with ZodRawShape
server.tool(
    'askFabricDocs', 
    askFabricDocsSchema.shape, // Pass the .shape of the Zod schema object
    askFabricDocsHandlerInstance // Handler function
);

log.info('Registered tool: askFabricDocs');

// --- End Tool Registration ---

// Start the server
async function startServer() {
    process.stderr.write('--- Entered startServer() ---\n');

    if (process.argv.includes('--stdio')) {
        process.stderr.write('--- --stdio flag found, entering try block ---\n');
        try {
            process.stderr.write('--- Initializing StdioServerTransport ---\n');
            const transport = new StdioServerTransport();
            process.stderr.write('--- Connecting server to transport ---\n');
            process.stderr.write('>>> Attempting server.connect(transport)...\n');
            await server.connect(transport);
            process.stderr.write('>>> server.connect(transport) completed.\n');
            process.stderr.write('--- Server connected successfully to stdio transport ---\n');

            // Error handling
            process.on('uncaughtException', (error) => {
                 const stack = error instanceof Error ? error.stack : 'No stack available';
                 process.stderr.write(`--- UNCAUGHT EXCEPTION: ${error} \n${stack} ---\n`);
                 process.exit(1);
            });
            process.on('unhandledRejection', (reason) => {
                const reasonStr = reason instanceof Error ? `${reason.message}\n${reason.stack}` : String(reason);
                process.stderr.write(`--- UNHANDLED REJECTION: ${reasonStr} ---\n`);
                process.exit(1);
            });
        } catch (error) {
             const stack = error instanceof Error ? error.stack : 'No stack available';
             process.stderr.write(`--- ERROR in startServer try block: ${error} \n${stack} ---\n`);
             process.exit(1);
        }
    } else {
        process.stderr.write(`--- ERROR: --stdio flag not found in process.argv: [${process.argv.join(', ')}] ---\n`);
        process.exit(1);
    }
}

// Start the server if not testing
const isTestEnv = process.env.NODE_ENV === 'test' || process.env.VITEST;
if (!isTestEnv) {
    process.stderr.write('--- Calling startServer() ---\n');
    startServer();
    process.stderr.write('--- Returned from startServer() call (process might wait) ---\n');
}
