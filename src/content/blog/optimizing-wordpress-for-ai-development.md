---
title: "Optimizing WordPress for AI Development: The Stack That Actually Worked"
description: "WordPress is complex for AI to reason about. But clients need it for content management. Here's how we reduced AI iteration costs from 10 attempts to 3-5, and when WordPress is still the right choice."
publishDate: 2025-01-07
tags: ["WordPress", "AI", "development", "Tailwind", "optimization"]
image: "/images/blog/wordpress-ai-optimization.png"
author: "Dean Keesey"
draft: true
---

# Optimizing WordPress for AI Development: The Stack That Actually Worked

WordPress is expensive for AI-assisted development. The codebase doesn't fit in context windows, abstraction layers hide state, and non-deterministic behavior prevents AI from predicting outcomes accurately.

**But here's the reality:** Clients need WordPress. Non-technical users need the admin interface to manage content. You can't hand them markdown files and Git.

**So we hunted for efficiencies.** Over 18 months, we discovered optimization patterns that reduced AI iteration costs from 10 attempts per task to 3-5 attempts.

This is what actually worked.

## The Challenge

**Starting point:**
- WordPress core: ~875K tokens (4.3x over Claude's 200K context limit)
- 7 abstraction layers (Docker, MySQL, wp-cli, core, plugins, theme, env)
- Non-deterministic behavior (database state, plugin interactions, cache layers)
- AI iteration cost: ~10 attempts per task

**The constraint:**
Clients need WordPress for content management. The solution couldn't be "just use Astro" - we needed WordPress to work better with AI.

## The Actual Solution: TT5 + theme.json + PHP Templates + Tailwind

This isn't theoretical. This is the actual architecture from the Walt Opie project that reduced iteration costs.

### The Five-Layer Architecture

**1. theme.json - WordPress Design System**

Define colors, typography, spacing in WordPress's native format:

```json
{
  "$schema": "https://schemas.wp.org/wp/6.7/theme.json",
  "version": 3,
  "_documentation": {
    "purpose": "Walt Opie design system through WordPress theme.json",
    "designControl": "Typography, colors, spacing via WordPress native block system",
    "approach": "Manual block creation + AI-enhanced theme.json styling"
  },
  "settings": {
    "layout": {
      "contentSize": "100%",
      "wideSize": "100%"
    },
    "typography": {
      "fontFamilies": [
        {
          "fontFamily": "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          "name": "Manrope",
          "slug": "manrope"
        }
      ],
      "fontSizes": [
        {
          "size": "clamp(2.5rem, 5vw, 4rem)",
          "slug": "2xl",
          "name": "2X Large"
        }
      ]
    },
    "color": {
      "palette": [
        {
          "color": "#8B4513",
          "name": "Primary",
          "slug": "primary"
        },
        {
          "color": "#2E8B57",
          "name": "Secondary",
          "slug": "secondary"
        },
        {
          "color": "#DAA520",
          "name": "Accent",
          "slug": "accent"
        }
      ]
    },
    "spacing": {
      "spacingSizes": [
        {
          "size": "clamp(2rem, 4vw, 2.5rem)",
          "slug": "section-sm",
          "name": "Section Small"
        }
      ]
    }
  },
  "styles": {
    "elements": {
      "button": {
        "color": {
          "background": "var(--wp--preset--color--contrast)",
          "text": "var(--wp--preset--color--base)"
        },
        "border": {
          "radius": "9999px"
        }
      }
    }
  }
}
```

**Why this works:**
- Design tokens accessible to both WordPress and Tailwind
- WordPress admin uses the same colors/typography
- AI can reference `var(--wp--preset--color--primary)` predictably
- No CSS conflicts because tokens are shared

**2. PHP Templates (not .html block templates) with Tailwind**

This is the key difference from block themes:

```php
<?php
/**
 * page.php - Default Page Template
 * Used for About, Contact, and static pages
 */

get_header(); ?>

<div class="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">

    <?php while (have_posts()) : the_post(); ?>

    <!-- Hero Section with Walt's Photo -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
            <!-- Two-Column Grid: Walt Photo + Page Title -->
            <div class="grid md:grid-cols-[350px_1fr] gap-12 items-start">
                <!-- Left Column: Walt's Photo -->
                <div class="md:pl-8">
                    <?php echo walt_opie_profile_photo('left-column'); ?>
                </div>

                <!-- Right Column: Page Title -->
                <div class="text-left">
                    <h1 class="text-4xl md:text-6xl font-heading text-neutral-900 mb-6">
                        <?php the_title(); ?>
                    </h1>

                    <?php if (get_the_excerpt()) : ?>
                    <p class="text-xl text-neutral-600 leading-relaxed">
                        <?php the_excerpt(); ?>
                    </p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Page Content -->
    <section class="px-4 sm:px-6 lg:px-8 pb-20">
        <div class="max-w-4xl mx-auto">
            <div class="prose prose-lg prose-neutral max-w-none">
                <div class="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8 md:p-12">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
    </section>

    <?php endwhile; ?>

</div>

<?php get_footer(); ?>
```

**Why PHP templates instead of block templates:**
- No WordPress-generated container CSS conflicts
- Tailwind utilities work predictably
- AI can see the entire template structure
- No block CSS cache invalidation issues

**3. Scoped CSS for Component Polish**

Inside each PHP template, add scoped styles for fine-tuning:

```php
<style>
/* Enhanced prose styling for page content */
.prose {
    color: #374151;
    line-height: 1.75;
}

.prose h2 {
    font-size: 1.875rem;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    max-width: 640px !important;
}

.prose a {
    color: #8B4513;
    text-decoration: underline;
    text-decoration-color: #DAA520;
    text-underline-offset: 3px;
    transition: all 0.2s ease;
}

.prose a:hover {
    color: #2E8B57;
    text-decoration-color: #2E8B57;
}
</style>
```

**Why scoped styles:**
- Component-specific polish without global CSS pollution
- AI can see styles right next to markup
- Changes are localized and predictable
- No cascade debugging

**4. style.css for WordPress Layout Overrides**

Override WordPress's generated layout constraints:

```css
/*
Theme Name: Walt Opie Child Theme
Template: twentytwentyfive
*/

@import url("../twentytwentyfive/style.css");

/* Override WordPress layout constraints */
.is-layout-constrained > :where(:not(.alignleft):not(.alignright):not(.alignfull)) {
    max-width: 1400px;
}

/* WordPress container overrides */
.wp-block-group.is-layout-constrained[class*="wp-container-core-group-is-layout-"] > :where(:not(.alignleft):not(.alignright):not(.alignfull)) {
    max-width: 1400px;
}
```

**Why separate style.css:**
- Handles WordPress's cached layout CSS
- Higher CSS specificity without `!important`
- Global overrides in one place
- AI knows exactly what this file does

**5. Tailwind v4 via CDN**

```php
// functions.php
function walt_opie_enqueue_tailwind() {
    wp_enqueue_script('tailwindcss-cdn',
        'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
        array(), '4.0', false);
}
add_action('wp_enqueue_scripts', 'walt_opie_enqueue_tailwind');
```

**Why CDN:**
- No build step required
- Utilities available immediately
- Works with WordPress without configuration
- AI can use Tailwind classes directly

### How the Layers Work Together

**Design token flow:**
1. Define in `theme.json`: `"primary": "#8B4513"`
2. WordPress generates: `var(--wp--preset--color--primary)`
3. Use in Tailwind: `<button class="bg-[var(--wp--preset--color--primary)]">`
4. Use in scoped CSS: `color: var(--wp--preset--color--primary);`

**Template hierarchy:**
1. WordPress routes to `page.php`
2. PHP template renders with Tailwind classes
3. Scoped `<style>` block adds component polish
4. `style.css` overrides WordPress layout constraints
5. `theme.json` provides design tokens

**What AI can predict:**
- ✅ PHP template structure (sees entire file)
- ✅ Tailwind utility behavior (deterministic)
- ✅ Scoped styles (right next to markup)
- ✅ Design tokens (defined in theme.json)
- ✅ Layout overrides (all in style.css)

### Results from Walt Opie

**Before this architecture:**
- ~10 iterations per task
- Constant CSS conflicts
- Unpredictable block CSS generation
- Cache invalidation unclear

**After this architecture:**
- ~3-5 iterations per task
- No CSS conflicts
- Predictable styling
- Clear separation of concerns

**What changed:**
- AI can see the entire template structure
- Scoped styles eliminate cascade guessing
- Design tokens work consistently
- No WordPress block CSS to fight

## Optimization 3: REST API Over MCP

**Discovery:** WordPress MCP server was too fragile. Direct REST API via curl was more reliable.

### The MCP Server Problem

WordPress MCP server broke frequently:
- Version conflicts with WordPress updates
- Authentication issues
- Unpredictable failures
- Difficult to debug

### The REST API Solution

**Direct curl access to WordPress REST API:**
```bash
# Get posts
curl -X GET "https://site.com/wp-json/wp/v2/posts" \
  -H "Authorization: Bearer $WP_TOKEN"

# Create post
curl -X POST "https://site.com/wp-json/wp/v2/posts" \
  -H "Authorization: Bearer $WP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Post",
    "content": "Post content",
    "status": "publish"
  }'

# Update post
curl -X PUT "https://site.com/wp-json/wp/v2/posts/123" \
  -H "Authorization: Bearer $WP_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

### Why This Worked Better

**Advantages of REST API:**
- More predictable (standard HTTP)
- Easier to debug (curl commands are transparent)
- Works across WordPress versions
- No MCP server maintenance
- AI understands HTTP/curl natively

**AI can reason about:**
```bash
# AI knows exactly what this does
curl "https://site.com/wp-json/wp/v2/posts?per_page=10"
```

vs MCP abstraction:
```
# AI must trust MCP server implementation
wordpress.get_posts(limit=10)
```

### Results

**What this solved:**
- ✅ Eliminated MCP maintenance overhead
- ✅ More predictable behavior
- ✅ Easier debugging
- ✅ Works reliably across projects

**Standard operating procedure:** Always use REST API directly, not MCP server.

## Optimization 4: Operational Playbooks

**Discovery:** We had to document "what works" vs "what wastes effort" because WordPress behavior is non-deterministic.

### Docker Local vs Dev Server Decision Matrix

**When to use Docker locally:**
- Testing plugin interactions
- Database migrations
- Complex wp-cli operations
- Multi-environment testing

**When to use dev server:**
- Frontend development
- CSS/Tailwind iterations
- Template modifications
- Quick content updates

**The cost:** This decision doesn't exist in Astro. Having to think about it is overhead.

### CSS Specificity Patterns

**WordPress generates CSS like:**
```css
.wp-container-core-group-is-layout-XXXXX > :where(:not(.alignleft):not(.alignright):not(.alignfull)) {
    max-width: 800px;
    margin-left: auto !important;
    margin-right: auto !important;
}
```

**Override pattern (higher specificity, no !important):**
```css
.wp-block-group.is-layout-constrained[class*="wp-container-core-group-is-layout-"] > :where(:not(.alignleft):not(.alignright):not(.alignfull)) {
    max-width: 1400px;
}
```

**Why document this:** WordPress caching makes trial-and-error expensive. Playbook makes it one-shot.

### Component Patterns Library

**Reusable patterns we documented:**
- Hero sections with background containers
- Grid layouts with proper responsive padding
- Navigation with Alpine.js interaction
- WCAG-compliant color combinations

**Why this matters:** Reduces discovery time from "figure it out" to "reference the playbook."

### Results

**What this solved:**
- ✅ Reduced trial-and-error cycles
- ✅ Institutional knowledge captured
- ✅ Onboarding new projects faster
- ✅ Consistent patterns across sites

**The hidden cost:** Building playbooks is meta-work. Astro doesn't need them because the stack is simple enough to trust.

## The Honest Results

**Before optimizations:**
- Average task: ~10 AI iterations
- Constant debugging
- Unpredictable CSS behavior
- MCP server failures

**After optimizations:**
- Average task: ~3-5 AI iterations
- Systematic CSS overrides
- Predictable template structure
- Reliable REST API workflow

**Gap narrowed:** 10x → 3-5x (compared to Astro's 1-2x)

**But the gap never closed:** Even optimized WordPress still required more intervention than Astro because:
- Core still doesn't fit in context window (875K tokens)
- Database state still hidden from AI
- Plugin interactions still non-deterministic
- 7 abstraction layers still present

## When WordPress Is Still The Right Choice

**Despite the complexity, WordPress is the correct choice when:**

### 1. Client needs content management UI
Non-technical users need:
- Visual editor for content
- Media library management
- User role management
- Familiar WordPress admin interface

**You can't hand them:**
- Markdown files
- Git commands
- Code editor
- Terminal

### 2. Ecosystem plugins solve specific needs
WordPress plugins provide:
- Contact forms (Gravity Forms, WPForms)
- SEO management (Yoast, Rank Math)
- E-commerce (WooCommerce)
- Membership systems
- Event management

**Building these from scratch is expensive.**

### 3. Client wants ownership
WordPress gives clients:
- Independence from developer
- Ability to hire other WordPress developers
- Not locked into your architecture
- Portable content

**This is a business requirement, not technical.**

### 4. Budget requires templates/themes
WordPress ecosystem provides:
- Premium themes ($50-200)
- Ready-made functionality
- Faster initial delivery
- Lower upfront cost

**Custom Astro build takes longer to develop.**

## The Architecture Framework

**Use this decision framework:**

**Choose WordPress when:**
- Non-technical client needs admin UI
- Ecosystem plugins solve core requirements
- Client wants platform independence
- Budget requires faster initial delivery
- **Then:** Apply these optimizations to reduce AI iteration costs

**Choose Astro (or similar) when:**
- Technical team can handle content deployment
- Custom functionality required anyway
- Performance critical (static > dynamic)
- Security posture matters (zero attack surface)
- **Benefit:** AI can reason accurately, you stay in judgment mode

## The Key Insight

**WordPress optimizations worked.** We reduced iteration costs significantly. Made WordPress development with AI reasonably efficient.

**But there's a fundamental difference:**

**WordPress (optimized):**
- AI helps with implementation
- You still intervene frequently
- Focus splits: judgment + implementation

**Astro:**
- AI handles implementation
- You focus on judgment
- Design decisions, UX, visual polish

**The architectural choice determines where you spend your time.**

---

*Dean Keesey optimized WordPress for AI-assisted development across three client sites. The optimizations reduced iteration costs from 10→3-5 attempts. Security exposure eventually forced migration to headless WordPress + Astro frontend, revealing the gap between optimized complexity and native simplicity.*
