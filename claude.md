# CLAUDE.md - Megawaysonline.com Project

> This file provides context for AI assistants working on this codebase.

## Project Overview

**Megawaysonline.com** is a casino affiliate website focused on Megaways slots and related game mechanics. We're migrating from WordPress to Astro while preserving all existing URLs for SEO.

### Business Context

- **Primary focus**: Megaways slot reviews and casino recommendations
- **Target markets**: UK (primary), Australia, Canada, International
- **Revenue model**: Casino affiliate commissions
- **Competitors**: Casino.org, LCB.org, general slot review sites

### Migration Goals

1. Preserve all 100+ indexed URLs exactly (no redirects)
2. Improve page speed and Core Web Vitals
3. Implement E-E-A-T signals (author profiles, methodology, etc.)
4. Add new market sections (UK, Canada)
5. Modern, maintainable codebase

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.x | Static site framework |
| Tailwind CSS | 4.x | Styling |
| Alpine.js | 3.x | Lightweight interactivity |
| Svelte | 5.x | Complex interactive components |
| TypeScript | 5.x | Type safety |

### Key Packages

```json
{
  "dependencies": {
    "astro": "^5.0.0",
    "@astrojs/svelte": "^6.0.0",
    "@astrojs/tailwind": "^6.0.0",
    "@astrojs/sitemap": "^3.0.0",
    "svelte": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.0",
    "@tailwindcss/forms": "^0.5.0"
  }
}
```

---

## Directory Structure

```
megawaysonline/
├── public/                     # Static assets (not processed)
│   ├── images/
│   │   ├── casinos/           # Casino logos
│   │   ├── slots/             # Slot thumbnails
│   │   ├── providers/         # Provider logos
│   │   └── icons/             # UI icons
│   └── fonts/
│
├── src/
│   ├── components/
│   │   ├── common/            # Reusable UI components
│   │   ├── layout/            # Header, Footer, Navigation
│   │   ├── casino/            # Casino-specific components
│   │   ├── slots/             # Slot-specific components
│   │   ├── reviews/           # Review components (pros/cons, ratings)
│   │   └── seo/               # SEO components (Schema, meta)
│   │
│   ├── content/               # Markdown content (Astro Content Collections)
│   │   ├── slots/             # ALL slot reviews (flat structure)
│   │   ├── casinos/           # Casino reviews
│   │   ├── providers/         # Provider profiles
│   │   ├── mechanics/         # Megaways, Megaclusters, etc.
│   │   ├── authors/           # Author profiles (E-E-A-T)
│   │   └── config.ts          # Collection schemas
│   │
│   ├── data/                  # Static data (TypeScript)
│   │   ├── navigation.ts
│   │   └── payment-methods.ts
│   │
│   ├── layouts/               # Page layouts
│   │   ├── BaseLayout.astro
│   │   ├── PageLayout.astro
│   │   ├── SlotReviewLayout.astro
│   │   ├── CasinoReviewLayout.astro
│   │   └── ListLayout.astro
│   │
│   ├── pages/                 # Route pages
│   │   ├── index.astro
│   │   ├── online-slots/
│   │   │   ├── index.astro
│   │   │   ├── [slug]-review.astro    # ALL slot reviews
│   │   │   ├── btg/
│   │   │   │   └── index.astro
│   │   │   ├── red-tiger/
│   │   │   │   └── index.astro        # Archive only (reviews are flat)
│   │   │   └── ... (other providers)
│   │   ├── online-casinos/
│   │   │   ├── index.astro
│   │   │   ├── [slug]-casino-review.astro
│   │   │   ├── top-casinos/
│   │   │   │   └── index.astro
│   │   │   ├── crypto-casinos/
│   │   │   │   └── index.astro
│   │   │   ├── australian-casinos/
│   │   │   │   └── index.astro
│   │   │   ├── uk-casinos/
│   │   │   │   └── index.astro
│   │   │   └── canadian-casinos/
│   │   │       └── index.astro
│   │   ├── megaways/
│   │   │   └── index.astro
│   │   ├── megaclusters/
│   │   │   └── index.astro
│   │   └── ... (other mechanics)
│   │
│   ├── styles/                # Global CSS
│   └── utils/                 # Helper functions
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── claude.md                  # This file
```

---

## URL Structure (CRITICAL)

**Consistent, clean URL patterns.** We simplified the WordPress structure during migration for long-term maintainability.

### URL Patterns Summary

| Content Type | URL Pattern | Example |
|--------------|-------------|---------|
| Slot review | `/online-slots/[slug]-review/` | `/online-slots/bonanza-megaways-review/` |
| Casino review | `/online-casinos/[slug]-casino-review/` | `/online-casinos/bitstarz-casino-review/` |
| Provider archive | `/online-slots/[provider]/` | `/online-slots/red-tiger/` |
| Casino category | `/online-casinos/[category]/` | `/online-casinos/uk-casinos/` |
| Mechanics hub | `/[mechanic]/` | `/megaways/` |

### Slot Reviews (ALL Slots)

```
Pattern: /online-slots/[slug]-review/
Example: /online-slots/bonanza-megaways-review/
File:    src/pages/online-slots/[slug]-review.astro
Content: src/content/slots/bonanza-megaways.md (slug: "bonanza-megaways")
```

All slots use the same flat structure, regardless of provider. Red Tiger slots are NOT nested.

### Casino Reviews

```
Pattern: /online-casinos/[slug]-casino-review/
Example: /online-casinos/bitstarz-casino-review/
File:    src/pages/online-casinos/[slug]-casino-review.astro
Content: src/content/casinos/bitstarz.md (slug: "bitstarz")
```

Note: Shortened from `-online-casino-review` to `-casino-review` for cleaner URLs.

### Provider Archives

```
Pattern: /online-slots/[provider]/
Example: /online-slots/btg/
File:    src/pages/online-slots/[provider]/index.astro
```

Providers with archive pages:

- btg, blueprint, pragmatic-play, red-tiger, netent, microgaming
- iron-dog, scientific-games, reelplay, relax, stakelogic, isoftbet, poggiplay

### Casino Categories

```
/online-casinos/top-casinos/
/online-casinos/crypto-casinos/
/online-casinos/australian-casinos/
/online-casinos/uk-casinos/
/online-casinos/canadian-casinos/
```

### Mechanics Hubs

```
/megaways/
/megaclusters/
/megapays/
/megaquads/
/megadrop/
/xtraways/
```

### Trailing Slashes

**Always use trailing slashes.** Configure in astro.config.mjs:

```javascript
export default defineConfig({
  trailingSlash: 'always',
});
```

---

## 301 Redirects (WordPress Migration)

These redirects handle the URL structure changes from WordPress. Configure in `astro.config.mjs`.

### Red Tiger Slots → Flat Structure (6 redirects)

```
/online-slots/red-tiger/dragons-fire-megaways-review/    → /online-slots/dragons-fire-megaways-review/
/online-slots/red-tiger/pirates-plenty-megaways-review/  → /online-slots/pirates-plenty-megaways-review/
/online-slots/red-tiger/big-cat-rescue-megaways-review/  → /online-slots/big-cat-rescue-megaways-review/
/online-slots/red-tiger/nft-megaways-review/             → /online-slots/nft-megaways-review/
/online-slots/red-tiger/dragons-luck-megaways-review/    → /online-slots/dragons-luck-megaways-review/
/online-slots/red-tiger/primate-king-megaways/           → /online-slots/primate-king-megaways-review/
```

### Casino Reviews → Shorter URLs (6 redirects)

```
/online-casinos/bitstarz-online-casino-review/   → /online-casinos/bitstarz-casino-review/
/online-casinos/fastpay-online-casino-review/    → /online-casinos/fastpay-casino-review/
/online-casinos/casitsu-online-casino-review/    → /online-casinos/casitsu-casino-review/
/online-casinos/bitdreams-online-casino-review/  → /online-casinos/bitdreams-casino-review/
/online-casinos/woo-online-casino-review/        → /online-casinos/woo-casino-review/
/online-casinos/blueleo-online-casino-review/    → /online-casinos/blueleo-casino-review/
```

### Astro Config Implementation

```javascript
// astro.config.mjs
export default defineConfig({
  trailingSlash: 'always',
  redirects: {
    // Red Tiger slots → flat structure
    '/online-slots/red-tiger/dragons-fire-megaways-review/': '/online-slots/dragons-fire-megaways-review/',
    '/online-slots/red-tiger/pirates-plenty-megaways-review/': '/online-slots/pirates-plenty-megaways-review/',
    '/online-slots/red-tiger/big-cat-rescue-megaways-review/': '/online-slots/big-cat-rescue-megaways-review/',
    '/online-slots/red-tiger/nft-megaways-review/': '/online-slots/nft-megaways-review/',
    '/online-slots/red-tiger/dragons-luck-megaways-review/': '/online-slots/dragons-luck-megaways-review/',
    '/online-slots/red-tiger/primate-king-megaways/': '/online-slots/primate-king-megaways-review/',
    
    // Casino reviews → shorter URLs
    '/online-casinos/bitstarz-online-casino-review/': '/online-casinos/bitstarz-casino-review/',
    '/online-casinos/fastpay-online-casino-review/': '/online-casinos/fastpay-casino-review/',
    '/online-casinos/casitsu-online-casino-review/': '/online-casinos/casitsu-casino-review/',
    '/online-casinos/bitdreams-online-casino-review/': '/online-casinos/bitdreams-casino-review/',
    '/online-casinos/woo-online-casino-review/': '/online-casinos/woo-casino-review/',
    '/online-casinos/blueleo-online-casino-review/': '/online-casinos/blueleo-casino-review/',
  },
});
```

---

## Content Collections

All content uses Astro Content Collections with TypeScript schemas.

### Slot Schema

```typescript
// src/content/config.ts
import { defineCollection, reference, z } from 'astro:content';

const slots = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),              // URL slug → /online-slots/[slug]-review/
    thumbnail: z.string(),
    provider: z.string(),          // Provider slug for filtering (btg, red-tiger, etc.)
    
    // Stats
    rtp: z.number(),               // e.g., 96.5
    volatility: z.enum(['low', 'medium', 'medium-high', 'high', 'very-high']),
    maxWin: z.string(),            // e.g., "50,000x"
    maxWays: z.number(),           // e.g., 117649
    
    // Mechanics
    mechanics: z.array(z.string()), // ['megaways', 'cascading', 'bonus-buy']
    
    // Grid
    reels: z.number(),
    rows: z.string(),              // e.g., "2-7" for variable
    
    // Betting
    minBet: z.number(),
    maxBet: z.number(),
    
    // Features
    features: z.array(z.string()),
    bonusBuy: z.boolean(),
    
    // Theme
    theme: z.array(z.string()),
    
    // Rating & review
    rating: z.number(),            // 0-5
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    
    // SEO
    title: z.string().optional(),
    description: z.string().optional(),
    
    // E-E-A-T
    author: reference('authors'),
    publishedDate: z.date(),
    updatedDate: z.date(),
  }),
});
```

### Casino Schema

```typescript
const casinos = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),              // URL slug → /online-casinos/[slug]-casino-review/
    logo: z.string(),
    
    rating: z.number(),
    
    welcomeBonus: z.object({
      title: z.string(),
      amount: z.string(),
      freeSpins: z.number().optional(),
      wageringRequirement: z.number().optional(),
      minDeposit: z.number().optional(),
    }),
    
    // Markets
    markets: z.array(z.enum(['uk', 'australia', 'canada', 'europe', 'usa', 'crypto', 'international'])),
    licenses: z.array(z.string()),
    
    // Payments
    paymentMethods: z.array(z.string()),
    cryptoAccepted: z.boolean(),
    
    // Games
    providers: z.array(z.string()),
    hasMegaways: z.boolean(),
    
    // Links
    affiliateLink: z.string().url(),
    
    // Review
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    
    // Flags
    featured: z.boolean(),
    isNew: z.boolean(),
    
    // E-E-A-T
    author: reference('authors'),
    publishedDate: z.date(),
    updatedDate: z.date(),
  }),
});
```

### Authors Schema (E-E-A-T)

```typescript
const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    avatar: z.string(),
    role: z.string(),
    expertise: z.array(z.string()),
    yearsExperience: z.number(),
    bio: z.string(),
    shortBio: z.string(),
    socials: z.object({
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
    }).optional(),
  }),
});
```

### Providers Schema

```typescript
const providers = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    logo: z.string(),
    founded: z.number().optional(),
    headquarters: z.string().optional(),
    description: z.string(),
    notableGames: z.array(z.string()),
  }),
});
```

### Export Collections

```typescript
// src/content/config.ts
export const collections = {
  slots,
  casinos,
  authors,
  providers,
};
```

---

## Component Conventions

### File Naming

- **Astro components**: `PascalCase.astro` (e.g., `CasinoCard.astro`)
- **Svelte components**: `PascalCase.svelte` (e.g., `MobileMenu.svelte`)
- **Utility files**: `camelCase.ts` (e.g., `helpers.ts`)
- **Content files**: `kebab-case.md` (e.g., `bonanza-megaways.md`)

### Component Structure

```astro
---
// 1. Imports
import Rating from '../common/Rating.astro';

// 2. Props interface
interface Props {
  name: string;
  rating: number;
  featured?: boolean;
}

// 3. Destructure props with defaults
const { name, rating, featured = false } = Astro.props;

// 4. Any logic/data fetching
const formattedRating = rating.toFixed(1);
---

<!-- 5. Template -->
<article class="casino-card">
  <h3>{name}</h3>
  <Rating score={rating} />
</article>

<!-- 6. Scoped styles (if needed) -->
<style>
  /* Component-specific styles */
</style>
```

### When to Use Svelte vs Astro

| Use Astro (.astro) | Use Svelte (.svelte) |
|--------------------|----------------------|
| Static content | Interactive UI |
| Server-rendered | Client-side state |
| SEO-critical content | Filters, search |
| Cards, lists, layouts | Mobile menus, modals |
| 90% of components | 10% of components |

---

## Styling Guidelines

### Tailwind Classes

Use Tailwind utility classes directly. Avoid creating custom CSS unless necessary.

```astro
<!-- Good -->
<div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5">

<!-- Avoid -->
<div class="casino-card-wrapper">
```

### Color Palette

```javascript
// tailwind.config.mjs
colors: {
  primary: {
    50: '#f0f9ff',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
  },
  // Use primary for CTAs and links
}
```

### Dark Mode

Support dark mode using Tailwind's `dark:` prefix:

```astro
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
```

### Responsive Design

Mobile-first approach. Use Tailwind breakpoints:

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Typography

Use `@tailwindcss/typography` for prose content:

```astro
<article class="prose prose-lg dark:prose-invert max-w-none">
  <Content />
</article>
```

---

## SEO Requirements

### Every Page Must Have

1. **Unique title tag** (50-60 chars)
2. **Meta description** (150-160 chars)
3. **Canonical URL**
4. **Open Graph tags**
5. **Schema.org markup**

### Schema Types by Page

| Page Type | Schema |
|-----------|--------|
| Slot review | `Review`, `VideoGame` |
| Casino review | `Review`, `Organization` |
| Provider page | `Organization` |
| Listing page | `ItemList` |
| Author page | `Person` |

### SEOHead Component Usage

```astro
---
import SEOHead from '../components/seo/SEOHead.astro';
---

<SEOHead
  title="Bonanza Megaways Review 2026 | RTP, Features & Where to Play"
  description="Read our expert Bonanza Megaways review. RTP 96%, max win 12,000x, 117,649 ways to win. Play at top UK casinos."
  canonical={Astro.url.href}
  type="article"
  image="/images/slots/bonanza-megaways.jpg"
/>
```

---

## E-E-A-T Implementation

### Author Attribution

Every review must have:

1. **Author byline** with link to profile
2. **Author photo**
3. **Last updated date**
4. **Author schema markup**

```astro
<AuthorCard 
  author={frontmatter.author}
  publishedDate={frontmatter.publishedDate}
  updatedDate={frontmatter.updatedDate}
/>
```

### Required Pages for E-E-A-T

- `/about/` - About the site
- `/about/team/` - Team/author profiles
- `/about/methodology/` - How we review casinos/slots
- `/responsible-gambling/` - Responsible gambling resources

### Author Profile Content

Each author in `src/content/authors/` needs:

```markdown
---
name: "Your Name"
slug: "your-name"
avatar: "/images/authors/your-name.jpg"
role: "Slots Expert & Lead Reviewer"
expertise: ["Megaways slots", "Bonus features", "RTP analysis"]
yearsExperience: 8
bio: "Full bio with credentials, experience, and expertise..."
shortBio: "Brief one-liner for bylines"
socials:
  linkedin: "https://linkedin.com/in/..."
---
```

---

## Affiliate Links

### Rules

1. **Always use `rel="noopener noreferrer nofollow"`** on affiliate links
2. **Always open in new tab** (`target="_blank"`)
3. **Use internal redirect URLs** (e.g., `/go/bitstarz/`) for tracking
4. **Include disclaimer** near affiliate links

### Example

```astro
<a 
  href="/go/bitstarz/"
  target="_blank"
  rel="noopener noreferrer nofollow"
  class="btn-primary"
>
  Visit Casino
</a>
<p class="text-xs text-gray-500 mt-2">
  18+. T&Cs apply. Gamble responsibly.
</p>
```

---

## Performance Guidelines

### Images

- Use WebP format
- Provide width/height to prevent layout shift
- Use `loading="lazy"` for below-fold images
- Use Astro's `<Image />` component when possible

```astro
<img 
  src="/images/slots/bonanza.webp"
  alt="Bonanza Megaways slot"
  width="400"
  height="300"
  loading="lazy"
  decoding="async"
/>
```

### Code Splitting

- Keep Svelte components small and focused
- Use dynamic imports for heavy components
- Avoid large client-side bundles

---

## Testing Checklist

Before deploying, verify:

- [ ] All existing URLs return 200 (no unintended 404s)
- [ ] All 12 redirects work correctly (6 Red Tiger + 6 casinos)
- [ ] Trailing slashes work correctly
- [ ] Mobile responsive on all pages
- [ ] Dark mode works
- [ ] All affiliate links work
- [ ] Schema markup validates (Google Rich Results Test)
- [ ] Core Web Vitals pass (PageSpeed Insights)
- [ ] Sitemap generates correctly
- [ ] robots.txt is correct

### Redirect Verification Script

```bash
# Test all redirects return 301 and point to correct destinations
curl -I https://megawaysonline.com/online-slots/red-tiger/dragons-fire-megaways-review/
# Should return: 301 → /online-slots/dragons-fire-megaways-review/

curl -I https://megawaysonline.com/online-casinos/bitstarz-online-casino-review/
# Should return: 301 → /online-casinos/bitstarz-casino-review/
```

---

## Common Tasks

### Adding a New Slot Review

1. Create `src/content/slots/[slug].md`
2. Add frontmatter with all required fields
3. Write review content
4. Add thumbnail image to `public/images/slots/`
5. Test URL: `/online-slots/[slug]-review/`

**Example frontmatter:**

```yaml
---
name: "Bonanza Megaways"
slug: "bonanza-megaways"
thumbnail: "/images/slots/bonanza-megaways.webp"
provider: "btg"
rtp: 96.0
volatility: "high"
maxWin: "12,000x"
maxWays: 117649
mechanics: ["megaways", "cascading", "free-spins"]
reels: 6
rows: "2-7"
minBet: 0.20
maxBet: 20
features: ["Cascading Reels", "Free Spins", "Multipliers"]
bonusBuy: false
theme: ["mining", "gems"]
rating: 4.5
pros:
  - "Up to 117,649 ways to win"
  - "Unlimited multipliers in free spins"
cons:
  - "No bonus buy option"
author: "author-slug"
publishedDate: 2024-01-15
updatedDate: 2025-01-07
---
```

### Adding a New Casino

1. Create `src/content/casinos/[slug].md`
2. Add frontmatter with all required fields
3. Write review content
4. Add logo to `public/images/casinos/`
5. Test URL: `/online-casinos/[slug]-casino-review/`

**Example frontmatter:**

```yaml
---
name: "BitStarz Casino"
slug: "bitstarz"
logo: "/images/casinos/bitstarz.webp"
rating: 4.5
welcomeBonus:
  title: "Welcome Package"
  amount: "5 BTC + 200 Free Spins"
  freeSpins: 200
  wageringRequirement: 40
  minDeposit: 20
markets: ["crypto", "international"]
licenses: ["Curacao"]
paymentMethods: ["bitcoin", "ethereum", "visa", "mastercard"]
cryptoAccepted: true
providers: ["btg", "pragmatic-play", "netent"]
hasMegaways: true
affiliateLink: "https://example.com/go/bitstarz"
pros:
  - "Instant crypto withdrawals"
  - "Huge selection of Megaways slots"
cons:
  - "Not licensed in UK"
featured: true
isNew: false
author: "author-slug"
publishedDate: 2024-02-01
updatedDate: 2025-01-07
---
```

### Adding a New Author (E-E-A-T)

1. Create `src/content/authors/[slug].md`
2. Add author photo to `public/images/authors/`
3. Link author to reviews via `author` field in frontmatter

**Example frontmatter:**

```yaml
---
name: "Your Name"
slug: "your-name"
avatar: "/images/authors/your-name.webp"
role: "Slots Expert & Lead Reviewer"
expertise: ["Megaways slots", "Bonus features", "RTP analysis"]
yearsExperience: 8
bio: "Full bio with credentials, experience, and expertise..."
shortBio: "Brief one-liner for bylines"
socials:
  linkedin: "https://linkedin.com/in/yourname"
---
```

### Adding a New Provider Archive

1. Create `src/pages/online-slots/[provider]/index.astro`
2. Add provider to `src/content/providers/[provider].md`
3. Add logo to `public/images/providers/`

---

## Migration Notes

### From WordPress

- Export content via WP REST API or manual copy
- Convert HTML to Markdown
- Map WordPress slugs to content file slugs
- **Note:** URL structure has been simplified (see 301 Redirects section)
- Download and organize all images
- Verify all 12 redirects work before going live

### URL Structure Changes (WordPress → Astro)

| Old Pattern | New Pattern | Affected Pages |
|-------------|-------------|----------------|
| `/online-slots/red-tiger/[slug]/` | `/online-slots/[slug]-review/` | 6 Red Tiger slots |
| `/online-casinos/[slug]-online-casino-review/` | `/online-casinos/[slug]-casino-review/` | 6 casinos |

All other URLs (65 slot reviews, provider archives, mechanics hubs, casino categories) remain unchanged.

### From aussieonlinecasino.com

- Australian casino content goes to `/online-casinos/australian-casinos/`
- Merge relevant slot content if not duplicated
- Set up 301 redirects from old domain to new paths
- Preserve any valuable backlinks

---

## Contact & Resources

- **Repository**: [Your repo URL]
- **Staging URL**: [Your staging URL]
- **Production URL**: <https://megawaysonline.com>
- **GSC**: Google Search Console access
- **Analytics**: [Your analytics platform]

---

## Quick Reference

### Astro Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

### Route Files

| Route | File |
|-------|------|
| `/online-slots/[slug]-review/` | `src/pages/online-slots/[slug]-review.astro` |
| `/online-casinos/[slug]-casino-review/` | `src/pages/online-casinos/[slug]-casino-review.astro` |
| `/online-slots/btg/` | `src/pages/online-slots/btg/index.astro` |
| `/megaways/` | `src/pages/megaways/index.astro` |

### Content Collection Queries

```astro
---
import { getCollection, getEntry } from 'astro:content';

// Get all slots
const allSlots = await getCollection('slots');

// Get slots by provider
const btgSlots = await getCollection('slots', ({ data }) => {
  return data.provider === 'btg';
});

// Get Red Tiger slots (now in main slots collection)
const redTigerSlots = await getCollection('slots', ({ data }) => {
  return data.provider === 'red-tiger';
});

// Get single entry
const slot = await getEntry('slots', 'bonanza-megaways');

// Get all casinos
const allCasinos = await getCollection('casinos');

// Get UK casinos
const ukCasinos = await getCollection('casinos', ({ data }) => {
  return data.markets.includes('uk');
});

// Get featured casinos
const featuredCasinos = await getCollection('casinos', ({ data }) => {
  return data.featured === true;
});
---
```

### Dynamic Route Example (Slots)

```astro
---
// src/pages/online-slots/[slug]-review.astro
import { getCollection } from 'astro:content';
import SlotReviewLayout from '../../layouts/SlotReviewLayout.astro';

export async function getStaticPaths() {
  const slots = await getCollection('slots');
  
  return slots.map(slot => ({
    params: { slug: slot.data.slug },
    props: { slot }
  }));
}

const { slot } = Astro.props;
const { Content } = await slot.render();
---

<SlotReviewLayout slot={slot}>
  <Content />
</SlotReviewLayout>
```

### Dynamic Route Example (Casinos)

```astro
---
// src/pages/online-casinos/[slug]-casino-review.astro
import { getCollection } from 'astro:content';
import CasinoReviewLayout from '../../layouts/CasinoReviewLayout.astro';

export async function getStaticPaths() {
  const casinos = await getCollection('casinos');
  
  return casinos.map(casino => ({
    params: { slug: casino.data.slug },
    props: { casino }
  }));
}

const { casino } = Astro.props;
const { Content } = await casino.render();
---

<CasinoReviewLayout casino={casino}>
  <Content />
</CasinoReviewLayout>
```

### Formatting Helpers

```typescript
// src/utils/helpers.ts

// Format rating as stars
export function formatRating(rating: number): string {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

// Format date for display
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Format large numbers
export function formatNumber(num: number): string {
  return num.toLocaleString('en-GB');
}

// Generate slot URL from slug
export function getSlotUrl(slug: string): string {
  return `/online-slots/${slug}-review/`;
}

// Generate casino URL from slug
export function getCasinoUrl(slug: string): string {
  return `/online-casinos/${slug}-casino-review/`;
}
```
