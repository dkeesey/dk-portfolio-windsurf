interface Metric {
  id: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

interface NavigationTiming extends PerformanceNavigationTiming {
  requestStart: number;
  responseStart: number;
  secureConnectionStart: number;
  connectEnd: number;
  domainLookupEnd: number;
  domainLookupStart: number;
}

interface ResourceTiming extends PerformanceResourceTiming {
  transferSize: number;
  initiatorType: string;
}

export function measureInteractionTime(elementId: string): Promise<Metric> {
  return new Promise((resolve) => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        resolve({
          id: elementId,
          value: lastEntry.duration,
          rating: lastEntry.duration < 100 ? 'good' : lastEntry.duration < 300 ? 'needs-improvement' : 'poor'
        });
      }
    });

    observer.observe({ entryTypes: ['measure'] });

    // Start measuring when the element becomes visible
    const element = document.getElementById(elementId);
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            performance.mark(`${elementId}-start`);
          } else {
            performance.mark(`${elementId}-end`);
            performance.measure(elementId, `${elementId}-start`, `${elementId}-end`);
          }
        });
      });

      observer.observe(element);
    }
  });
}

export function getNavigationMetrics(): Record<string, number> {
  const navigation = performance.getEntriesByType('navigation')[0] as NavigationTiming;

  if (!navigation) {
    return {};
  }

  return {
    DNS: navigation.domainLookupEnd - navigation.domainLookupStart,
    TLS: navigation.connectEnd - navigation.secureConnectionStart,
    TTFB: navigation.responseStart - navigation.requestStart,
  };
}

export function observeMetrics(callback: (metrics: Metric[]) => void): () => void {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries().map(entry => ({
      id: entry.name,
      value: entry.duration || entry.startTime,
      rating: entry.duration < 100 ? 'good' : entry.duration < 300 ? 'needs-improvement' : 'poor'
    })) as Metric[];
    callback(entries);
  });

  observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });

  return () => observer.disconnect();
}

export function measureResourceTiming() {
  if (window.performance && window.performance.getEntriesByType) {
    const resources = window.performance.getEntriesByType('resource') as ResourceTiming[];
    
    resources.forEach((resource) => {
      const timing = {
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize,
        type: resource.initiatorType
      };

      // Report to analytics
      window.gtag?.('event', 'resource_timing', {
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
        window.gtag?.('event', 'long_task', {
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
      const entries = list.getEntries().map(entry => ({
        id: entry.name,
        value: entry.duration || entry.startTime,
        rating: entry.duration < 100 ? 'good' : entry.duration < 300 ? 'needs-improvement' : 'poor'
      })) as Metric[];
      
      entries.forEach((entry) => {
        console.log(`[Performance] ${entry.id}:`, {
          value: entry.value,
          rating: entry.rating,
        });
      });
    });

    observer.observe({ entryTypes: ['navigation', 'paint', 'layout-shift'] });

    window.addEventListener('load', () => {
      console.log('[Performance] Navigation Timing:', getNavigationMetrics());
    });
  } catch (error) {
    console.error('[Performance] Error initializing performance tracking:', error);
  }
} 