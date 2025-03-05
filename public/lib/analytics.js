// Browser-compatible version of analytics.ts
import { trackWebVitals as trackPostHogWebVitals } from '/lib/posthog.js';
import { trackWebVitals as trackGoogleWebVitals } from '/lib/gtag.js';

export function reportWebVitals(metric) {
    try {
        // Track with PostHog
        trackPostHogWebVitals(metric);

        // Track with Google Analytics
        trackGoogleWebVitals(metric);

        // Log in development for debugging
        if (window.env?.DEV) {
            const { id, name, value, rating } = metric;
            console.log('Web Vitals:', { id, name, value, rating });
        }
    } catch (error) {
        console.error('Failed to report web vitals:', error);
    }
} 