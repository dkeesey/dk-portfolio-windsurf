type Metric = {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
};

type NavigationEntry = {
  activationStart: number;
  domComplete: number;
  domContentLoadedEventEnd: number;
  domContentLoadedEventStart: number;
  domInteractive: number;
  loadEventEnd: number;
  loadEventStart: number;
  redirectCount: number;
  startTime: number;
  type: string;
  unloadEventEnd: number;
  unloadEventStart: number;
};

export function measureInteractionTime(elementId: string): Promise<PerformanceMetric> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const endTime = performance.now();
          const duration = endTime - startTime;
          
          observer.disconnect();
          resolve({
            name: `interaction-${elementId}`,
            value: duration,
            rating: duration < 100 ? 'good' : duration < 300 ? 'needs-improvement' : 'poor'
          });
        }
      });
    });

    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element);
    }
  });
}

export function measureResourceTiming() {
  if (window.performance && window.performance.getEntriesByType) {
    const resources = window.performance.getEntriesByType('resource');
    
    resources.forEach((resource) => {
      const timing = {
        name: resource.name,
        duration: resource.duration,
        size: (resource as any).transferSize || 0,
        type: (resource as any).initiatorType
      };

      // Report to analytics
      window.gtag('event', 'resource_timing', {
        event_category: 'Performance',
        event_label: timing.name,
        value: timing.duration,
        metric_id: 'resource_timing',
        non_interaction: true
      });
    });
  }
}

export function initializePerformanceMonitoring() {
  // Monitor route changes
  document.addEventListener('astro:page-load', () => {
    measureResourceTiming();
  });

  // Monitor long tasks
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        window.gtag('event', 'long_task', {
          event_category: 'Performance',
          event_label: 'Long Task Duration',
          value: entry.duration,
          metric_id: 'long_task',
          non_interaction: true
        });
      });
    });

    observer.observe({ entryTypes: ['longtask'] });
  }
}

export function initPerformanceTracking(): void {
  if (typeof window === 'undefined') return;

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as Metric[];
      entries.forEach((entry) => {
        console.log(`[Performance] ${entry.name}:`, {
          value: entry.value,
          rating: entry.rating,
          delta: entry.delta,
        });
      });
    });

    observer.observe({ entryTypes: ['navigation', 'paint', 'layout-shift'] });

    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as NavigationEntry;
      console.log('[Performance] Navigation Timing:', {
        DNS: navigation.domainLookupEnd - navigation.domainLookupStart,
        TLS: navigation.connectEnd - navigation.secureConnectionStart,
        TTFB: navigation.responseStart - navigation.requestStart,
        DomLoad: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        WindowLoad: navigation.loadEventEnd - navigation.loadEventStart,
      });
    });
  } catch (error) {
    console.error('[Performance] Error initializing performance tracking:', error);
  }
} 