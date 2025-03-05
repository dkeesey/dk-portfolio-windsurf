import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export function ChatInput({ onSendMessage, disabled = false, placeholder = 'Type your message...' }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }, [message]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="relative flex items-center">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
                        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
                        'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                        'resize-none min-h-[40px] max-h-[150px] pr-10'
                    )}
                    rows={1}
                />
                <button
                    type="submit"
                    disabled={disabled || !message.trim()}
                    className={cn(
                        'absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full',
                        'text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20',
                        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent'
                    )}
                    aria-label="Send message"
                >
                    <SendIcon className="h-5 w-5" />
                </button>
            </div>
        </form>
    );
} 