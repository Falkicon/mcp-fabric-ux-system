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
    port = parseInt(process.env.PORT, 10);
    if (isNaN(port)) {
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

// Custom Greeting Prefix (Example)
const customGreetingPrefix = process.env.MCP_GREETING_PREFIX || '';

// --- Logging removed from here --- 

export {
    transportType,
    serverPort,
    logLevel,
    customGreetingPrefix
};
