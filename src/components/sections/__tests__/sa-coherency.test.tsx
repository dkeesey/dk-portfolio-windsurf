/**
 * SA Coherency Tests
 *
 * Cross-component checks that ensure the SA repositioning doesn't
 * accidentally break existing facts or delete experience entries.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Cross-Component Coherency', () => {
  it('timeline summary stats still show "8" Fortune 500 companies', async () => {
    const { EnterpriseExperienceTimeline } = await import(
      '../EnterpriseExperienceTimeline'
    );
    render(<EnterpriseExperienceTimeline />);

    // The Enterprise Portfolio Highlights section shows "8" for Fortune 500
    const stat = screen.getByText('8');
    expect(stat).toBeInTheDocument();
    // Verify it's paired with the Fortune 500 label
    const label = screen.getByText(/Fortune 500/i);
    expect(label).toBeInTheDocument();
  });

  it('experience count >= 10 entries (don\'t accidentally delete entries)', async () => {
    const { EnterpriseExperienceTimeline } = await import(
      '../EnterpriseExperienceTimeline'
    );
    render(<EnterpriseExperienceTimeline />);

    // Each experience entry renders as a heading level 3 (the title)
    const experienceTitles = screen.getAllByRole('heading', { level: 3 });
    // Subtract 1 for the "Enterprise Portfolio Highlights" h3
    const entryCount = experienceTitles.length - 1;
    expect(entryCount).toBeGreaterThanOrEqual(10);
  });
});
