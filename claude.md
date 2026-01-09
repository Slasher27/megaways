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
    "astro-icon": "^1.0.0",
    "@iconify-json/lucide": "^1.0.0",
    "@iconify-json/mdi": "^1.0.0",
    "@iconify-json/ph": "^1.0.0",
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
│   │   ├── ui/                # Low-level UI primitives (buttons, badges, etc.)
│   │   ├── typography/        # Text components (H1-H6, P)
│   │   ├── layout/            # Page structure (Header, Footer, Container, etc.)
│   │   ├── casino/            # Casino-specific domain components
│   │   ├── slots/             # Slot-specific domain components
│   │   ├── reviews/           # Shared review components (ratings, pros/cons)
│   │   ├── seo/               # SEO & schema components
│   │   └── interactive/       # Client-side Svelte components
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

## Component Architecture

Components are organized by purpose and domain. This structure separates concerns and makes the codebase maintainable.

### Folder Overview

| Folder | Purpose | File Type |
|--------|---------|-----------|
| `ui/` | Low-level UI primitives (buttons, badges, cards) | `.astro` |
| `typography/` | Text components (headings, paragraphs) | `.astro` |
| `layout/` | Page structure components | `.astro` |
| `casino/` | Casino-specific domain components | `.astro` |
| `slots/` | Slot-specific domain components | `.astro` |
| `reviews/` | Shared review/rating components | `.astro` |
| `seo/` | SEO & schema markup | `.astro` |
| `interactive/` | Client-side components with state | `.svelte` |

### Component Inventory

#### `ui/` — Design System Primitives

Generic, reusable building blocks with no domain knowledge.

```
ui/
├── Button.astro          # Variants: primary, secondary, ghost, danger
│                         # Props: variant, size (sm/md/lg), href, external,
│                         #        affiliate (auto-adds nofollow), disabled
│                         # Supports both <button> and <a> tags
│                         # Includes focus states, dark mode, cursor pointer
├── Badge.astro           # Labels (NEW, HOT, etc.)
│                         # Variants: primary, secondary, success, warning, danger, info
│                         # Sizes: sm, md, lg
├── Card.astro            # Generic card wrapper
│                         # Variants: default, outlined, elevated
│                         # Padding options, hover effects
├── Icon.astro            # Icon wrapper using astro-icon
│                         # Props: name (icon name), size (number or string)
│                         # Supports any icon from iconify icon sets
├── Image.astro           # Optimized image with lazy loading
│                         # SVG fallback with alt text when image fails
│                         # Props: src, alt, width, height, loading, rounded, objectFit
├── Link.astro            # Styled anchor with external handling
│                         # Variants: default, primary, muted
│                         # Auto-adds target="_blank" and rel for external links
├── Divider.astro         # Horizontal rule with optional text
│                         # Variants: solid, dashed, dotted
│                         # Spacing options: sm, md, lg
├── Skeleton.astro        # Loading placeholder with pulse animation
│                         # Variants: text, circular, rectangular
├── Logo.astro            # Site logo (light/dark variants) [TODO]
└── Tooltip.astro         # Hover tooltip [TODO]
```

#### `typography/` — Text Components

Typography components for consistent text styling across the site.

```
typography/
├── H1.astro              # Main page headings
├── H2.astro              # Section headings
├── H3.astro              # Subsection headings
├── H4.astro              # Minor headings
├── H5.astro              # Small headings
├── H6.astro              # Smallest headings
└── P.astro               # Paragraph with variants (body, lead, small)
```

**All heading components (H1-H6) include:**
- Size variants: `sm`, `md` (default), `lg`, `xl`
- Responsive scaling (e.g., `text-3xl md:text-4xl` for H1 md size)
- Dark mode support (`text-gray-900 dark:text-white`)
- Consistent bottom margins (H1: mb-8, H2: mb-6, H3: mb-4, etc.)
- Custom class support via `class` prop
- Font weight: H1-H3 use `font-bold`, H4-H6 use `font-semibold`

**Paragraph component (P) includes:**
- Size variants: `sm`, `md`, `lg`, `xl`
- Style variants:
  - `body` (default): Regular paragraph with mb-4
  - `lead`: Larger intro text with font-medium
  - `small`: Smaller descriptive text
- Dark mode: `text-gray-700 dark:text-gray-300`
- Custom class support

**Usage:**
```astro
<H1 size="lg">Page Title</H1>
<P variant="lead">Introduction paragraph</P>
<H2>Section Heading</H2>
<P>Regular body text</P>
```

#### `layout/` — Page Structure

Components that define page structure. Used in layouts and pages.

```
layout/
├── Header.astro          # Site header with nav
├── Footer.astro          # Site footer
├── Navigation.astro      # Main nav menu
├── Sidebar.astro         # Sidebar wrapper
├── Container.astro       # Max-width content wrapper with dark mode
│                         # Props: size (sm/md/lg/full), padding (none/sm/md/lg)
│                         # Includes bg-white/dark:bg-gray-900
├── Section.astro         # Page section with spacing
├── Breadcrumbs.astro     # Breadcrumb navigation
└── TableOfContents.astro # Review TOC sidebar
```

#### `casino/` — Casino Domain Components

Components specific to casino content. Know about casino data structure.

```
casino/
├── CasinoCard.astro        # Casino listing card
├── CasinoCardCompact.astro # Smaller card for sidebars
├── CasinoTable.astro       # Comparison table
├── CasinoHero.astro        # Casino review header
├── BonusDisplay.astro      # Welcome bonus callout
├── LicenseBadges.astro     # UKGC, MGA, Curacao badges
├── PaymentMethods.astro    # Payment icons grid
├── CasinoCtaBox.astro      # CTA box with affiliate link
└── MarketBadge.astro       # UK, AU, CA market indicator
```

#### `slots/` — Slot Domain Components

Components specific to slot content. Know about slot data structure.

```
slots/
├── SlotCard.astro          # Slot listing card
├── SlotCardCompact.astro   # Smaller card for sidebars
├── SlotHero.astro          # Slot review header
├── SlotStats.astro         # RTP, volatility, max win grid
├── SlotGrid.astro          # Reels × rows display
├── MechanicsBadges.astro   # Megaways, Cascading, etc.
├── ProviderLogo.astro      # Provider attribution
├── FeaturesList.astro      # Slot features list
├── VolatilityMeter.astro   # Visual volatility indicator
├── MaxWinDisplay.astro     # Prominent max win callout
└── WhereToPlay.astro       # Casinos with this slot
```

#### `reviews/` — Shared Review Components

Used by both casino and slot reviews. Domain-agnostic rating/review UI.

```
reviews/
├── Rating.astro          # Star rating display
├── ProsCons.astro        # Pros/cons list
├── AuthorCard.astro      # Author byline with photo
├── AuthorBox.astro       # Full author bio box
├── ReviewScore.astro     # Large score display
├── ReviewMeta.astro      # Published/updated dates
├── Verdict.astro         # Final verdict callout
└── Disclaimer.astro      # Affiliate/gambling disclaimer
```

#### `seo/` — SEO & Schema Components

Astro-only components for meta tags and structured data.

```
seo/
├── SEOHead.astro           # Meta tags, OG, Twitter
├── SchemaOrg.astro         # JSON-LD wrapper
├── SlotSchema.astro        # Slot review schema
├── CasinoSchema.astro      # Casino review schema
├── AuthorSchema.astro      # Person schema
├── BreadcrumbSchema.astro  # Breadcrumb schema
└── FAQSchema.astro         # FAQ schema
```

#### `interactive/` — Svelte Components

Client-side components that need JavaScript. All `.svelte` files.

```
interactive/
├── MobileMenu.svelte     # Mobile navigation drawer
├── SearchModal.svelte    # Site search overlay
├── SlotFilter.svelte     # Filter slots by provider, mechanic
├── CasinoFilter.svelte   # Filter casinos by market, payment
├── SortDropdown.svelte   # Sort results dropdown
├── CompareDrawer.svelte  # Compare casinos side-by-side
├── CopyButton.svelte     # Copy bonus code
├── ThemeToggle.svelte    # Dark/light mode switch
├── ScrollToTop.svelte    # Scroll to top button
├── Accordion.svelte      # Expandable FAQ sections
├── Tabs.svelte           # Tabbed content
└── Carousel.svelte       # Image/card carousel
```

### Component Decision Guide

| Question | Folder |
|----------|--------|
| Is it a text/heading component? | `typography/` |
| Is it a basic UI element (button, badge, card)? | `ui/` |
| Does it define page structure? | `layout/` |
| Is it casino-specific? | `casino/` |
| Is it slot-specific? | `slots/` |
| Is it used by both casino AND slot reviews? | `reviews/` |
| Is it for meta tags or schema markup? | `seo/` |
| Does it need client-side JavaScript/state? | `interactive/` |

### Import Path Aliases

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  }
}
```

### Import Examples

```astro
---
// Typography
import H1 from '@components/typography/H1.astro';
import H2 from '@components/typography/H2.astro';
import P from '@components/typography/P.astro';

// UI primitives
import Button from '@components/ui/Button.astro';
import Badge from '@components/ui/Badge.astro';
import Icon from '@components/ui/Icon.astro';

// Layout
import Header from '@components/layout/Header.astro';
import Container from '@components/layout/Container.astro';

// Domain components
import CasinoCard from '@components/casino/CasinoCard.astro';
import SlotStats from '@components/slots/SlotStats.astro';

// Reviews
import Rating from '@components/reviews/Rating.astro';
import ProsCons from '@components/reviews/ProsCons.astro';

// SEO
import SEOHead from '@components/seo/SEOHead.astro';

// Interactive (need client directive)
import SlotFilter from '@components/interactive/SlotFilter.svelte';
---

<!-- Typography usage -->
<H1 size="lg">Page Title</H1>
<P variant="lead">Introduction paragraph</P>

<!-- Button variants -->
<Button variant="primary">Primary CTA</Button>
<Button href="/go/casino/" affiliate>Visit Casino</Button>

<!-- Icon usage (uses iconify icon sets) -->
<Icon name="lucide:heart" size={24} />
<Icon name="mdi:home" size="32px" class="text-primary-600" />

<!-- Svelte components need client directive -->
<SlotFilter client:load providers={providers} slots={slots} />
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
import Rating from '@components/reviews/Rating.astro';

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

### Color Palette & Tailwind CSS 4.x Configuration

**Tailwind CSS 4.x uses CSS-based configuration** instead of JavaScript config files.

Define custom colors using the `@theme` directive in `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  /* Primary Brand Colors (Sky Blue) */
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  --color-primary-200: #bae6fd;
  --color-primary-300: #7dd3fc;
  --color-primary-400: #38bdf8;
  --color-primary-500: #0ea5e9;   /* Main brand color */
  --color-primary-600: #0284c7;   /* Buttons, CTAs */
  --color-primary-700: #0369a1;   /* Hover states */
  --color-primary-800: #075985;
  --color-primary-900: #0c4a6e;
  --color-primary-950: #082f49;
}
```

**Usage in components:**
```astro
<!-- Buttons and CTAs use primary-600 -->
<Button variant="primary">Uses primary-600</Button>

<!-- Text -->
<p class="text-primary-600">Brand colored text</p>

<!-- Backgrounds -->
<div class="bg-primary-50 dark:bg-primary-950">Light background</div>

<!-- Borders -->
<div class="border-2 border-primary-600">Brand border</div>
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

## Icon System

### astro-icon Package

We use **astro-icon** for consistent, tree-shakeable icon support across the site. This package provides access to the entire [Iconify](https://icon-sets.iconify.design/) library with 200,000+ icons from popular icon sets.

### Installation

```bash
npm install astro-icon

# Install icon sets you want to use
npm install @iconify-json/lucide @iconify-json/mdi @iconify-json/ph
```

Add the integration to `astro.config.mjs`:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

export default defineConfig({
  integrations: [icon()],
  // ... other config
});
```

### Icon Component

We've created a wrapper component at `src/components/ui/Icon.astro` that simplifies icon usage:

```astro
---
import Icon from '@components/ui/Icon.astro';
---

<!-- Basic usage -->
<Icon name="lucide:heart" size={24} />

<!-- With custom size and classes -->
<Icon name="mdi:home" size="32px" class="text-primary-600" />

<!-- Different icon sets -->
<Icon name="lucide:star" size={20} />           <!-- Lucide icons -->
<Icon name="mdi:casino" size={24} />            <!-- Material Design Icons -->
<Icon name="ph:coin" size={28} />               <!-- Phosphor icons -->
<Icon name="heroicons:arrow-right" size={20} /> <!-- Heroicons -->
```

### Available Icon Sets

Popular icon sets available through Iconify:

| Icon Set | Prefix | Count | Use Case |
|----------|--------|-------|----------|
| Lucide | `lucide:` | 1,500+ | Modern, consistent UI icons |
| Material Design Icons | `mdi:` | 7,000+ | Comprehensive icon coverage |
| Heroicons | `heroicons:` | 600+ | Tailwind-designed icons |
| Phosphor | `ph:` | 9,000+ | Flexible, consistent style |
| Font Awesome | `fa:` | 2,000+ | Popular icon library |

**Browse all icons**: https://icon-sets.iconify.design/

### Usage Guidelines

1. **Stick to one icon set** for consistency (recommend Lucide for modern UI)
2. **Use semantic names** - choose icons that clearly represent their function
3. **Consistent sizing** - use standard sizes: 16px (small), 20px (default), 24px (medium), 32px (large)
4. **Color via classes** - apply Tailwind color classes directly to Icon component
5. **Accessibility** - provide `title` prop for important icons

### Examples

```astro
---
import Icon from '@components/ui/Icon.astro';
---

<!-- Navigation icons -->
<a href="/">
  <Icon name="lucide:home" size={20} class="text-gray-600 dark:text-gray-400" />
  Home
</a>

<!-- Button with icon -->
<Button>
  <Icon name="lucide:arrow-right" size={16} class="inline-block" />
  Continue
</Button>

<!-- Rating stars -->
<div class="flex gap-1">
  <Icon name="lucide:star" size={16} class="text-yellow-500" />
  <Icon name="lucide:star" size={16} class="text-yellow-500" />
  <Icon name="lucide:star" size={16} class="text-yellow-500" />
</div>

<!-- Casino/slot specific -->
<Icon name="mdi:casino" size={24} class="text-primary-600" />
<Icon name="ph:coin" size={28} class="text-yellow-600" />
```

### Performance Notes

- **Tree-shaking**: Only icons you use are included in the final bundle
- **Automatic optimization**: Icons are optimized SVGs
- **No runtime overhead**: Icons are compiled at build time

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
