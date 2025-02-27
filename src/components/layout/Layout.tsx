import { type PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { initializePerformanceMonitoring } from '@/lib/performance';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Layout({ children, className }: PropsWithChildren<{ className?: string }>) {
  useEffect(() => {
    initializePerformanceMonitoring();
  }, []);

  return (
    <div className={cn("flex min-h-screen flex-col bg-background text-foreground", className)}>
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}
