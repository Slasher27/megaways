# CLAUDE.md - Megawaysonline.com

> Quick reference for AI assistants working on this codebase. For detailed documentation, see the `docs/` folder.

---

## Project at a Glance

**Megawaysonline.com** is a casino affiliate website built with **Astro 5.x** and **Tailwind CSS 4.x**, focused on Megaways slots and casino reviews.

### Tech Stack

- **Framework**: Astro 5.x (static site generator)
- **Styling**: Tailwind CSS 4.x (CSS-based config in `src/styles/global.css`)
- **Icons**: astro-icon with Iconify (Lucide, MDI, Phosphor)
- **Content**: MDX with Content Collections
- **Interactivity**: Svelte 5.x (planned)
- **TypeScript**: 5.x

### Quick Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## Documentation Structure

All detailed documentation is in the `docs/` folder:

**Note:** The `docs/` folder is for development only and is NOT deployed to production.

| Document | When to Use |
|----------|-------------|
| **[docs/README.md](./docs/README.md)** | Project overview, tech stack, getting started |
| **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** | URL structure, routing, redirects, directory layout |
| **[docs/COMPONENTS.md](./docs/COMPONENTS.md)** | Component organization, usage, conventions |
| **[docs/CONTENT-SCHEMAS.md](./docs/CONTENT-SCHEMAS.md)** | Content Collections schemas, queries, examples |
| **[docs/STYLING.md](./docs/STYLING.md)** | Tailwind CSS, colors, icons, dark mode, responsive |
| **[docs/SEO-GUIDELINES.md](./docs/SEO-GUIDELINES.md)** | SEO, E-E-A-T, schema markup, affiliate links |
| **[docs/WORKFLOWS.md](./docs/WORKFLOWS.md)** | Common tasks, migration, testing checklist |

---

## Critical Rules

### 1. URL Structure (ALWAYS IMPORTANT)

**Trailing slashes are required on all URLs** (`trailingSlash: 'always'` in `astro.config.mjs`)

**All slots use flat structure:**
- ✅ `/online-slots/bonanza-megaways/`
- ❌ `/online-slots/btg/bonanza-megaways/`

**Red Tiger slots are NOT nested** - they follow the same flat pattern as all other slots.

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md#url-structure-critical) for complete URL patterns.

### 2. 301 Redirects

We have **12 configured redirects** (6 Red Tiger slots + 6 casinos) to handle WordPress URL migrations.

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md#301-redirects-wordpress-migration) for the full list.

### 3. Component Organization

Components are organized by purpose:

- `ui/` - Generic UI primitives (Button, Badge, Card, Icon, etc.)
- `typography/` - Text components (H1-H6, P)
- `layout/` - Page structure (Header, Footer, Container)
- `casino/` - Casino-specific components
- `slots/` - Slot-specific components
- `reviews/` - Shared review components
- `seo/` - SEO & schema components
- `interactive/` - Client-side Svelte components

See [docs/COMPONENTS.md](./docs/COMPONENTS.md) for complete component guide.

### 4. Content Collections

Content is managed via Astro Content Collections with TypeScript schemas:

- `slots/` - Slot reviews (flat structure, all providers)
- `casinos/` - Casino reviews
- `authors/` - Author profiles (for E-E-A-T)
- `providers/` - Provider profiles

See [docs/CONTENT-SCHEMAS.md](./docs/CONTENT-SCHEMAS.md) for schemas and examples.

### 5. Tailwind CSS 4.x

**Important:** Tailwind 4.x uses CSS-based configuration via `@theme` directive in `src/styles/global.css`, NOT a JavaScript config file.

Primary brand colors are defined as CSS custom properties:
- Primary color scale: `primary-50` through `primary-950`
- Main brand: `primary-500`
- Buttons/CTAs: `primary-600`
- Hover states: `primary-700`

See [docs/STYLING.md](./docs/STYLING.md) for complete styling guide.

---

## Common Tasks Quick Links

### Adding Content

- **[Add a slot review](./docs/WORKFLOWS.md#adding-a-new-slot-review)** - Create file, add frontmatter, write content
- **[Add a casino review](./docs/WORKFLOWS.md#adding-a-new-casino)** - Create file, add frontmatter, write content
- **[Add an author](./docs/WORKFLOWS.md#adding-a-new-author-e-e-a-t)** - Create author profile for E-E-A-T

### Building Components

- **[Component conventions](./docs/COMPONENTS.md#component-conventions)** - File naming, structure, patterns
- **[Component decision guide](./docs/COMPONENTS.md#component-decision-guide)** - Which folder to use

### SEO & Schema

- **[SEO requirements](./docs/SEO-GUIDELINES.md#seo-requirements)** - Meta tags, OG tags, canonical URLs
- **[E-E-A-T implementation](./docs/SEO-GUIDELINES.md#e-e-a-t-implementation)** - Author attribution, trust signals
- **[Affiliate link rules](./docs/SEO-GUIDELINES.md#affiliate-links)** - Required attributes and disclaimers

### Testing & Deployment

- **[Testing checklist](./docs/WORKFLOWS.md#testing-checklist)** - Pre-deployment verification
- **[Redirect verification](./docs/WORKFLOWS.md#redirect-verification-script)** - Test all 12 redirects

---

## Task-Based Navigation

### "I need to understand the URL structure"
→ Read [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md#url-structure-critical)

### "I need to build a new component"
→ Read [docs/COMPONENTS.md](./docs/COMPONENTS.md) and [docs/STYLING.md](./docs/STYLING.md)

### "I need to add a slot or casino review"
→ Read [docs/CONTENT-SCHEMAS.md](./docs/CONTENT-SCHEMAS.md) and [docs/WORKFLOWS.md](./docs/WORKFLOWS.md)

### "I need to implement SEO or schema markup"
→ Read [docs/SEO-GUIDELINES.md](./docs/SEO-GUIDELINES.md)

### "I need to style something with Tailwind"
→ Read [docs/STYLING.md](./docs/STYLING.md)

### "I need to test before deploying"
→ Read [docs/WORKFLOWS.md](./docs/WORKFLOWS.md#testing-checklist)

---

## Import Path Aliases

```typescript
// Configured in tsconfig.json
import H1 from '@components/typography/H1.astro';
import Button from '@components/ui/Button.astro';
import CasinoCard from '@components/casino/CasinoCard.astro';
```

---

## Framework Status

### ✅ Complete
- Tailwind CSS 4.x with custom colors and dark mode
- Layout system (BaseLayout, PageLayout)
- UI components (Button, Badge, Card, Icon, Image, Link, Divider, Skeleton)
- Typography components (H1-H6, P)
- Icon system (astro-icon with Lucide, MDI, Phosphor)
- Header, Footer, Container

### 🔄 TODO
- Casino domain components
- Slot domain components
- Review components (Rating, ProsCons, AuthorCard, etc.)
- SEO components (Schema markup, meta tags)
- Interactive Svelte components (filters, search, etc.)

---

## Contact & Resources

- **Production**: https://megawaysonline.com
- **Repository**: [Your repo URL]
- **Documentation**: `docs/` folder in this repository

---

## For AI Assistants

When working on this codebase:

1. **Always check the relevant documentation** in `docs/` before starting
2. **Follow the URL structure rules** - all slots are flat, trailing slashes required
3. **Use the component organization guide** - put components in the correct folder
4. **Validate content against schemas** - Content Collections have strict TypeScript schemas
5. **Test thoroughly** - use the testing checklist in WORKFLOWS.md

The documentation is split by concern for easier navigation. Start with `docs/README.md` for an overview, then refer to specific documents as needed.
