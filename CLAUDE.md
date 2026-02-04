# deankeesey.com - AI Product Engineer Portfolio

**Live Site**: https://deankeesey.com
**Repository**: ~/Workspace/dk-sites/deankeesey-com/
**Branch**: main
**Deployment**: Netlify + Cloudflare Pages (GitHub Actions)

---

## 1. WHAT IS THIS?

**Purpose**: Personal portfolio and technical blog showcasing AI product engineering expertise.

**Tech Stack**:
- **Framework**: Astro 4.4.0 (static site generator)
- **Frontend**: React 18.2 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components (Radix UI primitives)
- **Content**: Markdown blog posts with frontmatter
- **Analytics**: GTM + GA4 + FB Pixel + Microsoft Clarity + PostHog (via Partytown for non-blocking)
- **Backend Services**:
  - Supabase (authentication, database)
  - Azure OpenAI (AI features)
  - Botpress (chatbot integration)
- **Hosting**: Netlify primary, Cloudflare Pages mirror (automatic deployment)
- **Testing**: Jest + Vitest + Puppeteer

**Architecture**:
```
/src
├── components/    # React components (UI, analytics, features)
├── content/blog/  # Markdown blog posts
├── layouts/       # Page templates
├── pages/         # Astro routes
└── lib/          # Utilities, env config

/public           # Static assets (images, fonts)
/netlify          # Netlify functions
```

**Content Strategy**:
- Technical blog focused on: AI development, WordPress architecture, Cloudflare infrastructure
- Recent articles: WordPress 5-layer optimization, Last Mover Advantage (AI + WordPress), Cloudflare benefits
- Positioning: AI product engineer with full-stack and infrastructure expertise

---

## 2. HOW DO I WORK HERE?

**Local Development**:
```bash
npm run dev        # Start dev server (http://localhost:4321)
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # ESLint + TypeScript checks
npm run format     # Prettier formatting
```

**Code Conventions**:
- React components use TypeScript
- Tailwind utility classes preferred over custom CSS
- Blog posts in `/src/content/blog/` with YAML frontmatter
- Images optimized before commit, stored in `/public/images/`
- Environment variables:
  - `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`
  - `PUBLIC_POSTHOG_API_KEY`, `PUBLIC_POSTHOG_HOST`
  - `PUBLIC_GA_TRACKING_ID`

**Deployment**:
- **Auto-deploy**: Push to `main` → GitHub Actions → Cloudflare Pages
- **Netlify**: Also auto-deploys from `main` branch
- **Preview**: Netlify creates deploy previews for PRs

**CSP Headers**:
- Development: Permissive (allows `unsafe-inline`, `unsafe-eval` for dev tools)
- Production: Strict CSP with specific allowlists for analytics/chatbot domains

---

## 3. ⚠️ ANTI-PATTERNS

**Things that broke this project** (add to this as issues occur):

_No anti-patterns documented yet - this section will build over time as we encounter errors._

**Potential gotchas to watch for**:
- Environment variables must be prefixed with `PUBLIC_` to be client-accessible
- Analytics scripts load via Partytown - check `forward` config if analytics broken
- CSP headers can block new integrations - update both dev and prod CSP in `astro.config.mjs`
- Supabase keys exposed in client code - use anon key only, server key in Netlify functions

---

## 4. WHERE DO I FIND X?

**Key Files**:
- **Site config**: `astro.config.mjs` (CSP, integrations, partytown, sitemap)
- **Package info**: `package.json` (dependencies, scripts)
- **Analytics**: `src/components/analytics/Analytics.astro`
- **Blog posts**: `src/content/blog/*.md` (markdown with frontmatter)
- **Environment**: `src/lib/env.ts` (environment variable handling)
- **Netlify functions**: `/netlify/functions/` (serverless functions)

**Component Library**:
- Radix UI primitives in `@radix-ui/*` packages
- shadcn/ui components (dialog, dropdown, tabs, toast, etc.)
- Custom UI in `src/components/`

**Analytics Stack**:
- GTM container ID in `Analytics.astro`
- Partytown config in `astro.config.mjs` line 16-21
- PostHog, GA4, Clarity, FB Pixel loaded via GTM

**External Resources**:
- **Analytics**: GTM dashboard, GA4 property, PostHog project
- **Database**: Supabase project (clzvndqgtmbsugmdpdsq.supabase.co)
- **Chatbot**: Botpress workspace
- **Deployment**: Netlify site dashboard, Cloudflare Pages project

---

## 5. WHAT'S HAPPENING NOW?

**Current Status** (as of February 2026):

**Active Work**:
- **Gig Work Strategy**: /hire landing page added for freelance positioning
- Portfolio actively promoting freelance services

**Recent Work** (last 3 months):
- **Feb 2026**: Added `/hire` landing page with animated service packages
  - Frontend Animation focus (React + Framer Motion)
  - Cloudflare Workers + Stripe + GA4 services
  - Upwork profile integration
  - Navigation updated with "Hire Me" CTA button
- **Jan 2026**: Added WordPress optimization article (5-layer architecture from Walt Opie project)
- **Dec 2025**: Published "Why I Build Everything on Cloudflare" article
- **Nov-Dec 2025**: Analytics stack consolidation:
  - Migrated to GTMAnalytics component
  - Added Microsoft Clarity
  - Fixed GA4/FB Pixel configuration issues
  - Standardized env variable usage
- **Nov 2025**: Set up GitHub Actions for automatic Cloudflare Pages deployment

**Decisions**:
- Chose Cloudflare Pages as secondary deployment (redundancy + global CDN)
- Centralized analytics via GTM + Partytown (non-blocking, better performance)
- Blog content focuses on AI + infrastructure to establish expertise positioning

**Next** (potential):
- Continue adding technical blog content (AI, infrastructure, architecture)
- May add more AI-powered features (chatbot already integrated via Botpress)
- Portfolio remains static until business priorities shift

**Blockers**: None currently

---

**Last Updated**: 2026-02-03 (added /hire landing page for gig work strategy)
**Maintenance**: Session hooks will append updates to this section going forward
