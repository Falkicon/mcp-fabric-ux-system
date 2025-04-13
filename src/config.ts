import dotenv from 'dotenv';
import path from 'node:path';
// import logger from './logger.js'; // Don't import logger here
import { z } from 'zod';
import type { LevelWithSilent } from 'pino'; // Import pino type if needed elsewhere, or remove

// Load environment variables from .env file
// Determine the path to the .env file based on the current working directory
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
      port = 8080; // Fallback to default if parsing fails
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

// Pinecone Configuration
const pineconeApiKey = process.env.PINECONE_API_KEY;
// Default Pinecone environment to "us-east-1" if not specified
const pineconeEnvironment = process.env.PINECONE_ENVIRONMENT || 'us-east-1';
const pineconeIndexName = process.env.PINECONE_INDEX_NAME || 'fabric-ux-system'; // Default index name

// --- MCP Server Auth Configuration ---
const mcpApiKey = process.env.MCP_API_KEY;

// Validation for required environment variables
if (!pineconeApiKey) {
    console.warn('Missing required environment variable: PINECONE_API_KEY');
    // Consider throwing an error in production environments or if essential
    // throw new Error('Missing required environment variable: PINECONE_API_KEY');
}

// Log the Pinecone configuration being used
console.error(`[CONFIG] Using Pinecone environment: ${pineconeEnvironment}`);
console.error(`[CONFIG] Using Pinecone index: ${pineconeIndexName}`);
console.error(`[CONFIG] Pinecone API key provided: ${pineconeApiKey ? 'Yes' : 'No'}`);

if (!mcpApiKey) {
    console.warn('Missing required environment variable: MCP_API_KEY. Server auth will be disabled.');
    // Allow proceeding without auth key for flexibility, but warn loudly.
}

// --- Logging removed from here --- 

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
