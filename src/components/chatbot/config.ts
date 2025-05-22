/**
 * Configuration for the chatbot component
 */

export const CHATBOT_CONFIG = {
    // UI Configuration
    ui: {
        title: 'Chat with a Recruiter Assistant',
        subtitle: 'Ask me anything about this candidate',
        placeholder: 'Type your message here...',
        welcomeMessage: 'Hello! I\'m here to help you learn more about this candidate. What would you like to know?',
        loadingMessage: 'Thinking...',
        errorMessage: 'Sorry, something went wrong. Please try again.',
        signInPrompt: 'Please sign in to continue the conversation.',
        signInButtonText: 'Sign In',
        signOutButtonText: 'Sign Out',
        closeButtonText: 'Close',
        sendButtonText: 'Send',
        // Theme colors
        colors: {
            primary: '#3b82f6', // Blue
            secondary: '#10b981', // Green
            background: '#ffffff', // White
            text: '#1f2937', // Dark gray
            lightText: '#6b7280', // Light gray
            error: '#ef4444', // Red
        },
        // Animation settings
        animation: {
            duration: 300, // ms
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
    },

    // API Configuration
    api: {
        chatEndpoint: '/api/chatbot/chat',
        historyEndpoint: '/api/chatbot/history',
        timeout: 30000, // 30 seconds
        retries: 3,
        retryDelay: 1000, // 1 second
    },

    // OpenAI Configuration
    openai: {
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 500,
        topP: 1,
        frequencyPenalty: 0,
        presencePenalty: 0,
    },

    // Authentication Configuration
    auth: {
        providers: ['github', 'google'],
        redirectUrl: '/auth/callback',
        sessionExpiry: 60 * 60 * 24 * 7, // 1 week in seconds
    },

    // Storage Configuration
    storage: {
        messageLimit: 100, // Maximum number of messages to store per conversation
        conversationLimit: 10, // Maximum number of conversations to store per user
    },

    // Debug Configuration
    debug: {
        enabled: process.env.NODE_ENV === 'development',
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
    },
}; 