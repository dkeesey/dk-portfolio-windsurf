// Browser-compatible version of posthog.ts
import posthog from 'https://cdn.jsdelivr.net/npm/posthog-js@1.93.6/+esm';

// PostHog API key from environment variables (will be replaced during build)
const POSTHOG_API_KEY = window.env?.PUBLIC_POSTHOG_API_KEY || '';
const POSTHOG_HOST = window.env?.PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

// Track initialization state
let isPostHogInitialized = false;

// Initialize PostHog (only in browser)
export function initPostHog() {
    // Only initialize if we have an API key
    if (POSTHOG_API_KEY && POSTHOG_API_KEY !== '__PUBLIC_POSTHOG_API_KEY__') {
        try {
            posthog.init(POSTHOG_API_KEY, {
                api_host: POSTHOG_HOST,
                capture_pageview: false, // We'll handle pageviews manually
                loaded: (posthog) => {
                    isPostHogInitialized = true;
                    if (window.env?.DEV) {
                        // Disable capturing in development
                        posthog.opt_out_capturing();
                    }
                },
            });
            console.log('PostHog initialized successfully');
        } catch (error) {
            console.error('Failed to initialize PostHog:', error);
        }
    } else {
        console.log('PostHog not initialized: No API key provided');
    }
}

// Safe check for PostHog initialization
const isInitialized = () => {
    // Check both our manual flag and any properties PostHog might set
    return isPostHogInitialized ||
        (typeof posthog.initialized !== 'undefined' && posthog.initialized);
};

// Track pageview
export function trackPageview(url) {
    if (isInitialized()) {
        try {
            posthog.capture('$pageview', {
                current_url: url,
            });
        } catch (error) {
            console.error('Failed to track pageview:', error);
        }
    }
}

// Custom event tracking
export function trackEvent(eventName, properties) {
    if (isInitialized()) {
        try {
            posthog.capture(eventName, properties);
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    }
}

// Web vitals tracking
export function trackWebVitals(metric) {
    if (isInitialized()) {
        try {
            const { name, value, id } = metric;

            trackEvent('web_vitals', {
                metric_name: name,
                metric_value: Math.round(name === 'CLS' ? value * 1000 : value),
                metric_id: id,
            });
        } catch (error) {
            console.error('Failed to track web vitals:', error);
        }
    }
}

// Identify user (if needed for authenticated areas)
export function identifyUser(userId, traits) {
    if (isInitialized()) {
        try {
            posthog.identify(userId, traits);
        } catch (error) {
            console.error('Failed to identify user:', error);
        }
    }
} 