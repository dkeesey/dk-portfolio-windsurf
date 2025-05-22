// Browser-compatible version of gtag.ts

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = window.env?.PUBLIC_GA_TRACKING_ID || '';

// Pageview tracking
export const pageview = (url) => {
    try {
        if (window.gtag && GA_MEASUREMENT_ID) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: url,
            });
        }
    } catch (error) {
        console.error('Failed to track pageview:', error);
    }
};

// Event tracking
export const event = ({ action, category, label, value }) => {
    try {
        if (window.gtag && GA_MEASUREMENT_ID) {
            window.gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value,
            });
        }
    } catch (error) {
        console.error('Failed to track event:', error);
    }
};

// Web vitals tracking for GA4
export const trackWebVitals = (metric) => {
    try {
        if (window.gtag && GA_MEASUREMENT_ID) {
            const { name, value, id } = metric;

            window.gtag('event', name, {
                event_category: 'Web Vitals',
                event_label: id,
                value: Math.round(name === 'CLS' ? value * 1000 : value),
                non_interaction: true,
                send_to: GA_MEASUREMENT_ID
            });
        }
    } catch (error) {
        console.error('Failed to track web vitals:', error);
    }
}; 