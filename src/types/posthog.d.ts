// Type declarations for PostHog
declare module 'posthog-js' {
  interface PostHog {
    init: (
      apiKey: string,
      options?: {
        api_host?: string;
        capture_pageview?: boolean;
        loaded?: (posthog: PostHog) => void;
        [key: string]: any;
      }
    ) => void;
    capture: (
      eventName: string,
      properties?: Record<string, any>,
      options?: any
    ) => void;
    identify: (
      distinctId: string,
      userProperties?: Record<string, any>,
      options?: any
    ) => void;
    opt_out_capturing: () => void;
    opt_in_capturing: () => void;
    reset: () => void;
    // Add other methods as needed
  }

  const posthog: PostHog;
  export default posthog;
}
