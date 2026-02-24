import type { CLSMetric, FCPMetric, FIDMetric, LCPMetric, TTFBMetric } from 'web-vitals';
import { trackWebVitals as trackGoogleWebVitals } from './gtag';

type MetricType = CLSMetric | FCPMetric | FIDMetric | LCPMetric | TTFBMetric;

export function reportWebVitals(metric: MetricType) {
  trackGoogleWebVitals(metric);

  if (import.meta.env.DEV) {
    const { id, name, value, rating } = metric;
    console.log('Web Vitals:', { id, name, value, rating });
  }
}
