// Content Collections Configuration
// Using Astro v5 Content Layer API
// Reference: https://docs.astro.build/en/guides/content-collections/

import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ============================================
// Slots Collection
// ============================================
const slots = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/slots' }),
	schema: ({ image }) =>
		z.object({
			// Basic Info
			name: z.string(),
			slug: z.string(), // URL slug → /online-slots/[slug]/
			// Optional: when omitted, SlotThumbnail resolves art by convention
			// (images/thumbnails/<slug>.jpg) and falls back to a name-based SVG.
			thumbnail: image().optional(), // Slot thumbnail - optimized at build time
			logo: image().optional(), // Optional slot logo
			provider: z.string(), // Provider slug for filtering (btg, red-tiger, etc.)

			// Stats
			rtp: z.number().min(0).max(100).optional(), // e.g., 96.5
			volatility: z
				.enum(['low', 'medium', 'medium-high', 'high', 'very-high'])
				.optional(),
			maxWin: z.string().optional(), // e.g., "50,000x"
			paylines: z.number().positive().optional(), // e.g., 117649

			// Mechanics
			mechanics: z.array(z.string()).default([]), // ['megaways', 'cascading', 'bonus-buy']

			// Grid Configuration
			reels: z.number().positive().optional(), // Number of reels (typically 5-6)
			rows: z.string().optional(), // e.g., "2-7" for variable rows

			// Betting
			minBet: z.number().positive().optional(), // e.g., 0.10
			maxBet: z.number().positive().optional(), // e.g., 100

			// Features
			features: z.array(z.string()).default([]), // List of game features
			bonusBuy: z.boolean().default(false), // Whether bonus buy is available

			// Demo (click-to-load facade; harvested from the provider demo servers
			// the legacy site embedded — no iframe ships in the initial HTML)
			demoUrl: z.string().url().optional(),

			// Theme
			theme: z.array(z.string()).default([]), // Thematic tags

			// Rating & Review
			rating: z.number().min(0).max(5).optional(), // 0-5 star rating
			pros: z.array(z.string()).default([]),
			cons: z.array(z.string()).default([]),

			// Review protocol (docs/REVIEW-PROTOCOL.md) — per-category scorecard.
			// Overall `rating` stays the single source for JSON-LD; categories
			// are the visible breakdown. All 0-5.
			scorecard: z
				.object({
					features: z.number().min(0).max(5),
					winPotential: z.number().min(0).max(5),
					baseGame: z.number().min(0).max(5),
					value: z.number().min(0).max(5),
					presentation: z.number().min(0).max(5),
				})
				.optional(),

			// Stat provenance — set ONLY when stats were genuinely verified
			// against a first-party source (rule 9; never fabricate).
			verified: z
				.object({
					source: z.string(), // e.g. "Playin (Evolution) portal + redtiger.com"
					date: z.coerce.date(),
					url: z.string().url().optional(),
				})
				.optional(),

			// Known operator-configurable RTP variants (from provider sheets).
			// Empty/omitted = no variants documented; renders nothing.
			rtpVariants: z.array(z.number().min(0).max(100)).default([]),

			// Play sessions (docs/REVIEW-PROTOCOL.md §3.8) — dated demo-play
			// logs, the honest updatedDate trigger (law 5): bump updatedDate
			// ONLY when an entry lands here. Observations, not stats — never
			// restate RTP/max-win claims from session anecdotes. `spins` and
			// `duration` are strings so honest approximation ("~120", "20 min
			// demo cap") is first-class. Evidence images live under
			// images/screenshots/<slug>/ and are resolved by SessionLog.
			sessions: z
				.array(
					z.object({
						date: z.coerce.date(),
						spins: z.string().optional(), // e.g. "~120"
						stake: z.string().optional(), // e.g. "2.00 demo credits"
						duration: z.string().optional(), // e.g. "20 min (demo time cap)"
						notes: z.string(),
						evidence: z
							.array(
								z.object({
									image: z.string(), // path under images/screenshots/, e.g. "dragons-luck-megaways/base.jpg"
									alt: z.string(),
									caption: z.string().optional(),
								}),
							)
							.default([]),
					}),
				)
				.default([]),

			// Paytable (REVIEW-PROTOCOL §3.7) — symbol pays as stake multiples,
			// transcribed from the in-game paytable / gamesheet (cite via
			// `verified`). Keys are of-a-kind counts; omit those the game
			// lacks (5-reel games have no x6).
			paytable: z
				.array(
					z.object({
						symbol: z.string(), // e.g. "138 Coin"
						tier: z.enum(['premium', 'low']).default('low'),
						x3: z.number().optional(),
						x4: z.number().optional(),
						x5: z.number().optional(),
						x6: z.number().optional(),
					}),
				)
				.default([]),

			// Review history (REVIEW-PROTOCOL law 5) — dated, honest record of
			// material changes. A changelog entry (like a session entry) is a
			// legitimate updatedDate trigger; silent edits are not.
			changelog: z
				.array(z.object({ date: z.coerce.date(), change: z.string() }))
				.default([]),

			// FAQ — single source for the visible accordion AND FAQPage JSON-LD
			// (same rule as the homepage: text must stay identical).
			// Closing verdict card (owner design): one-line headline + 1–2 sentence
			// summary. Renders the orange "Our verdict" section; nothing without it.
			verdict: z.object({ headline: z.string(), summary: z.string() }).optional(),

			faqs: z
				.array(z.object({ question: z.string(), answer: z.string() }))
				.default([]),

			// SEO
			title: z.string().optional(), // Custom page title (overrides default)
			description: z.string().optional(), // Meta description
			h1Tag: z.string().default('Megaways Slots'), // Custom H1 component

			// E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
			author: reference('authors').optional(), // Reference to authors collection
			releasedDate: z.coerce.date().optional(), // Game release date (provider launch)
			publishedDate: z.coerce.date().optional(), // Initial publication date
			updatedDate: z.coerce.date().optional(), // Last update date
		}),
});

// ============================================
// Casinos Collection
// ============================================
const casinos = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/casinos' }),
	schema: ({ image }) =>
		z.object({
			// Basic Info
			name: z.string(),
			slug: z.string(), // URL slug → /online-casinos/[slug]-casino-review/
			logo: image().optional(), // Casino logo - optimized at build time
			thumbnail: image().optional(), // Casino thumbnail/banner - optimized at build time

			// Rating
			rating: z.number().min(0).max(5).optional(), // 0-5 star rating

		// Welcome Bonus
		welcomeBonus: z
			.object({
				title: z.string(),
				amount: z.string(), // e.g., "5 BTC + 200 Free Spins"
				freeSpins: z.number().optional(),
				wageringRequirement: z.number().optional(), // e.g., 40 (means 40x)
				minDeposit: z.number().optional(),
				code: z.string().optional(), // bonus code as published; omit if unknown ("None" only when verified)
			})
			.optional(),

		// Markets & Licensing
		markets: z
			.array(
				z.enum([
					'uk',
					'australia',
					'canada',
					'europe',
					'usa',
					'crypto',
					'international',
				])
			)
			.default([]),
		licenses: z.array(z.string()).default([]), // e.g., ["UKGC", "MGA", "Curacao"]

		// Payments
		paymentMethods: z.array(z.string()).default([]), // e.g., ["visa", "mastercard", "bitcoin"]
		cryptoAccepted: z.boolean().default(false),

		// Games
		providers: z.array(z.string()).default([]), // Software providers (btg, pragmatic-play, etc.)
		hasMegaways: z.boolean().default(false), // Whether casino has Megaways slots

		// Affiliate
		affiliateLink: z.string().url().optional(), // Affiliate tracking link
		website: z.string().url().optional(), // The casino's REAL domain (entity URL for schema — never the affiliate link)

		// Video Review (60-second summary)
		videoUrl: z.string().url().optional(), // YouTube or Vimeo embed URL
		videoThumbnail: image().optional(), // Custom video thumbnail (optional, falls back to auto-generated)
		videoDuration: z.number().positive().optional(), // Duration in seconds (e.g., 60)
		videoUploadDate: z.coerce.date().optional(), // When video was published

		// Review
		pros: z.array(z.string()).default([]),
		cons: z.array(z.string()).default([]),

		// Flags
		featured: z.boolean().default(false), // Show in featured sections
		isNew: z.boolean().default(false), // Mark as new casino

		// SEO
		title: z.string().optional(),
		description: z.string().optional(),

		// E-E-A-T
		author: reference('authors').optional(),
		publishedDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),

		// ---- Casino review protocol (docs/CASINO-REVIEW-PROTOCOL.md) ----

		// Status honesty (law 6) — gates CTAs, banners, listing sort and the
		// /online-casinos/closed/ page. Status claims are verified first-hand
		// (never relayed from competitors) and cited in statusNote.
		status: z.enum(['live', 'warning', 'closed']).default('live'),
		closedDate: z.coerce.date().optional(),
		statusNote: z.string().optional(), // one line, evidence-cited

		// Stat provenance (law 5) — set ONLY when genuinely verified.
		verified: z
			.object({
				source: z.string(),
				date: z.coerce.date(),
				url: z.string().url().optional(),
			})
			.optional(),

		// 6-category scorecard, 0–10 (law 2: the overall score is the
		// arithmetic mean of these — computed, never stored separately).
		scorecard: z
			.object({
				trust: z.number().min(0).max(10),
				megawaysLibrary: z.number().min(0).max(10),
				bonusFairness: z.number().min(0).max(10),
				payments: z.number().min(0).max(10),
				support: z.number().min(0).max(10),
				rgTools: z.number().min(0).max(10),
			})
			.optional(),

		// The moat data (§3.6): hand-counted, never a marketing number.
		megawaysCount: z.number().optional(),
		megawaysCountedDate: z.coerce.date().optional(),

		// Licence verification (law 3) — register-linked or it doesn't count.
		licenceDetails: z
			.array(
				z.object({
					authority: z.string(), // e.g. "Curaçao GCB"
					number: z.string().optional(),
					registerUrl: z.string().url().optional(),
					verifiedDate: z.coerce.date().optional(),
				}),
			)
			.default([]),

		// At a glance (§3.3) — shown in the hero fact strip when present.
		founded: z.number().optional(), // year
		owner: z.string().optional(), // operating company, e.g. "Dama N.V."
		platform: z.string().optional(), // e.g. "SoftSwiss"
		gameCount: z.string().optional(), // as stated, e.g. "10,000+ (operator-stated)"
		minWithdrawal: z.number().optional(), // €
		kyc: z.string().optional(), // one line, e.g. "Can be requested at any cashout"
		sisterBrands: z.array(z.string()).default([]), // casino slugs or names

		// Megaways library audit (§3.6) — flagship titles by OUR slot slug; the
		// component joins our slot review for name, provider and best RTP.
		flagships: z
			.array(
				z.object({
					slot: z.string(), // our slot slug, e.g. "bonanza-megaways"
					liveRtp: z.number().min(0).max(100).optional(), // RTP seen in-game at THIS casino
					checkedDate: z.coerce.date().optional(),
				}),
			)
			.default([]),

		// Bonus terms reality check (§3.7) and T&C audit (§3.9) — one row per
		// term: what it says, our flag, optional plain-English note.
		bonusTerms: z
			.array(
				z.object({
					term: z.string(),
					says: z.string(),
					flag: z.enum(['fair', 'caution', 'trap']),
					note: z.string().optional(),
				}),
			)
			.default([]),
		termsAudit: z
			.array(
				z.object({
					term: z.string(),
					says: z.string(),
					flag: z.enum(['fair', 'caution', 'trap']),
					note: z.string().optional(),
				}),
			)
			.default([]),

		// Payments (§3.8) — operator-reported figures unless `tested` is set.
		payments: z
			.array(
				z.object({
					method: z.string(), // slug from src/data/payment-methods.ts
					min: z.number().optional(), // €
					max: z.number().optional(), // €
					fee: z.string().optional(),
					depositTime: z.string().optional(), // e.g. "Instant"
					withdrawalTime: z.string().optional(), // operator-reported, e.g. "0–24h"
					tested: z
						.object({ time: z.string(), date: z.coerce.date() })
						.optional(), // OUR timed withdrawal
				}),
			)
			.default([]),

		// Reputation (§3.10) — dated third-party citations, reported not adjudicated.
		reputation: z
			.array(
				z.object({
					source: z.string(), // e.g. "Trustpilot"
					score: z.string(), // as published, e.g. "2.2/5" or "7.6 (Safety Index)"
					count: z.number().optional(), // number of reviews
					url: z.string().url().optional(),
					retrieved: z.coerce.date(),
					note: z.string().optional(),
				}),
			)
			.default([]),

		// Responsible-gambling tools offered (§3.9), e.g. ["Deposit limits", "Self-exclusion"].
		rgTools: z.array(z.string()).default([]),

		// FAQ / sessions / changelog — same conventions as slots (single
		// source for visible + JSON-LD; sessions/changelog are the ONLY
		// honest updatedDate triggers).
		// Closing verdict card (owner design): one-line headline + 1–2 sentence
		// summary. Renders the orange "Our verdict" section; nothing without it.
		verdict: z.object({ headline: z.string(), summary: z.string() }).optional(),

		faqs: z
			.array(z.object({ question: z.string(), answer: z.string() }))
			.default([]),
		sessions: z
			.array(
				z.object({
					date: z.coerce.date(),
					spins: z.string().optional(),
					stake: z.string().optional(),
					duration: z.string().optional(),
					notes: z.string(),
					evidence: z
						.array(
							z.object({
								image: z.string(),
								alt: z.string(),
								caption: z.string().optional(),
							}),
						)
						.default([]),
				}),
			)
			.default([]),
		changelog: z
			.array(z.object({ date: z.coerce.date(), change: z.string() }))
			.default([]),
	}),
});

// ============================================
// Authors Collection (for E-E-A-T)
// ============================================
const authors = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
	schema: z.object({
		name: z.string(),
		slug: z.string(),
		avatar: z.string().optional(), // Path to author photo
		role: z.string().optional(), // e.g., "Slots Expert & Lead Reviewer"
		expertise: z.array(z.string()).default([]), // Areas of expertise
		yearsExperience: z.number().positive().optional(),
		bio: z.string().optional(), // Full biography
		shortBio: z.string().optional(), // One-line bio for bylines
		socials: z
			.object({
				linkedin: z.string().url().optional(),
				twitter: z.string().url().optional(),
				website: z.string().url().optional(),
			})
			.optional(),
	}),
});

// ============================================
// Providers Collection
// ============================================
const providers = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/providers',
	}),
	schema: z.object({
		name: z.string(),
		slug: z.string(),
		logo: z.string().optional(), // Path to provider logo
		founded: z.number().positive().optional(), // Year founded
		headquarters: z.string().optional(), // Location
		description: z.string().optional(),
		notableGames: z.array(z.string()).default([]), // List of notable game titles

		// SEO
		title: z.string().optional(),
		description_meta: z.string().optional(), // Named differently to avoid conflict

		// E-E-A-T
		author: reference('authors').optional(),
		publishedDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
	}),
});

// ============================================
// Mechanics Collection (optional)
// For Megaways, Megaclusters, etc. hub pages
// ============================================
const mechanics = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/mechanics',
	}),
	schema: z.object({
		name: z.string(), // e.g., "Megaways"
		slug: z.string(), // e.g., "megaways"
		description: z.string().optional(),
		developer: z.string().optional(), // Who created this mechanic (e.g., "Big Time Gaming")
		yearIntroduced: z.number().positive().optional(),

		// SEO
		title: z.string().optional(),
		description_meta: z.string().optional(),

		// E-E-A-T
		author: reference('authors').optional(),
		publishedDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
	}),
});

// ============================================
// Export Collections
// ============================================
export const collections = {
	slots,
	casinos,
	authors,
	providers,
	mechanics,
};
