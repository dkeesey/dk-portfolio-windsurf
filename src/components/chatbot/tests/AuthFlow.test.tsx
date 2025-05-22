import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ChatWidget } from '../ui/ChatWidget';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';

// Mock the hooks
vi.mock('../hooks/useAuth', () => ({
    useAuth: vi.fn(),
}));

vi.mock('../hooks/useChat', () => ({
    useChat: vi.fn(),
}));

describe('Authentication Flow', () => {
    // Setup default mock returns
    beforeEach(() => {
        // Default auth mock
        (useAuth as any).mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            recruiter: null,
            signIn: vi.fn().mockResolvedValue(true),
            signOut: vi.fn().mockResolvedValue(true),
        });

        // Default chat mock
        (useChat as any).mockReturnValue({
            messages: [],
            sendMessage: vi.fn(),
            isLoading: false,
            error: null,
            conversationId: null,
            clearConversation: vi.fn(),
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should show login options when not authenticated', () => {
        render(<ChatWidget isOpen={true} />);

        expect(screen.getByText('Sign in to chat')).toBeInTheDocument();
        expect(screen.getByText('Sign in with GitHub')).toBeInTheDocument();
        expect(screen.getByText('Sign in with LinkedIn')).toBeInTheDocument();
    });

    it('should call signIn when GitHub login button is clicked', async () => {
        const mockSignIn = vi.fn().mockResolvedValue(true);
        (useAuth as any).mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            recruiter: null,
            signIn: mockSignIn,
            signOut: vi.fn(),
        });

        render(<ChatWidget isOpen={true} />);

        const githubButton = screen.getByText('Sign in with GitHub');
        fireEvent.click(githubButton);

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith('github');
        });
    });

    it('should call signIn when LinkedIn login button is clicked', async () => {
        const mockSignIn = vi.fn().mockResolvedValue(true);
        (useAuth as any).mockReturnValue({
            isAuthenticated: false,
            isLoading: false,
            recruiter: null,
            signIn: mockSignIn,
            signOut: vi.fn(),
        });

        render(<ChatWidget isOpen={true} />);

        const linkedinButton = screen.getByText('Sign in with LinkedIn');
        fireEvent.click(linkedinButton);

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith('linkedin');
        });
    });

    it('should show chat interface when authenticated', () => {
        (useAuth as any).mockReturnValue({
            isAuthenticated: true,
            isLoading: false,
            recruiter: { id: '123', name: 'Test Recruiter', email: 'test@example.com' },
            signIn: vi.fn(),
            signOut: vi.fn(),
        });

        render(<ChatWidget isOpen={true} />);

        // The ChatContainer should be rendered instead of login buttons
        expect(screen.queryByText('Sign in to chat')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign in with GitHub')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign in with LinkedIn')).not.toBeInTheDocument();
    });

    it('should show loading state when authentication is in progress', () => {
        (useAuth as any).mockReturnValue({
            isAuthenticated: false,
            isLoading: true,
            recruiter: null,
            signIn: vi.fn(),
            signOut: vi.fn(),
        });

        render(<ChatWidget isOpen={true} />);

        // Should show loading state
        expect(screen.queryByText('Sign in to chat')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign in with GitHub')).not.toBeInTheDocument();
        expect(screen.queryByText('Sign in with LinkedIn')).not.toBeInTheDocument();
    });

    it('should load conversation history when authenticated', async () => {
        const mockLoadConversationHistory = vi.fn();

        (useAuth as any).mockReturnValue({
            isAuthenticated: true,
            isLoading: false,
            recruiter: { id: '123', name: 'Test Recruiter', email: 'test@example.com' },
            signIn: vi.fn(),
            signOut: vi.fn(),
        });

        (useChat as any).mockReturnValue({
            messages: [
                { id: '1', content: 'Hello', role: 'user', timestamp: new Date() },
                { id: '2', content: 'Hi there!', role: 'assistant', timestamp: new Date() },
            ],
            sendMessage: vi.fn(),
            isLoading: false,
            error: null,
            conversationId: '123',
            clearConversation: vi.fn(),
            loadConversationHistory: mockLoadConversationHistory,
        });

        render(<ChatWidget isOpen={true} />);

        // The chat messages should be rendered
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('Hi there!')).toBeInTheDocument();
    });
}); 