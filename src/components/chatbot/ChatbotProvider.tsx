// Simple utility for Botpress chat functionality
// This version avoids React context and components to prevent TypeScript errors

// Type declaration for window.botpress
declare global {
    interface Window {
        botpress?: {
            init: (config: any) => void;
            open?: () => void;
            close?: () => void;
            on?: (event: string, callback: () => void) => void;
        };
    }
}

// Simple utility function to open the chat
export function openChat(): void {
    // Try to use Botpress if available
    if (typeof window !== 'undefined' && window.botpress && typeof window.botpress.open === 'function') {
        try {
            window.botpress.open();
        } catch (error) {
            console.error('Error opening Botpress chat:', error);
        }
    }
}

// Export a dummy component that doesn't use React
export const ChatbotProvider = {
    name: 'ChatbotProvider',
    isEnabled: true
}; 