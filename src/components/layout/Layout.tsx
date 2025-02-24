import { type PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Analytics from '../analytics/Analytics.astro';
import { initializePerformanceMonitoring } from '@/lib/performance';
import { useEffect } from 'react';

export function Layout({ children }: PropsWithChildren) {
  useEffect(() => {
    initializePerformanceMonitoring();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
      <Analytics />
    </div>
  );
}
