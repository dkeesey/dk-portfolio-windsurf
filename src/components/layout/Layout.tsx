import React, { type PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

export function Layout({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex min-h-screen flex-col bg-background text-foreground", className)}>
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
