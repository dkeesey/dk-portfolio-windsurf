import * as React from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { DebugChatInput } from './DebugChatInput';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { logDebug } from '@/lib/chatDebugger';

export interface Message {
    id?: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp?: Date;
}

export interface ChatContainerProps {
    messages: Message[];
    onSendMessage: (message: string) => void;
    isLoading?: boolean;
    className?: string;
    welcomeMessage?: string;
    hasMoreMessages?: boolean;
    onLoadMoreMessages?: () => void;
    debugMode?: boolean; // Add a debug mode flag
}

export function ChatContainer({
    messages = [], // Provide a default empty array
    onSendMessage,
    isLoading = false,
    className,
    welcomeMessage = "Hi there! I'm Dean's AI assistant. I can help answer questions about Dean's experience, skills, and availability. How can I help you today?",
    hasMoreMessages = false,
    onLoadMoreMessages,
    debugMode = false // Default to false
}: ChatContainerProps) {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    // Debug props passed to ChatContainer
    React.useEffect(() => {
        logDebug('ChatContainer received messages:', messages);
    }, [messages]);
    
    // Scroll to bottom when messages change
    React.useEffect(() => {
        logDebug('Scrolling to bottom, message count:', messages.length);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className={cn('flex flex-col h-full', className)}>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {hasMoreMessages && onLoadMoreMessages && (
                    <div className="flex justify-center mb-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onLoadMoreMessages}
                            disabled={isLoading}
                            className="w-full max-w-xs"
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                'Load More Messages'
                            )}
                        </Button>
                    </div>
                )}

                {messages.length === 0 && welcomeMessage && (
                    <ChatMessage
                        role="assistant"
                        content={welcomeMessage}
                        timestamp={new Date()}
                    />
                )}

                {messages && messages.length > 0 ? (
                    messages.map((message, index) => {
                        logDebug(`Rendering message ${index}:`, message);
                        return (
                            <ChatMessage
                                key={message.id || `msg-${index}`}
                                role={message.role}
                                content={message.content}
                                timestamp={message.timestamp}
                            />
                        );
                    })
                ) : (
                    // This will help debug empty message arrays
                    <div className="text-center text-muted-foreground text-sm p-2" style={{display: 'none'}}>
                        No messages yet (Debug info - messages array length: {messages ? messages.length : 'null'})
                    </div>
                )}

                {isLoading && (
                    <ChatMessage
                        role="assistant"
                        content="Thinking..."
                    />
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
                {debugMode ? (
                    <DebugChatInput
                        onSendMessage={onSendMessage}
                        disabled={isLoading}
                        placeholder="Type your message..."
                        messageCount={messages.length}
                    />
                ) : (
                    <ChatInput
                        onSendMessage={onSendMessage}
                        disabled={isLoading}
                        placeholder="Type your message..."
                    />
                )}
            </div>
        </div>
    );
} 