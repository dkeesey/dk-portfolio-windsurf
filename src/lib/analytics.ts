import { GA_MEASUREMENT_ID } from './gtag';
import type { CLSMetric, FCPMetric, FIDMetric, LCPMetric, TTFBMetric } from 'web-vitals';

type MetricType = CLSMetric | FCPMetric | FIDMetric | LCPMetric | TTFBMetric;

export function reportWebVitals(metric: MetricType) {
  const { id, name, value, rating } = metric;
  
  // Send to Vercel Analytics (automatically handled)
  console.log('Web Vitals:', { id, name, value, rating });
  
  // Send to Google Analytics
  window.gtag('event', name, {
    event_category: 'Web Vitals',
    event_label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    non_interaction: true,
    send_to: GA_MEASUREMENT_ID,
  });
} 