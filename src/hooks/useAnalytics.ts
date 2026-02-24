import { useCallback } from 'react';
import { event as trackGoogleEvent } from '@/lib/gtag';

export function useAnalytics() {
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    const gaProperties = properties || {};
    trackGoogleEvent({
      action: eventName,
      category: gaProperties.category || 'Interaction',
      label: gaProperties.label || gaProperties.element || '',
      value: gaProperties.value
    });
  }, []);

  const trackClick = useCallback((elementName: string, properties?: Record<string, any>) => {
    track('click', { element: elementName, ...properties });
  }, [track]);

  const trackFormSubmit = useCallback((formName: string, properties?: Record<string, any>) => {
    track('form_submit', { form: formName, ...properties });
  }, [track]);

  const trackProjectView = useCallback((projectName: string, properties?: Record<string, any>) => {
    track('project_view', {
      project: projectName,
      label: projectName,
      category: 'Projects',
      ...properties
    });
  }, [track]);

  return { track, trackClick, trackFormSubmit, trackProjectView };
}
