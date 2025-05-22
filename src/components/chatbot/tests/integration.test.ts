/**
 * Integration tests for the chatbot
 * 
 * These tests verify that the chatbot components work together correctly.
 * They test the full flow from user input to API calls to rendering responses.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChatWidget } from '../ui/ChatWidget';
import { ChatbotProvider } from '../ChatbotProvider';
import { createClient } from '@supabase/supabase-js';
import { CHATBOT_CONFIG } from '../config';

// Mock the Supabase client
jest.mock('@supabase/supabase-js', () => ({
    createClient: jest.fn(() => ({
        auth: {
            getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
            signInWithOAuth: jest.fn(),
            signOut: jest.fn(),
        },
    })),
}));

// Mock the fetch API
global.fetch = jest.fn();

describe('Chatbot Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (global.fetch as jest.Mock).mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    message: {
                        role: 'assistant',
                        content: 'Hello! How can I help you today?',
                    },
                    conversationId: '123e4567-e89b-12d3-a456-426614174000',
                }),
            })
        );
    });

    it('should render the chat widget and allow opening it', async () => {
        render(
            <ChatbotProvider>
            <ChatWidget />
            </ChatbotProvider>
        );

        // Find and click the chat button
        const chatButton = screen.getByRole('button', { name: /chat/i });
        expect(chatButton).toBeInTheDocument();

        fireEvent.click(chatButton);

        // Check if the chat container is visible
        const chatContainer = await screen.findByTestId('chat-container');
        expect(chatContainer).toBeInTheDocument();
    });

    it('should send a message and display the response', async () => {
        render(
            <ChatbotProvider>
            <ChatWidget isOpen={ true} />
        </ChatbotProvider>
        );

        // Find the input field and send button
        const inputField = screen.getByPlaceholderText(/type your message/i);
        const sendButton = screen.getByRole('button', { name: /send/i });

        // Type a message and send it
        fireEvent.change(inputField, { target: { value: 'Hello' } });
        fireEvent.click(sendButton);

        // Check if the user message is displayed
        const userMessage = await screen.findByText('Hello');
        expect(userMessage).toBeInTheDocument();

        // Check if the API was called correctly
        expect(global.fetch).toHaveBeenCalledWith(
            CHATBOT_CONFIG.api.chatEndpoint,
            expect.objectContaining({
                method: 'POST',
                headers: expect.objectContaining({
                    'Content-Type': 'application/json',
                }),
                body: expect.stringContaining('Hello'),
            })
        );

        // Check if the assistant response is displayed
        const assistantMessage = await screen.findByText('Hello! How can I help you today?');
        expect(assistantMessage).toBeInTheDocument();
    });

    it('should handle authentication flow', async () => {
        render(
            <ChatbotProvider>
            <ChatWidget isOpen={ true} />
        </ChatbotProvider>
        );

        // Find and click the sign in button
        const signInButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(signInButton);

        // Check if the Supabase auth method was called
        expect(createClient().auth.signInWithOAuth).toHaveBeenCalled();
    });

    it('should handle errors gracefully', async () => {
        // Mock a failed API call
        (global.fetch as jest.Mock).mockImplementation(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            })
        );

        render(
            <ChatbotProvider>
            <ChatWidget isOpen={ true} />
        </ChatbotProvider>
        );

        // Find the input field and send button
        const inputField = screen.getByPlaceholderText(/type your message/i);
        const sendButton = screen.getByRole('button', { name: /send/i });

        // Type a message and send it
        fireEvent.change(inputField, { target: { value: 'Hello' } });
        fireEvent.click(sendButton);

        // Check if the error message is displayed
        const errorMessage = await screen.findByText(/error/i);
        expect(errorMessage).toBeInTheDocument();
    });
}); 