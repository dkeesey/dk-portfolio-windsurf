/**
 * Sentry Error Tracking Configuration
 *
 * Initialize Sentry for both client and server-side error tracking.
 * Sentry DSN should be set in environment variables.
 *
 * Environment Variables:
 * - SENTRY_DSN: Your Sentry project DSN
 * - PUBLIC_SENTRY_DSN: Client-side DSN (if different)
 */

import * as Sentry from '@sentry/astro';

const SENTRY_DSN = import.meta.env.PUBLIC_SENTRY_DSN || import.meta.env.SENTRY_DSN;

export function initSentry() {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN not configured. Error tracking disabled.');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,

    // Performance Monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in prod, 100% in dev

    // Set sampling rate for profiling
    profilesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,

    // Enable session replay in production
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
    replaysOnErrorSampleRate: 1.0, // Always capture replay on errors

    // Filter out noise
    ignoreErrors: [
      // Network errors
      'Network Error',
      'Failed to fetch',
      'NetworkError',
      // Browser extensions
      /^chrome-extension/,
      /^moz-extension/,
      // Common bot/crawler errors
      'Navigation cancelled',
      // React hydration
      'Hydration failed',
    ],

    // Don't send PII
    beforeSend(event) {
      // Remove any PII from the event
      if (event.user) {
        delete event.user.email;
        delete event.user.ip_address;
      }
      return event;
    },
  });
}

// Export Sentry for manual error capturing
export { Sentry };

// Convenience method for capturing exceptions with context
export function captureException(
  error: Error,
  context?: Record<string, unknown>
) {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setExtras(context);
    }
    Sentry.captureException(error);
  });
}

// Convenience method for capturing messages
export function captureMessage(
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
  context?: Record<string, unknown>
) {
  Sentry.withScope((scope) => {
    if (context) {
      scope.setExtras(context);
    }
    Sentry.captureMessage(message, level);
  });
}

export default Sentry;
// Sentry activated 2026-01-30
