import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, InfoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

export interface DebugChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
    messageCount?: number;
    guestMode?: boolean;
}

/**
 * A special debug version of ChatInput with added debug information
 */
export function DebugChatInput({ 
    onSendMessage, 
    disabled = false, 
    placeholder = 'Type your message...', 
    messageCount = 0,
    guestMode = false 
}: DebugChatInputProps) {
    // Log that the component is being rendered
    console.log('DebugChatInput component rendering');
    
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [lastSent, setLastSent] = useState<string | null>(null);
    const [sentCount, setSentCount] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (message.trim() && !disabled) {
            setLastSent(message.trim());
            setSentCount(prev => prev + 1);
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
        <div className="space-y-2">
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
            
            {/* Debug information */}
            <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-1 cursor-help">
                                    <InfoIcon className="h-3 w-3" /> 
                                    Debug Info
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <div className="space-y-1 text-xs">
                                    <p>Last sent: {lastSent || 'None'}</p>
                                    <p>Messages sent: {sentCount}</p>
                                    <p>Current message count: {messageCount}</p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className="text-xs">
                    {disabled ? 'Loading...' : ''}
                    {guestMode && <span className="text-amber-500 ml-1">Guest Mode</span>}
                </div>
            </div>
        </div>
    );
}