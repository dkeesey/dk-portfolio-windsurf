import { useCallback } from 'react';
import { trackEvent as trackPostHogEvent } from '@/lib/posthog';
import { event as trackGoogleEvent } from '@/lib/gtag';

export function useAnalytics() {
  // Track custom events in both PostHog and Google Analytics
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    // Track in PostHog
    trackPostHogEvent(eventName, properties);
    
    // Track in Google Analytics
    // Convert properties to GA format
    const gaProperties = properties || {};
    trackGoogleEvent({
      action: eventName,
      category: gaProperties.category || 'Interaction',
      label: gaProperties.label || gaProperties.element || '',
      value: gaProperties.value
    });
  }, []);

  // Convenience methods for common events
  const trackClick = useCallback((elementName: string, properties?: Record<string, any>) => {
    track('click', { element: elementName, ...properties });
  }, [track]);

  const trackFormSubmit = useCallback((formName: string, properties?: Record<string, any>) => {
    track('form_submit', { form: formName, ...properties });
  }, [track]);

  const trackProjectView = useCallback((projectName: string, properties?: Record<string, any>) => {
    track('project_view', { 
      project: projectName, 
      label: projectName, // For GA compatibility
      category: 'Projects', // For GA compatibility
      ...properties 
    });
  }, [track]);

  return {
    track,
    trackClick,
    trackFormSubmit, 
    trackProjectView
  };
}
