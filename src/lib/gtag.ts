// Google Analytics Measurement ID
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 ID

type GTagEvent = {
  action: string;
  category: string;
  label: string;
  value?: number;
};

export const GA_TRACKING_ID = import.meta.env.PUBLIC_GA_TRACKING_ID;

export const pageview = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: GTagEvent): void => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
} 