import pino, { type LoggerOptions } from 'pino';
import { logLevel } from './config.js'; // Import logLevel from config

// Determine log level from environment or default
// const logLevel = process.env.LOG_LEVEL || 'info'; // Removed direct env access

// Check if we're in stdio mode
const isStdioMode = process.argv.includes('--stdio');

let logger: pino.Logger;

if (process.env.NODE_ENV === 'development') {
  const pinoOptions = {
    level: logLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname', // Don't ignore time
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
      },
    },
  };
  // Revert to pino.default() based on TS2349 error with NodeNext
  logger = pino.default(pinoOptions, process.stderr);

} else {
  const pinoOptions = {
    level: logLevel,
    // Add other production options if needed (e.g., serializers)
  };
  // Revert to pino.default()
  logger = pino.default(pinoOptions);
}

// Log startup configuration but only if not in stdio mode (to avoid polluting stdout initially)
if (!isStdioMode) {
  logger.info(
    {
      // Log level is already part of pino's standard log fields if levelFirst isn't used
      // level: logLevel, // Can likely remove this redundant field
      stdioMode: isStdioMode,
      env: process.env.NODE_ENV,
    },
    'Logger initialized'
  );
}

export default logger;
