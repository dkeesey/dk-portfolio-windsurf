/**
 * Vitest Test Setup
 *
 * This file runs before each test file.
 * It sets up the testing environment with necessary mocks and matchers.
 */

import '@testing-library/jest-dom/vitest';
import { vi, beforeAll, afterEach, afterAll } from 'vitest';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { setupFileReadingHook } from './file-reading-hook';

// Mock import.meta.env for Astro
// Set up proper import.meta.url support and file reading
setupFileReadingHook();

if (!(globalThis as any).import) {
  (globalThis as any).import = {};
}

(globalThis as any).import.meta = {
  url: `file://${process.cwd()}/src/test/setup.ts`,
  env: {
    PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
    PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
    PUBLIC_GA_TRACKING_ID: 'G-TEST123',
    DEV: true,
    PROD: false,
    MODE: 'test',
  },
};

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

// Handle fs.readFileSync to support URL objects in tests
// This needs to catch the error that occurs when import.meta.url is undefined
const originalReadFileSync = fs.readFileSync.bind(fs);

// Replace the function on the module
(fs as any).readFileSync = function(filePath: any, encoding?: any, flag?: any) {
  let finalPath = filePath;

  try {
    // Handle URL objects - convert to pathname string
    if (filePath instanceof URL) {
      const pathname = filePath.pathname;
      // URL relative paths like /pages/index.mdx need src/ prepended
      if (!pathname.includes('/src/') && (pathname.includes('/pages/') || pathname.includes('/components/'))) {
        finalPath = path.join(process.cwd(), 'src', pathname);
      } else {
        finalPath = path.join(process.cwd(), pathname);
      }
    } else if (typeof filePath === 'string' && filePath.startsWith('file://')) {
      // Handle file:// URLs
      const pathname = new URL(filePath).pathname;
      if (!pathname.includes('/src/')) {
        finalPath = path.join(process.cwd(), 'src', pathname);
      } else {
        finalPath = path.join(process.cwd(), pathname);
      }
    }
  } catch (e) {
    // If URL handling fails, the URL is likely invalid/malformed
    // Fall through to the original call which will throw with better error
  }

  // Call original with resolved path
  return originalReadFileSync(finalPath, encoding, flag);
};

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
