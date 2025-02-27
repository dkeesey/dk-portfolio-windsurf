import type { CLSMetric, FCPMetric, FIDMetric, LCPMetric, TTFBMetric } from 'web-vitals';
import { trackWebVitals as trackPostHogWebVitals } from './posthog';
import { trackWebVitals as trackGoogleWebVitals } from './gtag';

type MetricType = CLSMetric | FCPMetric | FIDMetric | LCPMetric | TTFBMetric;

export function reportWebVitals(metric: MetricType) {
  // Track with PostHog
  trackPostHogWebVitals(metric);
  
  // Track with Google Analytics
  trackGoogleWebVitals(metric);
  
  // Log in development for debugging
  if (import.meta.env.DEV) {
    const { id, name, value, rating } = metric;
    console.log('Web Vitals:', { id, name, value, rating });
  }
}