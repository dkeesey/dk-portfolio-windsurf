import { CHATBOT_CONFIG } from '../config';

/**
 * Event types for chatbot analytics
 */
export enum ChatbotEventType {
    OPEN = 'chatbot_open',
    CLOSE = 'chatbot_close',
    MESSAGE_SENT = 'message_sent',
    MESSAGE_RECEIVED = 'message_received',
    ERROR = 'chatbot_error',
    SIGN_IN = 'chatbot_sign_in',
    SIGN_OUT = 'chatbot_sign_out',
    CONVERSATION_STARTED = 'conversation_started',
    CONVERSATION_ENDED = 'conversation_ended',
}

/**
 * Interface for chatbot analytics events
 */
export interface ChatbotEvent {
    type: ChatbotEventType;
    timestamp: number;
    data?: Record<string, any>;
}

/**
 * Track a chatbot event
 */
export function trackEvent(type: ChatbotEventType, data?: Record<string, any>): void {
    // Skip if debug mode is disabled
    if (!CHATBOT_CONFIG.debug.enabled) {
        return;
    }

    const event: ChatbotEvent = {
        type,
        timestamp: Date.now(),
        data,
    };

    // Log the event to console in development
    if (process.env.NODE_ENV === 'development') {
        console.log('[Chatbot Analytics]', event);
    }

    // In a real implementation, you would send this data to your analytics service
    // For example:
    // sendToAnalyticsService(event);
}

/**
 * Track when the chatbot is opened
 */
export function trackOpen(): void {
    trackEvent(ChatbotEventType.OPEN);
}

/**
 * Track when the chatbot is closed
 */
export function trackClose(): void {
    trackEvent(ChatbotEventType.CLOSE);
}

/**
 * Track when a message is sent by the user
 */
export function trackMessageSent(messageContent: string): void {
    trackEvent(ChatbotEventType.MESSAGE_SENT, {
        contentLength: messageContent.length,
    });
}

/**
 * Track when a message is received from the assistant
 */
export function trackMessageReceived(messageContent: string): void {
    trackEvent(ChatbotEventType.MESSAGE_RECEIVED, {
        contentLength: messageContent.length,
    });
}

/**
 * Track when an error occurs
 */
export function trackError(error: Error): void {
    trackEvent(ChatbotEventType.ERROR, {
        errorMessage: error.message,
        errorName: error.name,
    });
}

/**
 * Track when a user signs in
 */
export function trackSignIn(provider?: string): void {
    trackEvent(ChatbotEventType.SIGN_IN, {
        provider,
    });
}

/**
 * Track when a user signs out
 */
export function trackSignOut(): void {
    trackEvent(ChatbotEventType.SIGN_OUT);
}

/**
 * Track when a new conversation is started
 */
export function trackConversationStarted(conversationId: string): void {
    trackEvent(ChatbotEventType.CONVERSATION_STARTED, {
        conversationId,
    });
}

/**
 * Track when a conversation is ended
 */
export function trackConversationEnded(
    conversationId: string,
    messageCount: number,
    duration: number
): void {
    trackEvent(ChatbotEventType.CONVERSATION_ENDED, {
        conversationId,
        messageCount,
        duration,
    });
} 