/**
 * Structured Logger for deankeesey.com
 *
 * Uses pino for high-performance, JSON-structured logging.
 * Environment-aware: debug in development, info in production.
 *
 * Usage:
 *   import { logger } from '@/lib/logger';
 *   logger.info({ userId, action }, 'User performed action');
 *   logger.error({ err }, 'Something failed');
 */

import pino from 'pino';

// Determine log level based on environment
const getLogLevel = (): string => {
  if (typeof process !== 'undefined') {
    if (process.env.LOG_LEVEL) return process.env.LOG_LEVEL;
    if (process.env.NODE_ENV === 'development') return 'debug';
    if (process.env.NODE_ENV === 'test') return 'silent';
  }
  return 'info';
};

// Browser-safe transport configuration
const getBrowserTransport = () => ({
  target: 'pino/file',
  options: { destination: 1 }, // stdout
});

// Node.js pretty transport for development
const getNodeTransport = () => {
  if (
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development'
  ) {
    return {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    };
  }
  return undefined;
};

// Create the logger instance
const createLogger = () => {
  const isBrowser = typeof window !== 'undefined';

  const options: pino.LoggerOptions = {
    level: getLogLevel(),
    base: {
      env: typeof process !== 'undefined' ? process.env.NODE_ENV : 'unknown',
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
      level: (label) => ({ level: label }),
    },
  };

  // In browser, use a minimal console-based logger
  if (isBrowser) {
    return pino({
      ...options,
      browser: {
        asObject: true,
        write: {
          info: (o) => console.info(JSON.stringify(o)),
          warn: (o) => console.warn(JSON.stringify(o)),
          error: (o) => console.error(JSON.stringify(o)),
          debug: (o) => console.debug(JSON.stringify(o)),
        },
      },
    });
  }

  // In Node.js, use pino with optional pretty printing
  const transport = getNodeTransport();
  if (transport) {
    return pino(options, pino.transport(transport));
  }

  return pino(options);
};

// Export the logger instance
export const logger = createLogger();

// Export child logger factory for request-scoped logging
export const createChildLogger = (context: Record<string, unknown>) => {
  return logger.child(context);
};

// Convenience methods with context
export const logRequest = (
  requestId: string,
  method: string,
  path: string,
  context?: Record<string, unknown>
) => {
  logger.info({ requestId, method, path, ...context }, 'Request received');
};

export const logResponse = (
  requestId: string,
  statusCode: number,
  durationMs: number,
  context?: Record<string, unknown>
) => {
  const level = statusCode >= 500 ? 'error' : statusCode >= 400 ? 'warn' : 'info';
  logger[level](
    { requestId, statusCode, durationMs, ...context },
    'Response sent'
  );
};

export const logError = (
  error: Error,
  context?: Record<string, unknown>
) => {
  logger.error(
    {
      err: {
        message: error.message,
        name: error.name,
        stack: error.stack,
      },
      ...context,
    },
    'Error occurred'
  );
};

export default logger;
