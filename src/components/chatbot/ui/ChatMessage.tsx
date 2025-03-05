import React from 'react';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
    content: string;
    role: 'user' | 'assistant';
    timestamp?: Date;
}

export function ChatMessage({ content, role, timestamp }: ChatMessageProps) {
    const isUser = role === 'user';

    return (
        <div
            className={cn(
                'flex w-full mb-4',
                isUser ? 'justify-end' : 'justify-start'
            )}
        >
            <div
                className={cn(
                    'rounded-lg px-4 py-2 max-w-[80%]',
                    isUser ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
            >
                <div className="prose dark:prose-invert">
                    {content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </div>
                {timestamp && (
                    <div className={cn(
                        'text-xs mt-1',
                        isUser ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                    )}>
                        {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                )}
            </div>
        </div>
    );
} 