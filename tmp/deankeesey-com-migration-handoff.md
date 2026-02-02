# deankeesey.com - Astro 5 Migration + Project Rename

## Mission
Migrate dk-portfolio from Astro 4.4.0 to 5.17.1 AND rename the project to `deankeesey-com` for consistency with other sites.

## Context (What We Just Did)

Successfully batch-updated 6 other Astro sites to 5.17.1 with no issues:
- masumihayashi-com (5.14.6 → 5.17.1) ✅
- oakland-brainspotting-therapy (5.15.3 → 5.17.1) ✅
- megangredesky.com (5.15.3 → 5.17.1) ✅
- findbrainspottingtherapy (5.15.8 → 5.17.1) ✅
- walt-opie (5.16.0 → 5.17.1) ✅
- masumimuseum-astro (5.14.0 → 5.17.1) ✅

dk-portfolio is the only site still on Astro 4.x and needs a MAJOR version upgrade with breaking changes.

## Current State

**Directory:** `~/Workspace/dk-sites/dk-portfolio/`
**Astro Version:** 4.4.0
**Git Remote:** `git@github.com:dkeesey/dk-portfolio-windsurf.git`
**Cloudflare Pages:** `deankeesey-com-v2` (but `deankeesey-com` may now be available - user rebuilt CF project for GitHub Actions CI/CD)
**Domain:** deankeesey.com

### What This Project Uses (Requires Migration)
1. **Content Collections** - `src/content/blog/` with `src/content/config.ts`
2. **ViewTransitions** - Used in `src/layouts/RootLayout.astro`

## Breaking Changes: Astro 4 → 5

### 1. Content Collections API (MAJOR)
```bash
# Old location
src/content/config.ts

# New location
src/content.config.ts  # Move to project root!
```

**Schema changes required:**
```typescript
// OLD (Astro 4)
import { defineCollection, z } from 'astro:content';
const blog = defineCollection({
  schema: z.object({ ... })
});

// NEW (Astro 5) - Add loader property
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({ ... })
});
```

**Field changes:**
- `slug` → `id` (in queries and templates)
- `render()` import changes

### 2. ViewTransitions → ClientRouter
```astro
// OLD
import { ViewTransitions } from 'astro:transitions';
<ViewTransitions />

// NEW
import { ClientRouter } from 'astro:transitions';
<ClientRouter />
```

### 3. TypeScript Config
Update `tsconfig.json`:
```json
{
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

### 4. Other Changes
- `Astro.glob()` → `import.meta.glob()` with `{ eager: true }`
- `output: 'hybrid'` is now default (remove if present)
- Scripts render directly (may need `is:inline` for conditional scripts)

## The Plan

### Part 1: Astro 5 Migration
1. Read current `src/content/config.ts` to understand schema
2. Read `src/layouts/RootLayout.astro` to find ViewTransitions usage
3. Run `npx @astrojs/upgrade` to update dependencies
4. Move `src/content/config.ts` → `src/content.config.ts` (project root)
5. Update schema to add `loader` property
6. Replace `ViewTransitions` → `ClientRouter`
7. Update any `slug` references to `id`
8. Update tsconfig.json
9. Build and verify: `npm run build`

### Part 2: Project Rename (After Migration Works)
1. Rename GitHub repo: `dk-portfolio-windsurf` → `deankeesey-com`
   ```bash
   gh repo rename deankeesey-com
   ```
2. Rename local directory:
   ```bash
   cd ~/Workspace/dk-sites
   mv dk-portfolio deankeesey-com
   ```
3. Update git remote in new location:
   ```bash
   cd deankeesey-com
   git remote set-url origin git@github.com:dkeesey/deankeesey-com.git
   ```
4. Update `~/Workspace/dk-sites/CLAUDE.md` project registry
5. Check if CF Pages project `deankeesey-com` is available (user says v1 was deleted)
6. Update CF Pages project name if needed, or create new one with correct name
7. Commit and push from the new directory

## Key Files to Modify

- `src/content/config.ts` → move to `src/content.config.ts` + add loader
- `src/layouts/RootLayout.astro` - ViewTransitions → ClientRouter
- `tsconfig.json` - update include/exclude
- `package.json` - will be updated by upgrade command

## Success Criteria

- [ ] `npm run build` succeeds with Astro 5.17.1
- [ ] All blog content renders correctly
- [ ] ViewTransitions still work (as ClientRouter)
- [ ] Directory renamed to `deankeesey-com`
- [ ] GitHub repo renamed to `deankeesey-com`
- [ ] Git remote updated and push works
- [ ] CF Pages project named `deankeesey-com` (not -v2)
- [ ] GitHub Actions CI/CD deploys successfully
- [ ] CLAUDE.md project registry updated

## Watch Out For

- Content collection schema might have custom fields - preserve them
- There may be `slug` references in page templates - search for them
- The site is in "MAINTENANCE" mode - it should still build
- Don't break any existing blog posts during migration
- Test the build BEFORE doing the rename (easier to debug)
- CF Pages was rebuilt for GitHub Actions - verify CI/CD still works after rename

## Reference Docs

- Astro 5 Migration Guide: https://docs.astro.build/en/guides/upgrade-to/v5/
- Content Layer API: https://docs.astro.build/en/guides/content-collections/

## Commands to Start

```bash
cd ~/Workspace/dk-sites/dk-portfolio

# First, examine what we're working with
cat src/content/config.ts
cat src/layouts/RootLayout.astro
cat tsconfig.json

# Then run the upgrade
npx @astrojs/upgrade
```
