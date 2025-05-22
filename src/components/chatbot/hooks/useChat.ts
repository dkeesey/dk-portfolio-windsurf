import * as React from 'react';
import { useAuth } from './useAuth';
import { addCsrfToken } from '@/lib/csrf';
import type { Message } from '../ui/ChatContainer';
import { trackMessageState, diagnoseMessageIssues, logDebug } from '@/lib/chatDebugger';

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
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    const [messages, setMessages] = React.useState<Message[]>([]);
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    const messagesRef = React.useRef<Message[]>([]);
    
    // Keep a reference to the current messages to avoid closure issues
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    React.useEffect(() => {
        messagesRef.current = messages;
        logDebug('Messages updated, new state:', messages);
        
        // Track changes for debugging
        trackMessageState(messages);
        
        // Run diagnostics on messages
        diagnoseMessageIssues(messages);
        
        // Log if messages array is empty
        if (messages.length === 0) {
            logDebug('Issue detected: Empty messages array');
        }
    }, [messages]);

    // @ts-ignore - Ignoring TypeScript errors for React hooks
    const [isLoading, setIsLoading] = React.useState(false);
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    const [conversationId, setConversationId] = React.useState<string | null>(null);
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    const [error, setError] = React.useState<string | null>(null);
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    const [metadata, setMetadata] = React.useState<ConversationMetadata | null>(null);
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    const [hasMoreMessages, setHasMoreMessages] = React.useState(false);
    const { recruiter, isAuthenticated, guestMode } = useAuth();

    // Listen for guest mode being enabled
    // @ts-ignore - Ignoring TypeScript errors for React hooks
    React.useEffect(() => {
        const handleGuestModeEnabled = () => {
            logDebug('Guest mode enabled event received');
            // Clear any existing messages and reset state for guest mode
            setMessages([]);
            setConversationId(null);
            setError(null);
            setMetadata(null);
            setHasMoreMessages(false);
        };
        
        window.addEventListener('guestModeEnabled', handleGuestModeEnabled);
        
        return () => {
            window.removeEventListener('guestModeEnabled', handleGuestModeEnabled);
        };
    }, []);

    // Load conversation history if authenticated and recruiter exists
    // @ts-ignore - Ignoring TypeScript errors for React hooks
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

            // For guest mode, we don't load history
            if (guestMode) {
                setConversationId(null);
                setMessages([]);
                setMetadata(null);
                setHasMoreMessages(false);
                return;
            }

            // Fetch the most recent conversation for this recruiter
            const response = await fetch(`/api/chatbot/history?recruiterId=${recruiter.id}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.warn('History API response not OK:', response.status, errorData);
                
                // Start with an empty conversation state but don't throw error
                setConversationId(null);
                setMessages([]);
                setMetadata(null);
                setHasMoreMessages(false);
                return;
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
            } else {
                // No conversation found, start with empty state
                setConversationId(null);
                setMessages([]);
                setMetadata(null);
                setHasMoreMessages(false);
            }
        } catch (error) {
            console.error('Error loading conversation history:', error);
            // Just log but don't set error to avoid disrupting the UI
            setConversationId(null);
            setMessages([]);
            setMetadata(null);
            setHasMoreMessages(false);
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
        if (!recruiter && !guestMode) {
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
                id: 'user-' + Date.now(),
            };

            logDebug('Adding user message to state:', userMessage);
            // Use a callback function to ensure we're working with the most current state
            setMessages(prev => {
                const newMessages = [...prev, userMessage];
                logDebug('New messages state after adding user message:', newMessages);
                return newMessages;
            });

            logDebug("Sending message to API:", content);
            logDebug("Guest mode:", guestMode);
            
            // For guest mode, create a modified API request
            if (guestMode) {
                logDebug("Using guest mode with API");
                
                // Add the user message to the UI immediately
                const userMessage: Message = {
                    content,
                    role: 'user',
                    timestamp: new Date(),
                    id: 'user-guest-' + Date.now(),
                };
                
                setMessages(prevMessages => [...(prevMessages || []), userMessage]);
                
                try {
                    // Add CSRF token to headers
                    const headers = addCsrfToken({
                        'Content-Type': 'application/json',
                    });
                    
                    // Send the message to the server with guest mode flag
                    const response = await fetch('/api/chatbot/chat', {
                        method: 'POST',
                        headers,
                        body: JSON.stringify({
                            message: content,
                            recruiterId: 'guest-' + Date.now(),  // Use a temporary guest ID
                            guestMode: true
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`API request failed: ${response.status}`);
                    }

                    // Parse the response
                    const data = await response.json();
                    
                    // Add the assistant's response to the UI
                    const assistantMessage: Message = {
                        content: data.message,
                        role: 'assistant',
                        timestamp: new Date(),
                        id: 'assistant-guest-' + Date.now(),
                    };
                    
                    setMessages(prevMessages => [...(prevMessages || []), assistantMessage]);
                } catch (error) {
                    console.error("Error in guest mode API request:", error);
                    
                    // Fallback to a static response if the API fails
                    const fallbackMessage: Message = {
                        content: `I'm sorry, I encountered an error processing your message. This is a guest mode session, so messages aren't stored in the database. I'm Dean's AI assistant - I can answer questions about Dean's experience, skills, and availability.`,
                        role: 'assistant',
                        timestamp: new Date(),
                        id: 'assistant-guest-error-' + Date.now(),
                    };
                    
                    setMessages(prevMessages => [...(prevMessages || []), fallbackMessage]);
                }
                
                setIsLoading(false);
                return null;
            }
            
            // For regular mode, send to the API
            try {
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

                logDebug("API response status:", response.status);

                if (!response.ok) {
                    let errorData;
                    try {
                        errorData = await response.json();
                    } catch (e) {
                        errorData = { error: `Failed to parse error response: ${response.status}` };
                    }
                    
                    console.error('Chat API error:', errorData);
                    throw new Error(errorData.error || 'API request failed');
                }

                // Parse the response
                const data = await response.json();
                logDebug("API response data:", data);

                // Update the conversation ID if this is a new conversation
                if (data.conversationId && !conversationId) {
                    setConversationId(data.conversationId);
                }

                // Add the assistant's response to the UI
                const assistantMessage: Message = {
                    content: data.message,
                    role: 'assistant',
                    timestamp: new Date(),
                    id: data.conversationId ? `msg-${Date.now()}` : ('assistant-' + Date.now()),
                };

                logDebug('Adding assistant message from API response:', assistantMessage);
                setMessages(prev => {
                    const newMessages = [...prev, assistantMessage];
                    logDebug('New messages state after API response:', newMessages);
                    return newMessages;
                });

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
            } catch (apiError) {
                console.error("API error:", apiError);
                
                // Add an error message to the UI
                const errorMessage: Message = {
                    content: 'Sorry, there was an error processing your message. Please try again later.',
                    role: 'assistant',
                    timestamp: new Date(),
                    id: 'assistant-error-' + Date.now(),
                };
                
                logDebug('Adding error message to state:', errorMessage);
                setMessages(prev => {
                    const newMessages = [...prev, errorMessage];
                    logDebug('New messages state after error:', newMessages);
                    return newMessages;
                });
                return null;
            }
        } catch (error) {
            console.error('Error in sendMessage:', error);
            
            // Add an error message to the UI
            const systemErrorMessage = {
                content: 'Sorry, there was an error processing your message. Please try again later.',
                role: 'assistant',
                timestamp: new Date(),
                id: 'error-' + Date.now(),
            };
            logDebug('Adding system error message to state:', systemErrorMessage);
            setMessages(prev => {
                const newMessages = [...prev, systemErrorMessage];
                logDebug('New messages state after system error:', newMessages);
                return newMessages;
            });
            
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