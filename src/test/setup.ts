/**
 * Vitest Test Setup
 *
 * This file runs before each test file.
 * It sets up the testing environment with necessary mocks and matchers.
 */

import '@testing-library/jest-dom/vitest';
import { vi, beforeAll, afterEach, afterAll } from 'vitest';

// Mock import.meta.env for Astro
vi.stubGlobal('import.meta.env', {
  PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
  PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  PUBLIC_POSTHOG_API_KEY: 'test-posthog-key',
  PUBLIC_POSTHOG_HOST: 'https://app.posthog.com',
  PUBLIC_GA_TRACKING_ID: 'G-TEST123',
  DEV: true,
  PROD: false,
  MODE: 'test',
});

// Mock window.matchMedia (for responsive tests)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver (for lazy loading)
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(private callback: IntersectionObserverCallback) {}

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

vi.stubGlobal('ResizeObserver', MockResizeObserver);

// Mock fetch (with default implementation that can be overridden)
const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({}),
  text: () => Promise.resolve(''),
});

vi.stubGlobal('fetch', mockFetch);

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
});

// Global test helpers
export const testUtils = {
  /**
   * Wait for a condition to be true
   */
  waitFor: async (condition: () => boolean, timeout = 5000): Promise<void> => {
    const start = Date.now();
    while (!condition() && Date.now() - start < timeout) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    if (!condition()) {
      throw new Error('Condition not met within timeout');
    }
  },

  /**
   * Mock a successful fetch response
   */
  mockFetchSuccess: (data: unknown) => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(JSON.stringify(data)),
    });
  },

  /**
   * Mock a failed fetch response
   */
  mockFetchError: (status = 500, statusText = 'Internal Server Error') => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status,
      statusText,
      json: () => Promise.resolve({ error: statusText }),
      text: () => Promise.resolve(statusText),
    });
  },
};
