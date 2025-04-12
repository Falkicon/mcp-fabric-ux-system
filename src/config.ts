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
const chromaServerUrl = process.env.CHROMA_SERVER_URL || 'http://127.0.0.1:8000';
const embeddingModelName = process.env.EMBEDDING_MODEL_NAME || 'Xenova/all-MiniLM-L6-v2';
const chromaCollectionName = process.env.CHROMA_COLLECTION_NAME || 'fabric_ux_docs';
// Deprecated - vectorDbPath is no longer used for server connection
// const vectorDbPath = path.resolve(process.env.VECTOR_DB_PATH || './db'); 

// Custom Greeting Prefix (Example)
const customGreetingPrefix = process.env.MCP_GREETING_PREFIX || '';

// --- Logging removed from here --- 

export {
    transportType,
    serverPort,
    logLevel,
    // customGreetingPrefix // <-- Removed as it seems unused
    // RAG Config Exports
    docsPath,
    chromaServerUrl,
    embeddingModelName,
    chromaCollectionName,
    // vectorDbPath // Not needed for server operation
};
