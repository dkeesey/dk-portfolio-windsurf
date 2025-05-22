export interface Message {
    id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: Date;
}

export interface Conversation {
    id: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
    recruiterId?: string;
}

export interface ChatState {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    conversationId: string | null;
}

export interface AuthState {
    user: any | null;
    session: any | null;
    isLoading: boolean;
    error: string | null;
}

export interface ChatbotContextType {
    auth: AuthState;
    chat: ChatState;
    sendMessage: (content: string) => Promise<void>;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

export interface ChatWidgetProps {
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

export interface ChatMessageProps {
    message: Message;
}

export interface ChatInputProps {
    onSendMessage: (content: string) => void;
    disabled?: boolean;
}

export interface ChatContainerProps {
    messages: Message[];
    isLoading: boolean;
}

export interface ChatbotProviderProps {
    children: React.ReactNode;
} 