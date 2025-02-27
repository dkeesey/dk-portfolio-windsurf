// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = import.meta.env.PUBLIC_GA_TRACKING_ID || '';

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

// Pageview tracking
export const pageview = (url: string): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Event tracking
export const event = ({ action, category, label, value }: GTagEvent): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Web vitals tracking for GA4
export const trackWebVitals = (metric: any): void => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    const { name, value, id } = metric;
    
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
      send_to: GA_MEASUREMENT_ID
    });
  }
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      params?: {
        page_path?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        [key: string]: string | number | boolean | null | undefined;
      }
    ) => void;
  }
}
