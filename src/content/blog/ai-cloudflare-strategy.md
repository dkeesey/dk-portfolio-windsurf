---
title: "Why I Build Everything on Cloudflare (And Let AI Handle the Boring Parts)"
description: "How Cloudflare's infrastructure and AI-driven automation enable building static sites and micro-SaaS products with exceptional performance at near-zero cost."
publishDate: 2025-11-22
tags: ["cloudflare", "ai-development", "infrastructure", "static-sites", "micro-saas", "automation"]
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop&q=80"
readingTime: 8
author: "Dean Keesey"
---

I spent three years building portfolio sites, client projects, and micro-SaaS products the "normal" way: researching DNS providers, comparing CDN options, debugging SSL certificates at 2am, and clicking through dashboards to set up redirects.

Then I realized I was solving the same infrastructure problems over and over again while competitors were shipping features.

Here's what changed: **I standardized on Cloudflare for everything, and let AI handle the repetitive infrastructure work.**

Not because it's trendy. Because after deploying 15+ projects, I can prove it's faster, cheaper, and more reliable than any alternative.

## The Strategy: Static Sites + Serverless Functions = Infinite Scale at Zero Cost

My product strategy is simple:
- **Static sites** for marketing, portfolios, and content
- **Serverless functions** for dynamic features (forms, auth, APIs)
- **Edge caching** for instant global delivery
- **AI automation** for infrastructure management

Think: Landing pages that load in 50ms globally, authentication that scales to millions, and infrastructure costs under $20/month for multiple products.

The stack that makes this possible? Cloudflare. Everything else is just overhead.

## Why Cloudflare Wins (And It's Not Even Close)

I've used AWS CloudFront, Google Cloud CDN, Netlify, and Vercel. They're all fine. But here's what Cloudflare gives me that nobody else does:

### 1. Everything I Need on the Free Tier

**What I get for $0/month across 8 production domains:**
- Global CDN (330+ cities, faster than AWS's 450+ PoPs in practice)
- Automatic SSL certificates (apex, www, wildcards - all free)
- Unlimited DDoS protection (AWS charges $3k/month for this)
- DNS hosting (AWS charges $0.50/zone/month)
- Redirect Rules (unlimited - AWS requires Lambda@Edge at $0.60/million requests)
- Analytics dashboard (AWS charges per CloudWatch metric)

**What this would cost on AWS**: ~$456/year
**What this would cost on Google Cloud**: ~$300/year
**What I pay Cloudflare**: **$0/year**

And before you say "you get what you pay for" - Cloudflare's free tier handles 30% of all web traffic globally. It's not a hobby project.

### 2. Performance That Actually Matters

I don't care about theoretical benchmarks. I care about what users experience.

**Real measurements from my sites:**
- Time to First Byte (TTFB): **200ms → 20ms** (90% faster)
- Full page load: **2.0s → 0.8s** (60% faster)
- SSL handshake: **100ms → 30ms** (70% faster)
- Cache hit rate: **95%+** (only 5% of requests hit origin)

How? Cloudflare's edge network means your static site is cached in 330 cities. When someone in Tokyo visits your site, they're hitting a server in Tokyo, not your origin in Virginia.

**The result**: Better Core Web Vitals, better Google rankings, happier users.

### 3. API-First Architecture (The AI Multiplier)

This is where it gets interesting.

Everything in Cloudflare's dashboard is accessible via API. Not "technically accessible but painful" like AWS. Actually accessible with simple curl commands.

**Example - Creating a redirect rule**:

```bash
curl -X PUT "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/rulesets/..." \
  -H "Authorization: Bearer $TOKEN" \
  --data '{
    "rules": [{
      "expression": "(http.host eq \"old-site.com\")",
      "action": "redirect",
      "action_parameters": {
        "from_value": {
          "status_code": 301,
          "target_url": { "expression": "concat(\"https://new-site.com\", http.request.uri.path)" }
        }
      }
    }]
  }'
```

That's it. No SDKs, no complex auth flows, no IAM policies.

**Why this matters for AI-driven development**: I can tell Claude "create redirects for these 10 legacy domains" and it generates the exact script I need. Then I review it, run it, and 30 seconds later I'm done.

**Traditional approach**: 30 minutes of clicking through UI
**AI-assisted approach**: 30 seconds

That's a 60x improvement. And I'm not exaggerating - I timed it last week while migrating a client's legacy domains.

## The AI-Driven Development Workflow

Here's how I actually build now:

### Scenario 1: New Domain Onboarding

**Old way** (what I used to do):
1. Add domain to Cloudflare (5 min)
2. Configure DNS records (10 min)
3. Set up www redirect (5 min)
4. Wait for SSL to provision (check every 10 min for an hour)
5. Test all combinations (HTTP/HTTPS, apex/www) (10 min)
6. Inevitably discover I forgot something, fix it (15 min)

**Total**: 70 minutes, half of it waiting and clicking

**AI-driven way** (what I do now):

```
Me: "Add newdomain.com to Cloudflare. Origin IP is 192.168.1.1.
     Set up www redirect to apex."

Claude: [Generates comprehensive onboarding script]

Me: [Review script - 2 minutes]
Me: [Run script - 30 seconds]
Script: [Creates zone, imports DNS, sets up redirect, enables SSL]
Script: [Outputs: "Update nameservers to: bailey.ns.cloudflare.com,
         theo.ns.cloudflare.com"]

Me: [Update nameservers at registrar - 2 minutes]
Script: [Polls for propagation, alerts when complete - 20 min passive]
Script: [Tests all redirect combinations, confirms SSL active]
Script: "✅ Domain onboarding complete. All tests passing."
```

**Total**: 5 minutes active work, 20 minutes passive waiting

I can onboard a client domain while making coffee. That's the difference.

### Scenario 2: SSL Certificate Monitoring

Real talk: Cloudflare's Universal SSL usually "just works." But when it doesn't, you need to know immediately.

**AI-driven monitoring script** I built:

```bash
# Runs daily via cron
~/scripts/cloudflare-ssl-monitor.sh

# For each domain:
# - Checks certificate status via API
# - Alerts if "Pending Validation" > 24 hours
# - Tests HTTPS on apex and www
# - Saves results to database

# Last week it caught:
# - www.client-site.com stuck in "Pending" after switching to Full DNS
# - Auto-retried validation
# - Fixed itself before client even knew there was an issue
```

This is AI-driven operations: Write the monitoring logic once, let it run forever, only intervene when absolutely necessary.

### Scenario 3: Performance Optimization

**What Claude helped me discover last month**:

```
Me: "client-site.com feels slow. Analyze performance."

Claude:
[Fetches Cloudflare analytics via API]
[Analyzes cache hit rate, TTFB, bandwidth patterns]

"Found 3 optimization opportunities:

1. Cache hit rate is only 45% (should be 90%+)
   - Origin sends Cache-Control: no-cache headers
   - Fix: Override with Page Rule
   - Impact: 2x faster, 90% less origin load

2. Images average 2.1MB each
   - No compression or optimization
   - Fix: Enable Cloudflare Polish ($5/month) OR migrate to R2 + Image Resizing
   - Impact: 75% smaller images = 3x faster loads

3. Not using HTTP/2 Server Push
   - Critical CSS/JS loaded sequentially
   - Fix: Enable Server Push in settings
   - Impact: 200ms faster first paint

Want me to implement #1 and #3? (Skipping #2 for now to stay on free tier)"

Me: "Yes, do it."

Claude: [Creates Page Rule via API, enables HTTP/2 Push]
Claude: "Done. Test the site now - should be noticeably faster."
```

**Result**: Site went from "feels slow" to loading in under 1 second.

**Time invested**: 10 minutes of conversation with Claude vs. hours of manual performance analysis.

## The Micro-SaaS Advantage

Here's where Cloudflare's architecture really shines: **You can build a profitable SaaS product for under $20/month.**

**My current micro-SaaS stack**:
- **Frontend**: Static site on Cloudflare Pages (Free)
- **Authentication**: Clerk or Auth0 (Free tier: 5k users)
- **Database**: Supabase or PlanetScale (Free tier: 500MB)
- **Functions**: Cloudflare Workers (Free tier: 100k requests/day)
- **Email**: Resend or Loops (Free tier: 3k emails/month)
- **Payments**: Stripe (2.9% + $0.30 per transaction)

**Total infrastructure cost**: $0 until you have paying customers.

**When you need to scale**:
- Cloudflare Pro: $20/month (gets you to millions of requests)
- Upgrade auth/DB as needed: ~$25-50/month

**At $500 MRR**: Your infrastructure costs are 4-8% of revenue.
**At AWS/GCP**: Your infrastructure costs would be 20-30% of revenue.

That's the difference between profitable and struggling.

## The Static Site Philosophy

People think "static sites" means "basic brochure sites."

They're wrong.

**What I build with static sites:**
- Portfolio sites that rank #1 for competitive keywords (SEO on easy mode)
- Landing pages that convert at 8%+ (fast load times = higher conversion)
- Documentation sites that handle 100k visitors/day (infinite cache, zero server load)
- Artist portfolios with 500+ high-res images (edge caching + Cloudflare R2)

**The secret**: Static HTML/CSS/JS for content, serverless functions for dynamic features.

**Example architecture**:
```
Static site (Astro/Next.js) deployed to Cloudflare Pages
  ↓
Contact form → Cloudflare Worker → Email API
Newsletter signup → Cloudflare Worker → ConvertKit API
Authentication → Clerk (JWT) → Cloudflare Workers validates
Payment → Stripe Checkout → Webhook to Cloudflare Worker
```

**Benefits**:
- Load times under 500ms globally
- Can handle traffic spikes of 100x with zero config
- No servers to manage, patch, or scale
- Infrastructure cost: $0-20/month

**What users see**: A fast, reliable, professional product
**What you manage**: HTML files and a few serverless functions

## The Case Study: Masumi Hayashi Foundation

Real project I shipped last month:

**The challenge**: Consolidate 3 legacy domains (foundation.org, museum.com, artist.com) into one modern site. Preserve SEO equity, ensure zero downtime, fix SSL issues on www subdomains.

**Traditional approach**:
- Weeks of planning
- Manual redirect setup (error-prone)
- Hope you didn't break anything
- Monitor for 301 redirect issues

**AI-driven approach**:

**Day 1 - Analysis**:
```
Me: "I need to consolidate these 3 domains to masumihayashi.com.
     What's the optimal strategy?"

Claude: [Analyzes domains via dig/whois/Wayback Machine]
Claude: "Found existing content on foundation.org/about - preserve path.
         Museum.com has no active content - redirect all to homepage.

         Recommend:
         - foundation.org/about/* → masumihayashi.com/about/*
         - museum.com/* → masumihayashi.com/
         - All www variants need separate redirect rules

         I'll generate redirect rules for all 6 combinations
         (3 domains × 2 variants each)."
```

**Day 1 - Implementation**:
- Claude generates redirect script
- I review strategy (10 min)
- Run script (30 seconds)
- Redirects deployed to edge in <1 minute

**Day 2 - Discovery**:
```
Me: "www.museum.com is returning SSL handshake errors"

Claude: [Checks SSL certificate status via API]
Claude: "Root cause: museum.com is a Partial DNS zone (CNAME setup).
         Partial zones can't auto-provision SSL for www subdomain.

         Fix: Convert to Full DNS (primary nameservers).
         I'll walk you through conversion."
```

**Day 2 - Resolution**:
- Convert to Full DNS (15 min with Claude's guidance)
- SSL certificates auto-provision (30 min propagation)
- All domains working perfectly

**Total time**: 2 hours
**Traditional approach**: Would've taken 2 weeks and multiple support tickets

**Outcome**:
- ✅ All traffic consolidates to primary domain
- ✅ Zero SEO penalties (proper 301 redirects)
- ✅ Zero downtime
- ✅ SSL working on all variants
- ✅ Analytics now show accurate consolidated data

## The Unfair Advantages Stack Up

After 15+ projects on this stack, here's what compounds:

### 1. Reusable Infrastructure Patterns

Every domain I add takes less time than the last:
- First domain: 70 minutes (learning)
- Fifth domain: 20 minutes (getting efficient)
- Tenth domain: 5 minutes (fully automated scripts)

I've documented every pattern in playbooks. New projects start from proven templates.

### 2. AI Knowledge That Accumulates

Claude learns from each project:
- Remembers Cloudflare API patterns
- Understands my redirect strategy
- Knows my SSL troubleshooting checklist
- Suggests optimizations based on past projects

It's like having a senior DevOps engineer who never forgets and never sleeps.

### 3. Cost Structure That Scales

**At 5 domains**: $0/month
**At 50 domains**: $0/month
**At 500 domains**: Still $0/month (might upgrade to Pro at $20/month for better analytics)

Compare to AWS:
- 5 domains: $200/year
- 50 domains: $2,000/year
- 500 domains: $20,000/year

The math is absurd.

### 4. Performance That's Automatic

I don't optimize for performance anymore. Cloudflare does it automatically:
- HTTP/2 and HTTP/3: Enabled by default
- Brotli compression: Enabled by default
- Smart routing: Enabled by default
- Edge caching: Works out of the box

**My role**: Build the product. Cloudflare handles the infrastructure.

## The Things That Actually Matter

Here's what I've learned after three years of shipping products:

**Users don't care about your tech stack.** They care that your site loads fast, works reliably, and solves their problem.

**Investors don't care about your infrastructure costs.** They care about your margins and ability to scale.

**You shouldn't care about infrastructure at all.** You should care about shipping features.

Cloudflare + AI-driven automation lets me focus on the 5% that matters (product, design, marketing) instead of the 95% that's commodity (DNS, SSL, CDN, redirects).

## When This Approach Makes Sense

**You should use this stack if:**
- You're building static sites, landing pages, or JAMstack apps
- You're launching a micro-SaaS or consumer product
- You want infrastructure costs under $50/month
- You value fast iteration over perfect architecture
- You're a solo founder or small team

**You should NOT use this stack if:**
- You need server-side rendering for every page (use Vercel/Netlify)
- You're building a real-time multiplayer game (need dedicated servers)
- You require <5ms latency (need regional deployments)
- You have enterprise compliance requirements (need Cloudflare Enterprise or AWS)
- You're in China (Cloudflare doesn't have PoPs there)

For 90% of web products, this stack is overkill in the best way.

## The Playbook (Open Source)

I've documented every pattern, script, and optimization in playbooks:

**Infrastructure**:
- `cloudflare-full-dns-deployment.md` - Never use Partial DNS again
- `cloudflare-strategic-advantages.md` - Why Cloudflare vs AWS/GCP/others
- `cloudflare-api-automation-patterns.md` - API recipes and automation scripts

**Deployment**:
- `portfolio-site-deployment-playbook.md` - Static site deployment
- `gtm-analytics-automation-guide.md` - Analytics setup in 15 minutes
- `static-site-testing-deployment-playbook.md` - Testing and CI/CD

All available at: [github.com/deankeesey/cloudflare-playbooks](https://github.com/deankeesey/cloudflare-playbooks)

## The Contrarian Take

The Jamstack hype cycle is over. People moved on to Next.js server components and edge SSR.

**I think they're wrong.**

For 90% of sites, static HTML + serverless functions is:
- Faster (no server render time)
- Cheaper (no servers running 24/7)
- More reliable (infinite cache, no server crashes)
- Easier to scale (just CDN edge nodes)
- Simpler to maintain (no Docker, no Kubernetes, no DevOps team)

**The only thing that changed**: AI made it trivially easy to automate the boring parts.

You don't need a complex tech stack. You need fast infrastructure and smart automation.

## Start Here

If you're building a new project and this resonates:

1. **Add domain to Cloudflare** (free tier, Full DNS setup)
2. **Deploy static site** to Cloudflare Pages (or Netlify/Vercel if you prefer)
3. **Use Cloudflare Workers** for any serverless functions you need
4. **Let AI write your infrastructure scripts** (redirect rules, DNS config, monitoring)
5. **Document your patterns** so the next project is even faster

You'll have a production-ready, globally distributed site in under an hour.

The infrastructure costs you nothing. The performance is exceptional. And you can ship features instead of fighting with DevOps.

That's the advantage.

---

**Questions? Thoughts?** I'm [@deankeesey](https://twitter.com/deankeesey) on Twitter. Would love to hear if you try this approach.

**Want the scripts?** All my Cloudflare automation scripts are on [GitHub](https://github.com/deankeesey/cloudflare-automation) (open source, MIT license).

**Building something cool?** I occasionally take on consulting projects for infrastructure automation and AI-driven development. [Get in touch](mailto:dean@deankeesey.com).
