# CasinoCard Component Examples

Complete guide with examples for using the CasinoCard components.

## Component Files Created

✅ **CasinoCard.astro** - Full-featured casino card for listings
✅ **CasinoCardCompact.astro** - Compact version for sidebars
✅ **README.md** - Full component documentation

Location: `src/components/casino/`

---

## Features Overview

### CasinoCard (Full)
- Featured casino badge with gradient background
- Casino logo display (120x40px)
- 5-star rating system with half-star support
- Welcome bonus section with gradient background:
  - Gift icon
  - Bonus title and amount
  - Wagering requirement
  - Minimum deposit
- Stats grid showing:
  - Megaways slots availability (⚡ icon)
  - Crypto accepted (🪙 icon)
  - Payment methods count (💳 icon)
  - Game providers count (🏢 icon)
- Market badges with color coding:
  - UK (blue), Australia (green), Canada (red)
  - Crypto (orange), USA (purple), International (gray)
- License badges with shield icon
- Primary "Visit Casino" CTA button (affiliate link)
- "Read Full Review" link
- 18+ responsible gambling disclaimer
- Full dark mode support
- Hover effects and transitions

### CasinoCardCompact (Sidebar)
- Compact horizontal layout
- Smaller logo (80x30px)
- Rating with single star icon
- Featured/New badges
- Compact bonus display
- Quick stats (Megaways, Crypto icons only)
- "Play Now" CTA button
- "Read Review" link
- Optimized for narrow spaces (sidebars, widgets)

---

## Visual Design

### Card Structure (Full)

```
┌─────────────────────────────────┐
│ ⭐ Featured Casino (gradient)   │ ← Featured badge (optional)
├─────────────────────────────────┤
│ [Casino Logo]        [NEW]      │ ← Logo + New badge
│ ★★★★☆ 4.5/5                     │ ← Rating
├─────────────────────────────────┤
│ 🎁 Welcome Package              │ ← Bonus section
│    5 BTC + 200 Free Spins       │   (gradient background)
│    40x wagering | Min: $20      │
│                                 │
│ ⚡ Megaways Slots  🪙 Crypto    │ ← Stats grid
│ 💳 20+ Payments   🏢 15+ Games  │
│                                 │
│ [UK] [Crypto] [International]   │ ← Market badges
│                                 │
│ 🛡️ Licensed: Curacao            │ ← Licenses
│                                 │
│ [Visit Casino →]                │ ← Primary CTA
│ Read Full Review →              │ ← Secondary link
│                                 │
│ 18+. T&Cs apply. Gamble resp.  │ ← Disclaimer
└─────────────────────────────────┘
```

### Card Structure (Compact)

```
┌───────────────────────────┐
│ [Logo] ⭐ 4.5 [Featured]  │ ← Logo + Rating + Badges
│                           │
│ Welcome Package           │ ← Bonus
│ 5 BTC + 200 Free Spins   │
│                           │
│ ⚡ Megaways  🪙 Crypto    │ ← Quick stats
│                           │
│ [Play Now]                │ ← CTA
│ ─────────────────────     │
│ Read Review →             │ ← Review link
└───────────────────────────┘
```

---

## Usage Examples

### 1. Casino Listing Page (Full Width)

```astro
---
// src/pages/online-casinos/index.astro
import { getCollection } from 'astro:content';
import PageLayout from '@layouts/PageLayout.astro';
import Container from '@components/layout/Container.astro';
import CasinoCard from '@components/casino/CasinoCard.astro';
import H1 from '@components/typography/H1.astro';
import P from '@components/typography/P.astro';

const allCasinos = await getCollection('casinos');
const featuredCasinos = allCasinos.filter(c => c.data.featured);
const regularCasinos = allCasinos.filter(c => !c.data.featured);
---

<PageLayout>
  <Container>
    <H1 size="xl">Top Online Casinos</H1>
    <P variant="lead">
      Discover the best online casinos with Megaways slots, crypto support, and exclusive bonuses.
    </P>

    <!-- Featured Section -->
    {featuredCasinos.length > 0 && (
      <section class="mb-12">
        <H2 size="lg" class="mb-6">Featured Casinos</H2>
        <div class="grid md:grid-cols-2 gap-6">
          {featuredCasinos.map(casino => (
            <CasinoCard casinoEntry={casino} variant="featured" />
          ))}
        </div>
      </section>
    )}

    <!-- All Casinos -->
    <section>
      <H2 size="lg" class="mb-6">All Casinos</H2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularCasinos.map(casino => (
          <CasinoCard casinoEntry={casino} />
        ))}
      </div>
    </section>
  </Container>
</PageLayout>
```

### 2. UK Casinos Page (Filtered)

```astro
---
// src/pages/online-casinos/uk-casinos/index.astro
import { getCollection } from 'astro:content';
import PageLayout from '@layouts/PageLayout.astro';
import Container from '@components/layout/Container.astro';
import CasinoCard from '@components/casino/CasinoCard.astro';
import H1 from '@components/typography/H1.astro';
import Badge from '@components/ui/Badge.astro';

const ukCasinos = await getCollection('casinos', ({ data }) => {
  return data.markets.includes('uk');
});

// Sort by rating
ukCasinos.sort((a, b) => b.data.rating - a.data.rating);
---

<PageLayout>
  <Container>
    <div class="flex items-center gap-3 mb-4">
      <H1 size="xl">UK Online Casinos</H1>
      <Badge variant="info">{ukCasinos.length} Casinos</Badge>
    </div>

    <P variant="lead">
      Licensed and regulated UK casinos with Megaways slots. UKGC approved.
    </P>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ukCasinos.map(casino => (
        <CasinoCard casinoEntry={casino} />
      ))}
    </div>
  </Container>
</PageLayout>
```

### 3. Sidebar Widget (Compact)

```astro
---
// In any page with sidebar
import { getCollection } from 'astro:content';
import CasinoCardCompact from '@components/casino/CasinoCardCompact.astro';

const topCasinos = await getCollection('casinos', ({ data }) => {
  return data.featured && data.rating >= 4.5;
});

// Get top 3
const sidebarCasinos = topCasinos
  .sort((a, b) => b.data.rating - a.data.rating)
  .slice(0, 3);
---

<div class="flex flex-col lg:flex-row gap-8">
  <!-- Main Content -->
  <article class="flex-1">
    <slot />
  </article>

  <!-- Sidebar -->
  <aside class="w-full lg:w-80 flex-shrink-0">
    <div class="sticky top-24 space-y-6">
      <!-- Top Casinos Widget -->
      <div class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
          🏆 Top Rated Casinos
        </h3>
        <div class="space-y-4">
          {sidebarCasinos.map(casino => (
            <CasinoCardCompact casinoEntry={casino} />
          ))}
        </div>
      </div>
    </div>
  </aside>
</div>
```

### 4. Crypto Casinos (Special Filter)

```astro
---
// src/pages/online-casinos/crypto-casinos/index.astro
const cryptoCasinos = await getCollection('casinos', ({ data }) => {
  return data.cryptoAccepted && data.markets.includes('crypto');
});
---

<PageLayout>
  <Container>
    <H1>🪙 Crypto Casinos</H1>
    <P variant="lead">
      Play with Bitcoin, Ethereum, and other cryptocurrencies. Instant deposits and withdrawals.
    </P>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptoCasinos.map(casino => (
        <CasinoCard casinoEntry={casino} />
      ))}
    </div>
  </Container>
</PageLayout>
```

### 5. Slot Review Page - Where to Play Section

```astro
---
// src/pages/online-slots/[slug].astro
import { getCollection } from 'astro:content';
import CasinoCardCompact from '@components/casino/CasinoCardCompact.astro';
import H2 from '@components/typography/H2.astro';

// Get slot data...
const slot = await getEntry('slots', Astro.params.slug);

// Get casinos that have this provider
const recommendedCasinos = await getCollection('casinos', ({ data }) => {
  return data.providers.includes(slot.data.provider) && data.hasMegaways;
}).then(casinos => casinos.slice(0, 3));
---

<SlotReviewLayout slotEntry={slot}>
  <!-- Slot content... -->

  <!-- Where to Play section -->
  <section class="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl p-8">
    <H2 size="md" class="text-center mb-6">
      Where to Play {slot.data.name}
    </H2>
    <div class="grid md:grid-cols-3 gap-4">
      {recommendedCasinos.map(casino => (
        <CasinoCardCompact casinoEntry={casino} />
      ))}
    </div>
  </section>
</SlotReviewLayout>
```

### 6. Comparison Table (Side by Side)

```astro
---
// Compare 2 featured casinos side by side
const featured = await getCollection('casinos', ({ data }) => data.featured);
const topTwo = featured.slice(0, 2);
---

<Container>
  <H1>Compare Top Casinos</H1>
  <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
    {topTwo.map(casino => (
      <CasinoCard casinoEntry={casino} variant="featured" />
    ))}
  </div>
</Container>
```

### 7. Custom Variant (No Bonus)

```astro
---
// Show cards without bonus info for cleaner look
---

<div class="grid md:grid-cols-4 gap-4">
  {quickCasinos.map(casino => (
    <CasinoCard
      casinoEntry={casino}
      showBonus={false}
      showStats={false}
    />
  ))}
</div>
```

---

## Responsive Behavior

### Desktop (1024px+)
- Full cards: 3 columns grid
- Featured cards: 2 columns grid
- Compact cards: Single column in 320px sidebar
- All features visible

### Tablet (768px - 1023px)
- Full cards: 2 columns grid
- Featured cards: 2 columns grid
- Compact cards: Full width
- Optimized padding and spacing

### Mobile (<768px)
- Full cards: Single column (full width)
- Featured cards: Single column
- Compact cards: Full width with horizontal layout
- Touch-friendly button sizes

---

## Integration with Content Collections

### Required Content Structure

Create a casino entry in `src/content/casinos/`:

```yaml
---
# src/content/casinos/bitstarz.md
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
paymentMethods: ["bitcoin", "ethereum", "litecoin", "visa", "mastercard"]
cryptoAccepted: true
providers: ["btg", "pragmatic-play", "netent", "red-tiger"]
hasMegaways: true

affiliateLink: "https://example.com/go/bitstarz"

pros:
  - "Instant crypto withdrawals"
  - "Huge selection of Megaways slots"
  - "24/7 customer support"

cons:
  - "Not licensed in UK"
  - "Higher wagering requirements"

featured: true
isNew: false

author: "john-doe"
publishedDate: 2024-01-15
updatedDate: 2025-01-19
---

# BitStarz Casino Review

Full casino review content goes here...
```

---

## Color Palette Reference

### Market Badge Colors

```css
/* UK */
bg-blue-100 dark:bg-blue-900/50
text-blue-700 dark:text-blue-300

/* Australia */
bg-green-100 dark:bg-green-900/50
text-green-700 dark:text-green-300

/* Canada */
bg-red-100 dark:bg-red-900/50
text-red-700 dark:text-red-300

/* Crypto */
bg-orange-100 dark:bg-orange-900/50
text-orange-700 dark:text-orange-300

/* USA */
bg-purple-100 dark:bg-purple-900/50
text-purple-700 dark:text-purple-300

/* International */
bg-gray-100 dark:bg-gray-800
text-gray-700 dark:text-gray-300
```

### Bonus Section
```css
/* Background gradient */
from-green-50 to-emerald-50
dark:from-green-900/20 dark:to-emerald-900/20

/* Border */
border-green-200 dark:border-green-800

/* Icon background */
bg-green-100 dark:bg-green-800/50

/* Text colors */
text-green-800 dark:text-green-300  /* Title */
text-green-900 dark:text-green-200  /* Amount */
text-green-700 dark:text-green-400  /* Details */
```

---

## Next Steps

### Additional Casino Components to Build

1. **CasinoTable.astro** - Comparison table for multiple casinos
2. **BonusDisplay.astro** - Standalone bonus display component
3. **LicenseBadges.astro** - License badges with logos
4. **PaymentMethods.astro** - Payment method icons grid
5. **CasinoCtaBox.astro** - Featured CTA box component
6. **CasinoHero.astro** - Casino review page header

### Layout Integration

The CasinoCard components are now ready to use in:
- `/online-casinos/` (main listing page)
- `/online-casinos/uk-casinos/` (UK casinos page)
- `/online-casinos/crypto-casinos/` (crypto casinos page)
- `/online-casinos/top-casinos/` (featured casinos)
- Slot review pages (as "Where to Play" recommendations)
- Homepage widgets
- Sidebar recommendations

---

## Testing Checklist

- [ ] Light mode appearance
- [ ] Dark mode appearance
- [ ] Mobile responsive (320px+)
- [ ] Tablet responsive (768px+)
- [ ] Desktop responsive (1024px+)
- [ ] Hover effects work
- [ ] Links are correct
- [ ] Affiliate links have nofollow
- [ ] Images load with lazy loading
- [ ] Rating stars display correctly
- [ ] Market badges show correct colors
- [ ] Bonus section formats properly
- [ ] Stats grid aligns correctly
- [ ] Compact variant fits sidebar (320px)
- [ ] Build completes without errors

---

## Performance Notes

- Static rendering (zero JavaScript required)
- Lazy loaded images
- Optimized with Astro Image component
- Tree-shakeable icon imports
- Minimal CSS (Tailwind utilities only)
- Fast page loads
- SEO-friendly markup
