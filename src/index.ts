process.stderr.write('--- Top of src/index.ts ---\n');

process.stderr.write('--- Importing MCP SDK ---\n');
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
process.stderr.write('--- Finished Importing MCP SDK ---\n');

process.stderr.write('--- Importing Zod ---\n');
import { z } from 'zod';
process.stderr.write('--- Finished Importing Zod ---\n');

process.stderr.write('--- Importing Logger ---\n');
import logger from './logger.js';
process.stderr.write('--- Finished Importing Logger ---\n');

// Only import config/errors if absolutely needed by minimal server
// import { customGreetingPrefix, transportType } from './config.js';
// import { ToolExecutionError, AppError } from './errors.js';

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

const log = logger; // Use logger after it's imported

// --- NO TOOL/RESOURCE/PROMPT REGISTRATIONS ---

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
