# Casino Components

Casino-specific domain components for displaying casino information, bonuses, and affiliate CTAs.

## Components

### CasinoCard

Full-featured casino card for listings and grids.

**File:** `src/components/casino/CasinoCard.astro`

**Props:**
- `casinoEntry` (required): `CollectionEntry<'casinos'>` - The casino entry from content collection
- `variant` (optional): `'default' | 'compact' | 'featured'` - Card style variant (default: 'default')
- `showBonus` (optional): `boolean` - Show welcome bonus section (default: true)
- `showStats` (optional): `boolean` - Show stats grid (default: true)
- `class` (optional): `string` - Additional CSS classes

**Features:**
- Featured badge for featured casinos
- Casino logo display
- Star rating with half-star support
- Welcome bonus with wagering and min deposit details
- Stats grid (Megaways, Crypto, Payment methods, Providers)
- Market badges (UK, Australia, Canada, Crypto, etc.) with color coding
- License information with shield icon
- Affiliate link CTA button
- Review page link
- Responsible gambling disclaimer
- Dark mode support
- Hover effects

**Usage:**
```astro
---
import { getCollection } from 'astro:content';
import CasinoCard from '@components/casino/CasinoCard.astro';

const casinos = await getCollection('casinos');
---

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {casinos.map(casino => (
    <CasinoCard casinoEntry={casino} />
  ))}
</div>

<!-- Featured variant with ring -->
<CasinoCard casinoEntry={featuredCasino} variant="featured" />

<!-- Without bonus section -->
<CasinoCard casinoEntry={casino} showBonus={false} />
```

---

### CasinoCardCompact

Compact casino card for sidebars and smaller spaces.

**File:** `src/components/casino/CasinoCardCompact.astro`

**Props:**
- `casinoEntry` (required): `CollectionEntry<'casinos'>` - The casino entry from content collection
- `class` (optional): `string` - Additional CSS classes

**Features:**
- Smaller logo display
- Rating with star icon
- Featured/New badges
- Compact bonus display
- Quick stats (Megaways, Crypto)
- Play Now CTA button
- Review link
- Dark mode support

**Usage:**
```astro
---
import CasinoCardCompact from '@components/casino/CasinoCardCompact.astro';
---

<!-- Sidebar widget -->
<aside class="w-80">
  <h3>Top Casinos</h3>
  <div class="space-y-4">
    {topCasinos.map(casino => (
      <CasinoCardCompact casinoEntry={casino} />
    ))}
  </div>
</aside>
```

---

## Market Badge Colors

The `CasinoCard` component uses color-coded badges for different markets:

| Market | Background | Text |
|--------|-----------|------|
| UK | Blue | Blue |
| Australia | Green | Green |
| Canada | Red | Red |
| Crypto | Orange | Orange |
| USA | Purple | Purple |
| International | Gray | Gray |

---

## Related Components

- **CasinoTable** (TODO) - Comparison table for multiple casinos
- **BonusDisplay** (TODO) - Standalone bonus display component
- **LicenseBadges** (TODO) - License badges component
- **PaymentMethods** (TODO) - Payment icons grid
- **CasinoCtaBox** (TODO) - CTA box with affiliate link
- **MarketBadge** (TODO) - Standalone market indicator

---

## Content Collection Schema

These components require the `casinos` content collection with the following schema:

```typescript
{
  name: string;
  slug: string;
  logo: string;
  rating: number;
  welcomeBonus: {
    title: string;
    amount: string;
    freeSpins?: number;
    wageringRequirement?: number;
    minDeposit?: number;
  };
  markets: ('uk' | 'australia' | 'canada' | 'europe' | 'usa' | 'crypto' | 'international')[];
  licenses: string[];
  paymentMethods: string[];
  cryptoAccepted: boolean;
  providers: string[];
  hasMegaways: boolean;
  affiliateLink: string;
  pros: string[];
  cons: string[];
  featured: boolean;
  isNew: boolean;
  author: reference('authors');
  publishedDate: Date;
  updatedDate: Date;
}
```

See [docs/CONTENT-SCHEMAS.md](../../../docs/CONTENT-SCHEMAS.md) for full schema documentation.

---

## Design System Integration

### Colors
- Primary actions: `primary-600` (buttons, CTAs)
- Success (bonus): `green-50` to `green-900` gradient
- Ratings: `yellow-500` (stars)
- Market badges: Semantic colors per market type

### Typography
- Uses `H3` component for casino names
- Small text (`text-xs`, `text-sm`) for stats and metadata
- Bold/semibold weights for emphasis

### Icons
- Lucide icons via `astro-icon`
- Semantic icons (star, gift, zap, coins, credit-card, building-2, shield-check, arrow-right)
- Consistent sizing (14px, 16px, 18px, 20px)

### Spacing
- Consistent padding (`p-4`, `p-6`)
- Gap utilities for flex/grid layouts (`gap-2`, `gap-3`, `gap-4`)
- Margin bottom for sections (`mb-3`, `mb-5`)

---

## Accessibility

- Semantic HTML structure
- Alt text for all images
- ARIA labels on interactive elements
- Keyboard navigable CTAs
- Focus states on buttons and links
- Responsible gambling disclaimers
- Affiliate link disclosure

---

## Performance

- Lazy loading images
- Optimized with Astro's `<Image>` component
- Tree-shakeable icon imports
- Minimal client-side JavaScript (none required)
- Static rendering by default

---

## Examples

### Casino Listing Page
```astro
---
import { getCollection } from 'astro:content';
import CasinoCard from '@components/casino/CasinoCard.astro';
import Container from '@components/layout/Container.astro';
import H1 from '@components/typography/H1.astro';

const allCasinos = await getCollection('casinos');
const featuredCasinos = allCasinos.filter(c => c.data.featured);
const regularCasinos = allCasinos.filter(c => !c.data.featured);
---

<Container>
  <H1>Top Online Casinos</H1>

  <!-- Featured Casinos -->
  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6">Featured Casinos</h2>
    <div class="grid md:grid-cols-2 gap-6">
      {featuredCasinos.map(casino => (
        <CasinoCard casinoEntry={casino} variant="featured" />
      ))}
    </div>
  </section>

  <!-- All Casinos -->
  <section>
    <h2 class="text-2xl font-bold mb-6">All Casinos</h2>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {regularCasinos.map(casino => (
        <CasinoCard casinoEntry={casino} />
      ))}
    </div>
  </section>
</Container>
```

### Sidebar Widget
```astro
---
import CasinoCardCompact from '@components/casino/CasinoCardCompact.astro';

const topCasinos = await getCollection('casinos', ({ data }) => {
  return data.featured && data.rating >= 4.5;
}).then(casinos => casinos.slice(0, 3));
---

<aside class="w-full lg:w-80 flex-shrink-0">
  <div class="sticky top-24 space-y-6">
    <!-- Top Casinos Widget -->
    <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
      <h3 class="text-lg font-bold mb-4">Top Rated Casinos</h3>
      <div class="space-y-4">
        {topCasinos.map(casino => (
          <CasinoCardCompact casinoEntry={casino} />
        ))}
      </div>
    </div>
  </div>
</aside>
```

### UK Casinos Page
```astro
---
const ukCasinos = await getCollection('casinos', ({ data }) => {
  return data.markets.includes('uk');
});
---

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {ukCasinos.map(casino => (
    <CasinoCard casinoEntry={casino} />
  ))}
</div>
```
