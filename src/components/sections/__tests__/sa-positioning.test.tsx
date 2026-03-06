/**
 * SA Positioning Tests — TDD RED Phase
 *
 * These tests assert that the site positions Dean as an "AI Systems Architect"
 * rather than a "Full Stack Developer" or "Frontend Engineer". They will FAIL
 * against the current codebase and pass after the SA rewrite.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// ─── Hero / Index Frontmatter Assertions ────────────────────────────────────
// These test the data structure that drives the hero section.
// We import the frontmatter values indirectly by reading the MDX file,
// but since frontmatter is Astro-specific, we test the components that consume it.

describe('Hero / SEO Positioning', () => {
  it('SEO title contains "AI Systems Architect"', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync(
      new URL('../../../../pages/index.mdx', import.meta.url),
      'utf-8'
    );
    // Extract frontmatter title
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    expect(titleMatch).not.toBeNull();
    const title = titleMatch![1];
    expect(title).toContain('AI Systems Architect');
  });

  it('SEO title does NOT contain "Full Stack" or "Frontend"', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync(
      new URL('../../../../pages/index.mdx', import.meta.url),
      'utf-8'
    );
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    expect(titleMatch).not.toBeNull();
    const title = titleMatch![1];
    expect(title).not.toContain('Full Stack');
    expect(title).not.toContain('Frontend');
  });

  it('hero headline contains "AI Systems Architect"', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync(
      new URL('../../../../pages/index.mdx', import.meta.url),
      'utf-8'
    );
    const headlineMatch = content.match(/headline:\s*"([^"]+)"/);
    expect(headlineMatch).not.toBeNull();
    const headline = headlineMatch![1];
    expect(headline).toContain('AI Systems Architect');
  });

  it('hero description references enterprise AI deployment, not frontend development', async () => {
    const fs = await import('fs');
    const content = fs.readFileSync(
      new URL('../../../../pages/index.mdx', import.meta.url),
      'utf-8'
    );
    // Extract the microtext description (may span line via YAML)
    const descMatch = content.match(/hero:[\s\S]*?description:\s*"([^"]+)"/);
    expect(descMatch).not.toBeNull();
    const description = descMatch![1];
    // Should reference enterprise/AI concepts
    expect(description.toLowerCase()).toMatch(/enterprise|ai|architect|deploy|orchestrat/);
    // Should NOT be about frontend dev
    expect(description.toLowerCase()).not.toContain('frontend development');
  });
});

// ─── Experience Timeline Assertions ─────────────────────────────────────────

describe('EnterpriseExperienceTimeline — SA Positioning', () => {
  let EnterpriseExperienceTimeline: React.ComponentType;

  beforeAll(async () => {
    const mod = await import('../EnterpriseExperienceTimeline');
    EnterpriseExperienceTimeline = mod.EnterpriseExperienceTimeline;
  });

  it('first entry title is "Founder & AI Systems Architect"', () => {
    render(<EnterpriseExperienceTimeline />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings[0].textContent).toBe('Founder & AI Systems Architect');
  });

  it('first entry company is "Client Engine AI"', () => {
    render(<EnterpriseExperienceTimeline />);
    // Company name rendered as a span with font-medium class
    const companySpans = document.querySelectorAll('.font-medium');
    // First company span in the timeline
    const firstCompany = Array.from(companySpans).find(el =>
      el.closest('[class*="border-l-2"]')
    );
    expect(firstCompany?.textContent).toBe('Client Engine AI');
  });

  it('"Claude Code Swarm" appears in first entry achievements', () => {
    render(<EnterpriseExperienceTimeline />);
    expect(screen.getByText(/Claude Code Swarm/i)).toBeInTheDocument();
  });

  it('SupportLogic entry title contains "AI"', () => {
    render(<EnterpriseExperienceTimeline />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    const supportLogicHeading = headings.find(h =>
      h.textContent?.includes('Support Logic') ||
      h.textContent?.includes('SupportLogic') ||
      // The heading is the title, check nearby for SupportLogic company name
      true
    );
    // Find the heading that belongs to the SupportLogic entry
    // SupportLogic is the second entry (index 1)
    expect(headings[1].textContent).toContain('AI');
  });

  it('Masumi entry title contains "Fractional CTO"', () => {
    render(<EnterpriseExperienceTimeline />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    // Masumi is the third entry (index 2)
    expect(headings[2].textContent).toContain('Fractional CTO');
  });

  it('section badge text contains "AI" or "Architecture"', () => {
    render(<EnterpriseExperienceTimeline />);
    // The section has a Badge in the header area
    const sectionBadges = document.querySelectorAll('.bg-blue-100.text-blue-800');
    const headerBadge = Array.from(sectionBadges).find(el =>
      el.closest('.text-center.mb-16') || el.closest('[class*="text-center"]')
    );
    expect(headerBadge).toBeTruthy();
    const badgeText = headerBadge!.textContent || '';
    expect(badgeText.match(/AI|Architecture/i)).toBeTruthy();
  });

  it('no entry has title "Senior Frontend Engineer & Consultant"', () => {
    render(<EnterpriseExperienceTimeline />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    headings.forEach(h => {
      expect(h.textContent).not.toBe('Senior Frontend Engineer & Consultant');
    });
  });
});

// ─── Skills Matrix Assertions ───────────────────────────────────────────────

describe('SkillsMatrix — SA Positioning', () => {
  let SkillsMatrix: React.ComponentType;

  beforeAll(async () => {
    const mod = await import('../SkillsMatrix');
    SkillsMatrix = mod.SkillsMatrix;
  });

  it('first category is "LLM Orchestration & Agent Design"', () => {
    render(<SkillsMatrix />);
    // Categories are rendered as Badge elements in the filter bar
    const badges = screen.getAllByText(/LLM Orchestration|Frontend|Backend/);
    // The first filter badge should be the first category
    expect(badges[0].textContent).toBe('LLM Orchestration & Agent Design');
  });

  it('"Multi-Agent Coordination" skill exists', () => {
    render(<SkillsMatrix />);
    expect(screen.getByText('Multi-Agent Coordination')).toBeInTheDocument();
  });

  it('"Claude API & MCP" skill exists', () => {
    render(<SkillsMatrix />);
    expect(screen.getByText('Claude API & MCP')).toBeInTheDocument();
  });

  it('"Enterprise AI Strategy" category exists', () => {
    render(<SkillsMatrix />);
    expect(screen.getByText('Enterprise AI Strategy')).toBeInTheDocument();
  });

  it('"CSS/Sass" does NOT appear as a standalone top-level skill', () => {
    render(<SkillsMatrix />);
    const cssElements = screen.queryAllByText('CSS/Sass');
    expect(cssElements).toHaveLength(0);
  });

  it('no "Digital Marketing" category', () => {
    render(<SkillsMatrix />);
    expect(screen.queryByText('Digital Marketing')).not.toBeInTheDocument();
  });

  it('"jQuery" does not appear anywhere', () => {
    render(<SkillsMatrix />);
    expect(screen.queryByText('jQuery')).not.toBeInTheDocument();
  });
});
