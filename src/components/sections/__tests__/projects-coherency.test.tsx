/**
 * Projects Coherency Tests
 *
 * Structural integrity checks: all projects have valid descriptions,
 * technologies, links, and images.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectsGridPath = resolve(__dirname, '../ProjectsGrid.tsx');

describe('ProjectsGrid — Coherency', () => {
  const source = readFileSync(projectsGridPath, 'utf-8');

  it('all projects have non-empty descriptions (> 50 chars)', () => {
    const descMatches = [...source.matchAll(/description:\s*\n?\s*'([^']+)'/g)];
    expect(descMatches.length).toBeGreaterThanOrEqual(4);
    descMatches.forEach((match) => {
      expect(match[1].length).toBeGreaterThan(50);
    });
  });

  it('all projects have at least 3 technologies', () => {
    const techMatches = [...source.matchAll(/technologies:\s*\[([^\]]+)\]/g)];
    expect(techMatches.length).toBeGreaterThanOrEqual(4);
    techMatches.forEach((match) => {
      const items = match[1].split(',').filter(s => s.trim().length > 0);
      expect(items.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('all projects have a valid link (starts with "/projects/")', () => {
    const linkMatches = [...source.matchAll(/link:\s*'([^']+)'/g)];
    expect(linkMatches.length).toBeGreaterThanOrEqual(4);
    linkMatches.forEach((match) => {
      expect(match[1]).toMatch(/^\/projects\//);
    });
  });

  it('all projects have an image path (starts with "/images/")', () => {
    const imageMatches = [...source.matchAll(/image:\s*'([^']+)'/g)];
    expect(imageMatches.length).toBeGreaterThanOrEqual(4);
    imageMatches.forEach((match) => {
      expect(match[1]).toMatch(/^\/images\//);
    });
  });
});
