/**
 * Projects → Case Studies SA Positioning Tests — TDD RED Phase
 *
 * These tests assert that the projects page positions Dean as an
 * "AI Systems Architect" with SA-aligned case studies, not
 * frontend/SEO/WordPress projects.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// ─── Page-Level / SEO Assertions ─────────────────────────────────────────────

describe('Projects Page — SEO Positioning', () => {
  it('SEO title contains "Case Studies"', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync(
      new URL('../../../../pages/projects/index.astro', import.meta.url),
      'utf-8'
    );
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    expect(titleMatch).not.toBeNull();
    expect(titleMatch![1]).toContain('Case Studies');
  });

  it('SEO description references "AI" or "architecture"', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync(
      new URL('../../../../pages/projects/index.astro', import.meta.url),
      'utf-8'
    );
    const descMatch = content.match(/description:\s*"([^"]+)"/);
    expect(descMatch).not.toBeNull();
    expect(descMatch![1].toLowerCase()).toMatch(/ai|architect/);
  });
});

// ─── ProjectsGrid Content Assertions ─────────────────────────────────────────

describe('ProjectsGrid — SA Content', () => {
  let ProjectsGrid: React.ComponentType;

  beforeAll(async () => {
    const mod = await import('../ProjectsGrid');
    ProjectsGrid = mod.ProjectsGrid;
  });

  it('page heading is "Case Studies"', () => {
    render(<ProjectsGrid />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Case Studies');
  });

  it('has at least 4 projects', () => {
    render(<ProjectsGrid />);
    // Each project card has an h3 title overlay
    const projectTitles = screen.getAllByRole('heading', { level: 3 });
    expect(projectTitles.length).toBeGreaterThanOrEqual(4);
  });

  it('no project has category "Digital Marketing"', () => {
    render(<ProjectsGrid />);
    expect(screen.queryByText('Digital Marketing')).not.toBeInTheDocument();
  });

  it('no project has category "Web Security"', () => {
    render(<ProjectsGrid />);
    expect(screen.queryByText('Web Security')).not.toBeInTheDocument();
  });

  it('no project title contains "WordPress Security"', () => {
    render(<ProjectsGrid />);
    expect(screen.queryByText(/WordPress Security/i)).not.toBeInTheDocument();
  });

  it('no project title contains "Political Campaign"', () => {
    render(<ProjectsGrid />);
    expect(screen.queryByText(/Political Campaign/i)).not.toBeInTheDocument();
  });
});

// ─── SA Project Existence Assertions ─────────────────────────────────────────

describe('ProjectsGrid — SA Projects Exist', () => {
  let ProjectsGrid: React.ComponentType;

  beforeAll(async () => {
    const mod = await import('../ProjectsGrid');
    ProjectsGrid = mod.ProjectsGrid;
  });

  it('has "Slack Analytics Intelligence" project', () => {
    render(<ProjectsGrid />);
    expect(screen.getByText('Slack Analytics Intelligence')).toBeInTheDocument();
  });

  it('has "Multi-Agent Coordination System" project', () => {
    render(<ProjectsGrid />);
    expect(screen.getByText('Multi-Agent Coordination System')).toBeInTheDocument();
  });

  it('has "Masumi Hayashi Foundation" project with CTO category', () => {
    render(<ProjectsGrid />);
    expect(screen.getByText('Masumi Hayashi Foundation')).toBeInTheDocument();
    expect(screen.getAllByText(/CTO/).length).toBeGreaterThanOrEqual(1);
  });

  it('has "Enterprise Automation Pipeline" project', () => {
    render(<ProjectsGrid />);
    expect(screen.getByText('Enterprise Automation Pipeline')).toBeInTheDocument();
  });

  it('Masumi Hayashi is first project (hero card)', () => {
    render(<ProjectsGrid />);
    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles[0].textContent).toBe('Masumi Hayashi Foundation');
  });
});

// ─── Category Assertions ─────────────────────────────────────────────────────

describe('ProjectsGrid — SA Categories', () => {
  let ProjectsGrid: React.ComponentType;

  beforeAll(async () => {
    const mod = await import('../ProjectsGrid');
    ProjectsGrid = mod.ProjectsGrid;
  });

  it('has "AI Orchestration" category', () => {
    render(<ProjectsGrid />);
    expect(screen.getAllByText('AI Orchestration').length).toBeGreaterThanOrEqual(1);
  });

  it('has "Data Intelligence" category', () => {
    render(<ProjectsGrid />);
    expect(screen.getAllByText('Data Intelligence').length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Technology Assertions ───────────────────────────────────────────────────

describe('ProjectsGrid — SA Technologies', () => {
  let ProjectsGrid: React.ComponentType;

  beforeAll(async () => {
    const mod = await import('../ProjectsGrid');
    ProjectsGrid = mod.ProjectsGrid;
  });

  it('"Claude API" appears in at least one project', () => {
    render(<ProjectsGrid />);
    expect(screen.getAllByText('Claude API').length).toBeGreaterThanOrEqual(1);
  });

  it('"n8n" appears in at least one project', () => {
    render(<ProjectsGrid />);
    expect(screen.getAllByText('n8n').length).toBeGreaterThanOrEqual(1);
  });

  it('"BigQuery" appears in at least one project', () => {
    render(<ProjectsGrid />);
    expect(screen.getAllByText('BigQuery').length).toBeGreaterThanOrEqual(1);
  });

  it('"jQuery" does NOT appear anywhere', () => {
    render(<ProjectsGrid />);
    expect(screen.queryByText('jQuery')).not.toBeInTheDocument();
  });
});
