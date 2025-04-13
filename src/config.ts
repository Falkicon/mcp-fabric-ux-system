import dotenv from 'dotenv';
import path from 'node:path';
import { z } from 'zod';
import type { LevelWithSilent } from 'pino';

// Load environment variables from .env file
const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

// Transport Type (stdio or http)
const transportType = process.env.MCP_TRANSPORT === 'http' ? 'http' : 'stdio';

// Server Port (only relevant for http transport)
let port = 8080; // Default port
if (transportType === 'http' && process.env.PORT) {
  try {
    port = Number.parseInt(process.env.PORT, 10);
    if (Number.isNaN(port)) {
      port = 8080; // Fallback to default
      console.warn('Invalid PORT environment variable. Using default port 8080.');
    }
  } catch (error) {
    port = 8080; // Fallback on error
    console.warn('Error parsing PORT environment variable. Using default port 8080.');
  }
}
const serverPort = port;

// Log Level
const defaultLogLevel: LevelWithSilent = 'info';
const logLevelSchema = z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']);
const logLevel = logLevelSchema.parse(process.env.MCP_LOG_LEVEL ?? defaultLogLevel);

// RAG Configuration
const docsPath = path.resolve(process.env.DOCS_PATH || '_docs_fabric_ux');
const embeddingModelName = process.env.EMBEDDING_MODEL_NAME || 'Xenova/all-MiniLM-L6-v2';

// Pinecone Configuration with strong defaults and explicit handling
const pineconeApiKey = process.env.PINECONE_API_KEY || '';

// CRITICAL: Ensure Pinecone environment is explicitly defined
// Default to us-east-1 based on the user's configuration
const pineconeEnvironment = (() => {
  const envVar = process.env.PINECONE_ENVIRONMENT;
  if (!envVar || envVar.trim() === '') {
    console.warn('PINECONE_ENVIRONMENT not set. Using default value "us-east-1"');
    return 'us-east-1'; // Default based on user's Pinecone console
  }
  return envVar;
})();

// Default index name
const pineconeIndexName = process.env.PINECONE_INDEX_NAME || 'fabric-ux-system';

// --- MCP Server Auth Configuration ---
const mcpApiKey = process.env.MCP_API_KEY || '';

// Log complete configuration to make debugging easier
console.error('--------- SERVER CONFIGURATION ---------');
console.error(`Pinecone Environment: "${pineconeEnvironment}"`);
console.error(`Pinecone Index: "${pineconeIndexName}"`);
console.error(`Pinecone API Key: ${pineconeApiKey ? '[Set]' : '[Not Set]'}`);
console.error(`MCP API Key: ${mcpApiKey ? '[Set]' : '[Not Set]'}`);
console.error(`Embedding Model: ${embeddingModelName}`);
console.error('---------------------------------------');

// Validate critical configuration with clear error messages
if (!pineconeApiKey) {
    const errorMessage = 'CRITICAL ERROR: PINECONE_API_KEY is not set';
    console.error(errorMessage);
    throw new Error(errorMessage);
}

if (!mcpApiKey) {
    console.warn('WARNING: MCP_API_KEY is not set. Authentication will be disabled.');
}

// Function to get all environment variables for diagnostics
// This is useful for debugging deployment issues
export function getDiagnostics() {
    return {
        environment: {
            pineconeEnvironment,
            pineconeIndexName,
            pineconeApiKeyProvided: !!pineconeApiKey,
            mcpApiKeyProvided: !!mcpApiKey,
            embeddingModel: embeddingModelName,
            nodeEnv: process.env.NODE_ENV || 'development',
            serverPort
        },
        runtimeInfo: {
            platform: process.platform,
            nodeVersion: process.version,
            memory: process.memoryUsage()
        }
    };
}

export {
    transportType,
    serverPort,
    logLevel,
    // RAG Config Exports
    docsPath,
    embeddingModelName,
    // Pinecone Config Exports
    pineconeApiKey,
    pineconeEnvironment,
    pineconeIndexName,
    // Auth Config Exports
    mcpApiKey,
};
