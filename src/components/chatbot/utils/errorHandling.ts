import { CHATBOT_CONFIG } from '../config';

/**
 * Custom error class for chatbot-related errors
 */
export class ChatbotError extends Error {
    public code: string;
    public status: number;
    public originalError?: Error;

    constructor(message: string, code: string, status: number = 500, originalError?: Error) {
        super(message);
        this.name = 'ChatbotError';
        this.code = code;
        this.status = status;
        this.originalError = originalError;
    }
}

/**
 * Error codes for the chatbot
 */
export const ErrorCodes = {
    // Authentication errors
    AUTH_ERROR: 'auth_error',
    SESSION_EXPIRED: 'session_expired',
    UNAUTHORIZED: 'unauthorized',

    // API errors
    API_ERROR: 'api_error',
    TIMEOUT: 'timeout',
    RATE_LIMIT: 'rate_limit',

    // Database errors
    DB_ERROR: 'db_error',
    NOT_FOUND: 'not_found',

    // OpenAI errors
    OPENAI_ERROR: 'openai_error',

    // Validation errors
    VALIDATION_ERROR: 'validation_error',

    // Unknown errors
    UNKNOWN_ERROR: 'unknown_error',
};

/**
 * Log an error to the console if debug mode is enabled
 */
export function logError(error: Error | ChatbotError, context?: Record<string, any>): void {
    if (!CHATBOT_CONFIG.debug.enabled) {
        return;
    }

    const logLevel = CHATBOT_CONFIG.debug.logLevel;

    if (logLevel === 'error' || logLevel === 'warn' || logLevel === 'info' || logLevel === 'debug') {
        console.error('[Chatbot Error]', {
            message: error.message,
            name: error.name,
            stack: error.stack,
            ...(error instanceof ChatbotError && {
                code: error.code,
                status: error.status,
                originalError: error.originalError,
            }),
            ...(context && { context }),
        });
    }
}

/**
 * Handle an error and return a user-friendly message
 */
export function handleError(error: Error | unknown, context?: Record<string, any>): string {
    let chatbotError: ChatbotError;

    if (error instanceof ChatbotError) {
        chatbotError = error;
    } else if (error instanceof Error) {
        // Convert standard Error to ChatbotError
        chatbotError = new ChatbotError(
            error.message,
            ErrorCodes.UNKNOWN_ERROR,
            500,
            error
        );
    } else {
        // Handle non-Error objects
        chatbotError = new ChatbotError(
            'An unknown error occurred',
            ErrorCodes.UNKNOWN_ERROR,
            500
        );
    }

    // Log the error
    logError(chatbotError, context);

    // Return user-friendly message based on error code
    switch (chatbotError.code) {
        case ErrorCodes.AUTH_ERROR:
        case ErrorCodes.SESSION_EXPIRED:
        case ErrorCodes.UNAUTHORIZED:
            return 'Authentication error. Please sign in again.';

        case ErrorCodes.API_ERROR:
            return 'Error communicating with the server. Please try again.';

        case ErrorCodes.TIMEOUT:
            return 'Request timed out. Please try again.';

        case ErrorCodes.RATE_LIMIT:
            return 'Too many requests. Please try again later.';

        case ErrorCodes.DB_ERROR:
        case ErrorCodes.NOT_FOUND:
            return 'Error retrieving data. Please try again.';

        case ErrorCodes.OPENAI_ERROR:
            return 'Error generating response. Please try again.';

        case ErrorCodes.VALIDATION_ERROR:
            return 'Invalid input. Please check your message and try again.';

        case ErrorCodes.UNKNOWN_ERROR:
        default:
            return 'An unexpected error occurred. Please try again.';
    }
} 