import pino, { type LoggerOptions } from 'pino';
import { logLevel } from './config.js'; // Import logLevel from config

// Determine log level from environment or default
// const logLevel = process.env.LOG_LEVEL || 'info'; // Removed direct env access

// Check if we're in stdio mode
const isStdioMode = process.argv.includes('--stdio');

// Configure Pino options
const pinoOptions: LoggerOptions = {
  level: logLevel, // Use imported logLevel
};

let logger: pino.Logger;

// If in stdio mode, force logs to stderr rather than stdout
if (isStdioMode) {
  // pinoOptions.transport = { // REMOVED transport configuration for stdio mode
  //   target: 'pino-pretty',
  //   options: {
  //     colorize: !process.env.NO_COLOR,
  //     levelFirst: true,
  //     translateTime: 'SYS:standard',
  //     // Crucial: Write to stderr when in stdio mode
  //     destination: process.stderr, // <-- This caused DataCloneError in worker
  //   },
  // };
  // Initialize pino to write directly to stderr in stdio mode
  logger = pino.default(pinoOptions, process.stderr);
} else {
  // For non-stdio modes
  if (process.env.NODE_ENV !== 'production') {
    // Enable pretty printing for non-production environments (writes to stdout by default)
    pinoOptions.transport = {
      target: 'pino-pretty',
      options: {
        colorize: !process.env.NO_COLOR,
        levelFirst: true,
        translateTime: 'SYS:standard',
      },
    };
  }
  // Initialize pino with options (writes to stdout by default if no transport)
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
