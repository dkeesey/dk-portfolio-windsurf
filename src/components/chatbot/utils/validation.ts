import { ChatbotError, ErrorCodes } from './errorHandling';

/**
 * Validate a message content
 */
export function validateMessageContent(content: string): string {
    // Check if content is empty or only whitespace
    if (!content || content.trim() === '') {
        throw new ChatbotError(
            'Message content cannot be empty',
            ErrorCodes.VALIDATION_ERROR,
            400
        );
    }

    // Trim the content
    const trimmedContent = content.trim();

    // Check if content is too short
    if (trimmedContent.length < 2) {
        throw new ChatbotError(
            'Message content is too short',
            ErrorCodes.VALIDATION_ERROR,
            400
        );
    }

    // Check if content is too long
    if (trimmedContent.length > 4000) {
        throw new ChatbotError(
            'Message content is too long (maximum 4000 characters)',
            ErrorCodes.VALIDATION_ERROR,
            400
        );
    }

    return trimmedContent;
}

/**
 * Validate a conversation ID
 */
export function validateConversationId(conversationId: string | null): void {
    if (conversationId === null) {
        return; // Null is valid (new conversation)
    }

    // Check if conversation ID is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(conversationId)) {
        throw new ChatbotError(
            'Invalid conversation ID format',
            ErrorCodes.VALIDATION_ERROR,
            400
        );
    }
}

/**
 * Validate a recruiter ID
 */
export function validateRecruiterId(recruiterId: string): void {
    // Check if recruiter ID is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!recruiterId || !uuidRegex.test(recruiterId)) {
        throw new ChatbotError(
            'Invalid recruiter ID format',
            ErrorCodes.VALIDATION_ERROR,
            400
        );
    }
}

/**
 * Validate a message object
 */
export function validateMessage(message: { role: string; content: string }): void {
    // Validate role
    if (!message.role || !['user', 'assistant', 'system'].includes(message.role)) {
        throw new ChatbotError(
            'Invalid message role',
            ErrorCodes.VALIDATION_ERROR,
            400
        );
    }

    // Validate content
    validateMessageContent(message.content);
}

/**
 * Validate API request parameters
 */
export function validateRequestParams(params: Record<string, any>, requiredParams: string[]): void {
    for (const param of requiredParams) {
        if (params[param] === undefined || params[param] === null) {
            throw new ChatbotError(
                `Missing required parameter: ${param}`,
                ErrorCodes.VALIDATION_ERROR,
                400
            );
        }
    }
}

/**
 * Sanitize a string to prevent XSS attacks
 */
export function sanitizeString(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Sanitize an object to prevent XSS attacks
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const result: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            result[key] = sanitizeString(value);
        } else if (typeof value === 'object' && value !== null) {
            result[key] = sanitizeObject(value);
        } else {
            result[key] = value;
        }
    }

    return result as T;
} 