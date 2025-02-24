import { type PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Analytics from '../analytics/Analytics.astro';
import { initializePerformanceMonitoring } from '@/lib/performance';
import { useEffect } from 'react';
import SEO from '../seo/SEO.astro';

interface LayoutProps extends PropsWithChildren {
  seo?: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
    publishDate?: Date;
    author?: string;
  };
}

export function Layout({ children, seo }: LayoutProps) {
  useEffect(() => {
    initializePerformanceMonitoring();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <SEO {...seo} />
      <Header />
      <div className="flex-grow">{children}</div>
      <Footer />
      <Analytics />
    </div>
  );
}
