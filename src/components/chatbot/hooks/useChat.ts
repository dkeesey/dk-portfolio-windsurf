import * as React from 'react';
import { useAuth } from './useAuth';
import { addCsrfToken } from '@/lib/csrf';
import type { Message } from '../ui/ChatContainer';

interface ChatResponse {
    message: string;
    conversationId: string;
    tokens: number;
    resumeRequested?: boolean;
    metadata?: {
        title?: string;
    };
}

interface ConversationMetadata {
    id: string;
    title: string;
    lastMessageAt: Date;
    messageCount: number;
    tokenCount: number;
}

export function useChat() {
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [conversationId, setConversationId] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [metadata, setMetadata] = React.useState<ConversationMetadata | null>(null);
    const [hasMoreMessages, setHasMoreMessages] = React.useState(false);
    const { recruiter, isAuthenticated } = useAuth();

    // Load conversation history if authenticated and recruiter exists
    React.useEffect(() => {
        if (isAuthenticated && recruiter) {
            loadConversationHistory();
        }
    }, [isAuthenticated, recruiter]);

    // Load conversation history from the server
    const loadConversationHistory = async () => {
        if (!recruiter) return;

        try {
            setIsLoading(true);
            setError(null);

            // Fetch the most recent conversation for this recruiter
            const response = await fetch(`/api/chatbot/history?recruiterId=${recruiter.id}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to load conversation history');
            }

            const data = await response.json();

            if (data.conversationId) {
                setConversationId(data.conversationId);

                // Convert the messages to the correct format
                const formattedMessages: Message[] = data.messages.map((msg: any) => ({
                    id: msg.id,
                    content: msg.content,
                    role: msg.role,
                    timestamp: new Date(msg.created_at),
                }));

                setMessages(formattedMessages);

                // Set conversation metadata
                if (data.conversation) {
                    setMetadata({
                        id: data.conversation.id,
                        title: data.conversation.title,
                        lastMessageAt: new Date(data.conversation.last_message_at),
                        messageCount: data.messages.length,
                        tokenCount: data.conversation.total_tokens || 0
                    });
                }

                // Check if there are more messages to load
                setHasMoreMessages(data.hasMoreMessages || false);
            }
        } catch (error) {
            console.error('Error loading conversation history:', error);
            setError(error instanceof Error ? error.message : 'Failed to load conversation history');
        } finally {
            setIsLoading(false);
        }
    };

    // Load more messages (pagination)
    const loadMoreMessages = async () => {
        if (!recruiter || !conversationId || !hasMoreMessages) return;

        try {
            setIsLoading(true);
            setError(null);

            const oldestMessageId = messages.length > 0 ? messages[0].id : null;

            // Add CSRF token to headers
            const headers = addCsrfToken({
                'Content-Type': 'application/json',
            });

            // Fetch older messages
            const response = await fetch(
                `/api/chatbot/history?recruiterId=${recruiter.id}&conversationId=${conversationId}&before=${oldestMessageId}`,
                { headers }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to load more messages');
            }

            const data = await response.json();

            if (data.messages && data.messages.length > 0) {
                // Convert the messages to the correct format
                const formattedMessages: Message[] = data.messages.map((msg: any) => ({
                    id: msg.id,
                    content: msg.content,
                    role: msg.role,
                    timestamp: new Date(msg.created_at),
                }));

                // Add older messages to the beginning of the array
                setMessages(prev => [...formattedMessages, ...prev]);

                // Update hasMoreMessages flag
                setHasMoreMessages(data.hasMoreMessages || false);
            } else {
                setHasMoreMessages(false);
            }
        } catch (error) {
            console.error('Error loading more messages:', error);
            setError(error instanceof Error ? error.message : 'Failed to load more messages');
        } finally {
            setIsLoading(false);
        }
    };

    // Send a message to the chatbot
    const sendMessage = async (content: string) => {
        if (!recruiter) {
            setError('You must be signed in to send messages');
            return null;
        }

        try {
            setIsLoading(true);
            setError(null);

            // Add the user message to the UI immediately
            const userMessage: Message = {
                content,
                role: 'user',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, userMessage]);

            // Add CSRF token to headers
            const headers = addCsrfToken({
                'Content-Type': 'application/json',
            });

            // Send the message to the server
            const response = await fetch('/api/chatbot/chat', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    message: content,
                    conversationId,
                    recruiterId: recruiter.id,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }

            const data: ChatResponse = await response.json();

            // Update the conversation ID if this is a new conversation
            if (data.conversationId && !conversationId) {
                setConversationId(data.conversationId);
            }

            // Add the assistant's response to the UI
            const assistantMessage: Message = {
                content: data.message,
                role: 'assistant',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);

            // Update metadata if available
            if (data.metadata) {
                setMetadata({
                    id: data.conversationId,
                    title: data.metadata.title || 'New Conversation',
                    lastMessageAt: new Date(),
                    messageCount: metadata ? metadata.messageCount + 2 : 2, // +2 for user and assistant messages
                    tokenCount: metadata ? metadata.tokenCount + (data.tokens || 0) : data.tokens || 0
                });
            }

            return data;
        } catch (error) {
            console.error('Error sending message:', error);
            setError(error instanceof Error ? error.message : 'Failed to send message');

            // Add an error message to the UI
            setMessages(prev => [
                ...prev,
                {
                    content: 'Sorry, there was an error processing your message. Please try again later.',
                    role: 'assistant',
                    timestamp: new Date(),
                },
            ]);

            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Clear the current conversation
    const clearConversation = () => {
        setMessages([]);
        setConversationId(null);
        setError(null);
        setMetadata(null);
        setHasMoreMessages(false);
    };

    // Start a new conversation
    const startNewConversation = () => {
        clearConversation();
    };

    return {
        messages,
        sendMessage,
        clearConversation,
        startNewConversation,
        loadMoreMessages,
        isLoading,
        error,
        conversationId,
        hasMoreMessages,
        metadata,
    };
} 