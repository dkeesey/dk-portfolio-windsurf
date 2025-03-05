import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HistoryIcon, RefreshCwIcon } from 'lucide-react';

export interface ConversationMetadata {
    id: string;
    title: string;
    lastMessageAt: Date;
    messageCount: number;
    tokenCount: number;
}

export interface ChatHistoryProps {
    metadata: ConversationMetadata | null;
    onNewConversation: () => void;
    onLoadMoreMessages: () => void;
    hasMoreMessages: boolean;
    isLoading: boolean;
    className?: string;
}

export function ChatHistory({
    metadata,
    onNewConversation,
    onLoadMoreMessages,
    hasMoreMessages,
    isLoading,
    className
}: ChatHistoryProps) {
    if (!metadata) {
        return null;
    }

    return (
        <div className={cn('p-3 border-b text-sm', className)}>
            <div className="flex items-center justify-between mb-1">
                <div className="font-medium truncate flex-1" title={metadata.title}>
                    {metadata.title}
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNewConversation}
                    className="h-7 px-2"
                >
                    <HistoryIcon className="h-3.5 w-3.5 mr-1" />
                    New Chat
                </Button>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>
                    {metadata.messageCount} messages · {metadata.tokenCount} tokens
                </div>
                <div>
                    Last updated: {metadata.lastMessageAt.toLocaleDateString()} {metadata.lastMessageAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>

            {hasMoreMessages && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onLoadMoreMessages}
                    disabled={isLoading}
                    className="w-full mt-2 h-7"
                >
                    {isLoading ? (
                        <>
                            <RefreshCwIcon className="h-3.5 w-3.5 mr-1 animate-spin" />
                            Loading...
                        </>
                    ) : (
                        'Load More Messages'
                    )}
                </Button>
            )}
        </div>
    );
} 