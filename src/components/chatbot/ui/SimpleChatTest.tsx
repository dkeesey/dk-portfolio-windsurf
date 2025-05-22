import * as React from 'react';
import { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Button } from '@/components/ui/button';

interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
}

export function SimpleChatTest() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    console.log('SimpleChatTest rendered with', messages.length, 'messages');

    const handleSendMessage = async (content: string) => {
        console.log('SimpleChatTest - Sending message:', content);
        
        // Add user message
        const userMessage: Message = {
            id: 'user-' + Date.now(),
            content,
            role: 'user',
            timestamp: new Date()
        };
        
        console.log('SimpleChatTest - Adding user message:', userMessage);
        
        // Use a functional update to ensure we have the latest state
        setMessages(currentMessages => [...currentMessages, userMessage]);
        setIsLoading(true);
        
        console.log('SimpleChatTest - Current messages after user message:', 
                   [...messages, userMessage]);
        
        // Use setTimeout to simulate network delay
        setTimeout(() => {
            const assistantMessage: Message = {
                id: 'assistant-' + Date.now(),
                content: `This is a test response to: "${content}". This demonstrates that messages are displayed correctly.`,
                role: 'assistant',
                timestamp: new Date()
            };
            
            console.log('SimpleChatTest - Adding assistant message:', assistantMessage);
            
            // IMPORTANT: Create a completely new array with ALL messages to avoid state issues
            const updatedMessages = [...messages, userMessage, assistantMessage];
            console.log('SimpleChatTest - Setting complete message array:', updatedMessages);
            
            // Force a complete state replacement rather than an update
            setMessages(updatedMessages);
            setIsLoading(false);
        }, 1000);
    };
    
    const clearMessages = () => {
        console.log('Clearing messages');
        setMessages([]);
    };

    return (
        <div className="flex flex-col h-[500px] border rounded-md overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b">
                <h2 className="font-medium">Simple Chat Test</h2>
                <Button variant="outline" size="sm" onClick={clearMessages}>
                    Clear Messages
                </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground p-4">
                        No messages yet. Send a message to test.
                    </div>
                ) : (
                    messages.map((message, index) => (
                        <ChatMessage
                            key={message.id || `msg-${index}`}
                            role={message.role}
                            content={message.content}
                            timestamp={message.timestamp}
                        />
                    ))
                )}
                
                {isLoading && (
                    <ChatMessage
                        role="assistant"
                        content="Thinking..."
                    />
                )}
            </div>
            
            <div className="border-t p-3">
                <ChatInput
                    onSendMessage={handleSendMessage}
                    disabled={isLoading}
                    placeholder="Type a test message..."
                />
            </div>
            
            <div className="text-xs text-muted-foreground p-2 bg-muted">
                Debug Info: {messages.length} messages | Loading: {isLoading ? 'true' : 'false'}
            </div>
        </div>
    );
}