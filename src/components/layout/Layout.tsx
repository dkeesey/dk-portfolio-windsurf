import { type PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';
import { ChatbotProvider } from '@/components/chatbot/ChatbotProvider';
import { checkEnvironmentVariables } from '@/lib/env-check';

export function Layout({ children, className }: PropsWithChildren<{ className?: string }>) {
  // Performance monitoring initialization removed due to TypeScript issues

  // Check environment variables
  if (typeof window !== 'undefined') {
    checkEnvironmentVariables();
  }

  return (
    <ChatbotProvider>
      <div className={cn("flex min-h-screen flex-col bg-background text-foreground", className)}>
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </ChatbotProvider>
  );
}
