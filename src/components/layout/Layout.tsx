import { type PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Analytics from '../analytics/Analytics.astro';
import { initializePerformanceMonitoring } from '@/lib/performance';
import { useEffect } from 'react';

export interface SEOProps {
title: string;
description: string;
}

interface LayoutProps extends PropsWithChildren {
seo: SEOProps;
}
export function Layout({ children, seo }: LayoutProps) {
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
