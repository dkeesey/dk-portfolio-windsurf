import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChatWidget } from './ChatWidget';

/**
 * Debug component for chat functionality testing.
 * This can be imported and used anywhere in the app for testing purposes.
 */
export function ChatDebug() {
    const [isTestMode, setIsTestMode] = useState(false);
    const [isWidgetOpen, setIsWidgetOpen] = useState(false);
    const [lastMessage, setLastMessage] = useState<string | null>(null);
    
    // Load/save test mode preference to localStorage
    useEffect(() => {
        try {
            const savedTestMode = localStorage.getItem('chat-debug-test-mode');
            if (savedTestMode) {
                setIsTestMode(savedTestMode === 'true');
            }
        } catch (e) {
            console.warn('Failed to load chat debug preferences:', e);
        }
    }, []);
    
    const toggleTestMode = () => {
        const newValue = !isTestMode;
        setIsTestMode(newValue);
        try {
            localStorage.setItem('chat-debug-test-mode', String(newValue));
        } catch (e) {
            console.warn('Failed to save chat debug preferences:', e);
        }
    };
    
    // This listener captures messages between the chat components
    useEffect(() => {
        const handler = (event: MessageEvent) => {
            if (event.data && event.data.type === 'CHAT_MESSAGE') {
                console.log('ChatDebug intercepted message:', event.data);
                setLastMessage(JSON.stringify(event.data, null, 2));
            }
        };
        
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);
    
    return (
        <div className="fixed bottom-4 left-4 z-40">
            <div className="flex flex-col gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsWidgetOpen(true)}
                    className="bg-white/90 border-gray-300"
                >
                    Open Chat
                </Button>
                <Button 
                    size="sm"
                    variant={isTestMode ? "destructive" : "outline"}
                    onClick={toggleTestMode}
                    className={isTestMode ? "" : "bg-white/90 border-gray-300"}
                >
                    {isTestMode ? "Disable Test Mode" : "Enable Test Mode"}
                </Button>
            </div>
            
            {/* Very small log of the last captured message */}
            {lastMessage && (
                <div className="mt-2 p-2 bg-white/90 border border-gray-300 rounded text-xs max-w-[300px] max-h-[80px] overflow-auto">
                    <div className="font-semibold">Last Message:</div>
                    <pre className="text-[10px] overflow-x-auto">{lastMessage}</pre>
                </div>
            )}
            
            <ChatWidget 
                isOpen={isWidgetOpen} 
                onOpenChange={setIsWidgetOpen} 
                testMode={isTestMode}
                position="bottom-left"
            />
        </div>
    );
}