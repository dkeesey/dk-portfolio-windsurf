import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { ChatWidget } from './ui/ChatWidget';

interface ChatbotContextType {
    openChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export function useChatbot() {
    const context = useContext(ChatbotContext);
    if (context === undefined) {
        throw new Error('useChatbot must be used within a ChatbotProvider');
    }
    return context;
}

interface ChatbotProviderProps {
    children: ReactNode;
    position?: 'bottom-right' | 'bottom-left';
    buttonLabel?: string;
    welcomeMessage?: string;
}

export function ChatbotProvider({
    children,
    position = 'bottom-right',
    buttonLabel = "Chat with Dean's AI Assistant",
    welcomeMessage,
}: ChatbotProviderProps) {
    // State to control the chat widget
    const [isOpen, setIsOpen] = React.useState(false);

    const openChat = () => {
        setIsOpen(true);
    };

    const contextValue: ChatbotContextType = {
        openChat,
    };

    return (
        <ChatbotContext.Provider value={contextValue}>
            {children}
            <ChatWidget
                position={position}
                buttonLabel={buttonLabel}
                welcomeMessage={welcomeMessage}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </ChatbotContext.Provider>
    );
} 