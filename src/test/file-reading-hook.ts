/**
 * Hook to handle file reading in tests that use import.meta.url
 *
 * Since vitest's jsdom environment doesn't properly support import.meta.url
 * with relative path resolution, we need to patch both URL and import.meta.
 */

import path from 'path';

export function setupFileReadingHook() {
  // Store the original URL
  const OriginalURL = globalThis.URL;

  // Create a wrapper function that acts like the URL constructor
  const PatchedURLConstructor = function (input: string, base?: string | URL | any) {
    // If base is a Location object (starts with http/https but input is a file path), replace it
    if (base && typeof base === 'object') {
      const baseStr = base.toString?.() || base.href || '';
      // If base is an http URL and input is a relative file path, replace with file URL
      if ((baseStr.startsWith('http://') || baseStr.startsWith('https://')) &&
          typeof input === 'string' && (input.startsWith('../') || input.startsWith('/'))) {
        // Base is a web URL but we need a file path, resolve from test directory
        const testFileDir = `${process.cwd()}/src/components/sections/__tests__`;
        const resolved = path.resolve(testFileDir, input);
        // Ensure the path includes src/ if needed
        let finalPath = resolved;
        if (!resolved.includes('/src/') && (resolved.includes('/pages/') || resolved.includes('/components/'))) {
          finalPath = path.join(process.cwd(), 'src', resolved.split('/src/').pop() || resolved);
        }
        const fileUrl = `file://${finalPath}`;
        return new OriginalURL(fileUrl);
      }
    }
    // If base is missing/undefined and input is relative, use a test file directory as base
    if (!base && typeof input === 'string' && (input.startsWith('../') || input.startsWith('./') || input.startsWith('../../../../'))) {
      // Resolve from test directory
      const testFileDir = `${process.cwd()}/src/components/sections/__tests__`;
      const resolved = path.resolve(testFileDir, input);
      const fileUrl = `file://${resolved}`;
      return new OriginalURL(fileUrl);
    }

    try {
      // Try normal URL construction
      return new OriginalURL(input, base);
    } catch (e: any) {
      // If base is undefined or invalid and we have a relative path, fix it
      if (!base && typeof input === 'string') {
        // No base provided, resolve from test directory
        const testFileDir = `${process.cwd()}/src/components/sections/__tests__`;
        try {
          const resolved = path.resolve(testFileDir, input);
          const fileUrl = `file://${resolved}`;
          return new OriginalURL(fileUrl);
        } catch (e2) {
          throw e; // Throw original error if resolution fails
        }
      }
      // If base is provided but not a valid URL scheme, try treating it as a file path
      if (typeof base === 'string' && !base.startsWith('file://') && !base.startsWith('http')) {
        // Base might be a file path, convert to file:// URL
        const fileBase = `file://${base}`;
        try {
          return new OriginalURL(input, fileBase);
        } catch (e2) {
          throw e; // Throw original error if both attempts fail
        }
      }
      throw e;
    }
  };

  // Copy static methods and properties
  Object.setPrototypeOf(PatchedURLConstructor, OriginalURL);
  Object.setPrototypeOf(PatchedURLConstructor.prototype, OriginalURL.prototype);

  // Replace the global URL
  (globalThis as any).URL = PatchedURLConstructor;
}
