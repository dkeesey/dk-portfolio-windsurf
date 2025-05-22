import * as React from 'react';
import { MessageCircleIcon, XIcon, LogOutIcon, AlertCircleIcon } from 'lucide-react';
import { ChatContainer } from './ChatContainer';
import type { Message } from './ChatContainer';
import { cn } from '@/lib/utils';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CustomDialogContent } from './CustomDialogContent';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChatHistory } from './ChatHistory';
import { SimpleChatTest } from './SimpleChatTest';

export interface ChatWidgetProps {
    className?: string;
    position?: 'bottom-right' | 'bottom-left';
    buttonLabel?: string;
    welcomeMessage?: string;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    testMode?: boolean; // Add test mode option
    debugMode?: boolean; // Add debug mode option
}

export function ChatWidget({
    className,
    position = 'bottom-right',
    buttonLabel = "Chat with Dean's AI Assistant",
    welcomeMessage,
    isOpen,
    onOpenChange,
    testMode = false,
    debugMode = process.env.NODE_ENV === 'development' // Enable debug mode in development by default
}: ChatWidgetProps) {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const {
        messages,
        sendMessage,
        isLoading,
        conversationId,
        metadata,
        hasMoreMessages,
        loadMoreMessages,
        startNewConversation
    } = useChat();
    const auth = useAuth();
    const { isAuthenticated, signIn, signOut, recruiter, error, clearError, guestMode } = auth;

    const positionClasses = {
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
    };

    // Use either controlled or uncontrolled state
    const open = isOpen !== undefined ? isOpen : internalOpen;
    const setOpen = onOpenChange || setInternalOpen;

    const handleSendMessage = async (content: string) => {
        await sendMessage(content);
    };

    const handleSignIn = async (provider: 'github' | 'linkedin') => {
        await signIn(provider);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    const handleNewConversation = () => {
        startNewConversation();
    };

    const handleLoadMoreMessages = () => {
        loadMoreMessages();
    };

    // Clear error when dialog is closed
    React.useEffect(() => {
        if (!open && error) {
            clearError();
        }
    }, [open, error, clearError]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className={cn(
                        'fixed z-50 flex items-center gap-2 shadow-lg',
                        positionClasses[position],
                        className
                    )}
                >
                    <MessageCircleIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">{buttonLabel}</span>
                </Button>
            </DialogTrigger>
            <CustomDialogContent 
                className="sm:max-w-[425px] h-[600px] p-0 flex flex-col"
                title="Chat with Dean's AI Assistant"
                description="Chat interface to interact with Dean's AI assistant"
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <div>
                        <h2 className="text-lg font-semibold">Chat with Dean's AI Assistant</h2>
                        {guestMode && (
                            <p className="text-xs text-amber-600 mt-1">Guest Mode (Testing Only)</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {isAuthenticated && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleSignOut}
                                className="h-8 w-8 p-0"
                                title="Sign out"
                            >
                                <LogOutIcon className="h-4 w-4" />
                                <span className="sr-only">Sign out</span>
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setOpen(false)}
                            className="h-8 w-8 p-0"
                        >
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </Button>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive" className="m-4">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                )}

                {testMode ? (
                    /* Test mode simplified interface for debugging */
                    <div className="flex-1 flex flex-col">
                        <div className="px-4 py-2 bg-amber-100 border-b text-xs">
                            <strong>Test Mode Enabled</strong> - Using simplified chat implementation for debugging
                        </div>
                        <div className="flex-1 p-4">
                            <SimpleChatTest />
                        </div>
                    </div>
                ) : !isAuthenticated ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                        <h3 className="text-lg font-medium mb-2">Sign in to chat</h3>
                        <p className="text-muted-foreground mb-6">
                            Please sign in with your GitHub or LinkedIn account to chat with Dean's AI assistant.
                        </p>
                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <Button onClick={() => handleSignIn('github')} className="w-full">
                                Sign in with GitHub
                            </Button>
                            <Button onClick={() => handleSignIn('linkedin')} className="w-full">
                                Sign in with LinkedIn
                            </Button>
                            
                            {/* For Development Only - Guest Mode */}
                            <div className="mt-4 pt-4 border-t border-gray-200 w-full">
                                <p className="text-xs text-gray-500 mb-2">Development Testing Only</p>
                                <Button 
                                    onClick={() => auth.enableGuestMode()} 
                                    variant="outline" 
                                    className="w-full"
                                >
                                    Continue as Guest
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {isAuthenticated && metadata && (
                            <ChatHistory
                                metadata={metadata}
                                onNewConversation={handleNewConversation}
                                onLoadMoreMessages={handleLoadMoreMessages}
                                hasMoreMessages={hasMoreMessages}
                                isLoading={isLoading}
                            />
                        )}
                        
                        {/* Debug info - can be removed in production */}
                        <div className="px-4 py-1 text-xs text-gray-500" style={{display: 'none'}}>
                            Debug: {messages ? messages.length : 'null'} messages | Guest mode: {guestMode ? 'true' : 'false'}
                        </div>
                        
                        <ChatContainer
                            messages={messages || []}
                            onSendMessage={handleSendMessage}
                            isLoading={isLoading}
                            className="flex-1"
                            welcomeMessage={welcomeMessage}
                            hasMoreMessages={hasMoreMessages}
                            onLoadMoreMessages={handleLoadMoreMessages}
                            debugMode={debugMode}
                        />
                        
                        {/* Debug overlay for message count - visible in dev mode */}
                        {process.env.NODE_ENV === 'development' && (
                            <div className="fixed top-2 right-2 bg-amber-100 text-xs p-1 rounded border border-amber-300">
                                Messages: {messages?.length || 0}
                            </div>
                        )}
                    </>
                )}
            </CustomDialogContent>
        </Dialog>
    );
} 