import * as React from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';

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
}

export function ChatContainer({
    messages,
    onSendMessage,
    isLoading = false,
    className,
    welcomeMessage = "Hi there! I'm Dean's AI assistant. I can help answer questions about Dean's experience, skills, and availability. How can I help you today?",
    hasMoreMessages = false,
    onLoadMoreMessages
}: ChatContainerProps) {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    React.useEffect(() => {
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

                {messages.map((message, index) => (
                    <ChatMessage
                        key={message.id || index}
                        role={message.role}
                        content={message.content}
                        timestamp={message.timestamp}
                    />
                ))}

                {isLoading && (
                    <ChatMessage
                        role="assistant"
                        content="Thinking..."
                    />
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
                <ChatInput
                    onSendMessage={onSendMessage}
                    disabled={isLoading}
                    placeholder="Type your message..."
                />
            </div>
        </div>
    );
} 