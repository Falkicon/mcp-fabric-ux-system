import pino, { type LoggerOptions } from 'pino';
import { logLevel } from './config.js'; // Import logLevel from config
import { z } from 'zod';

// Log Level
const defaultLogLevel: LevelWithSilent = 'info';
const logLevelSchema = z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']);
const logLevel = logLevelSchema.parse(process.env.MCP_LOG_LEVEL ?? defaultLogLevel);

// Check if we're in stdio mode
const isStdioMode = process.argv.includes('--stdio');

let logger: pino.Logger;

// Use pino-pretty for local development, basic JSON for production/other
if (process.env.NODE_ENV === 'development') {
  console.error('[Logger] Initializing Pino for DEVELOPMENT with pino-pretty');
  const pinoOptions = {
    level: logLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
      },
    },
  };
  // In development, pino-pretty writes to stdout, but we might want stderr
  logger = pino.default(pinoOptions, process.stderr);
} else {
  // For production or other environments (like Vercel)
  console.error(`[Logger] Initializing Pino for PRODUCTION/OTHER environment (NODE_ENV: ${process.env.NODE_ENV})`);
  const pinoOptions = {
    level: logLevel,
    // Standard JSON logging, Vercel should capture stdout/stderr
  };
  logger = pino.default(pinoOptions);
}

console.error(`[Logger] Pino instance created. Level: ${logger.level}`);

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
