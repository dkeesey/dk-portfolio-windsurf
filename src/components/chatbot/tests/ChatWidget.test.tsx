import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatWidget } from '../ui/ChatWidget';
import { ChatbotProvider } from '../ChatbotProvider';

// Mock the hooks
jest.mock('../hooks/useAuth', () => ({
    useAuth: () => ({
        user: null,
        session: null,
        isLoading: false,
        error: null,
        signIn: jest.fn(),
        signOut: jest.fn(),
        checkSession: jest.fn(),
    }),
}));

jest.mock('../hooks/useChat', () => ({
    useChat: () => ({
        messages: [],
        isLoading: false,
        error: null,
        conversationId: null,
        sendMessage: jest.fn(),
        loadConversation: jest.fn(),
    }),
}));

describe('ChatWidget', () => {
    it('renders the chat widget button', () => {
        render(
            <ChatbotProvider>
                <ChatWidget />
            </ChatbotProvider>
        );

        const chatButton = screen.getByRole('button', { name: /chat/i });
        expect(chatButton).toBeInTheDocument();
    });

    it('opens the chat when the button is clicked', () => {
        render(
            <ChatbotProvider>
                <ChatWidget />
            </ChatbotProvider>
        );

        const chatButton = screen.getByRole('button', { name: /chat/i });
        fireEvent.click(chatButton);

        const chatContainer = screen.getByTestId('chat-container');
        expect(chatContainer).toBeInTheDocument();
    });

    it('accepts controlled state via props', () => {
        const onOpenChange = jest.fn();

        render(
            <ChatbotProvider>
                <ChatWidget isOpen={true} onOpenChange={onOpenChange} />
            </ChatbotProvider>
        );

        const chatContainer = screen.getByTestId('chat-container');
        expect(chatContainer).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: /close/i });
        fireEvent.click(closeButton);

        expect(onOpenChange).toHaveBeenCalledWith(false);
    });
}); 