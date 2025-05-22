import posthog from 'posthog-js';

// PostHog API key from environment variables
export const POSTHOG_API_KEY = import.meta.env.PUBLIC_POSTHOG_API_KEY || '';
export const POSTHOG_HOST = import.meta.env.PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

// Track initialization state
let isPostHogInitialized = false;

// Initialize PostHog (only in browser, not during SSR)
export function initPostHog() {
  if (typeof window !== 'undefined' && POSTHOG_API_KEY) {
    posthog.init(POSTHOG_API_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // We'll handle pageviews manually
      loaded: (posthog) => {
        isPostHogInitialized = true;
        if (import.meta.env.DEV) {
          // Disable capturing in development
          posthog.opt_out_capturing();
        }
      },
    });
  }
}

// Safe check for PostHog initialization
const isInitialized = () => {
  if (typeof window === 'undefined') return false;
  
  // Check both our manual flag and any properties PostHog might set
  return isPostHogInitialized || 
    (typeof (posthog as any).initialized !== 'undefined' && (posthog as any).initialized);
};

// Track pageview
export function trackPageview(url: string) {
  if (typeof window !== 'undefined' && isInitialized()) {
    posthog.capture('$pageview', {
      current_url: url,
    });
  }
}

// Custom event tracking
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && isInitialized()) {
    posthog.capture(eventName, properties);
  }
}

// Web vitals tracking
export function trackWebVitals(metric: any) {
  if (typeof window !== 'undefined' && isInitialized()) {
    const { name, value, id } = metric;
    
    trackEvent('web_vitals', {
      metric_name: name,
      metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_id: id,
    });
  }
}

// Identify user (if needed for authenticated areas)
export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (typeof window !== 'undefined' && isInitialized()) {
    posthog.identify(userId, traits);
  }
}
