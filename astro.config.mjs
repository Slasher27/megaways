// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

/**
 * Spec tables scroll horizontally on narrow viewports (see `.review-prose table`
 * in global.css). A scroll container must be keyboard-reachable or a keyboard
 * user can never reach the off-screen columns — axe `scrollable-region-focusable`.
 * MDX gives us no wrapper element, so annotate the table itself at build time.
 * No dependency: a 10-line walk beats pulling in unist-util-visit.
 */
function rehypeAccessibleTables() {
	return (tree) => {
		const walk = (node) => {
			if (node.type === 'element' && node.tagName === 'table') {
				node.properties = node.properties || {};
				node.properties.tabIndex = 0;
				node.properties.role = 'region';
				node.properties['aria-label'] = 'Table — scroll horizontally to see all columns';
			}
			(node.children || []).forEach(walk);
		};
		walk(tree);
	};
}

/**
 * Review bodies render each H2 section as its own card (owner design
 * 2026-10-27). MDX gives no wrapper per section, so wrap every top-level
 * <h2> and the nodes up to the next <h2> in <section class="review-section">
 * at build time — zero content edits. ESM import/export nodes stay at root.
 */
// Tailwind utilities for markdown output (no class hooks in MDX). Tailwind
// scans this file, so these classes are generated like any other.
const REVIEW_CLASSES = {
	// Section card: 24px radius, 28px/20px padding, 12px apart, 17px/1.7 body;
	// cards nested inside (modules, FAQ…) drop to the inner-tile tone.
	section:
		'rounded-3xl bg-white dark:bg-gray-900 shadow-sm dark:shadow-none p-5 md:p-7 text-[1.0625rem] leading-[1.7] not-first:mt-3 [&>p]:mt-0 [&>p]:mb-3.5 [&_.surface-raised]:rounded-2xl [&_.surface-raised]:shadow-none [&_.surface-raised]:bg-gray-100 dark:[&_.surface-raised]:bg-gray-800',
	// Numbered H2 (the number comes from the CSS counter in global.css).
	h2: 'mt-0 mb-4 text-[1.875rem] leading-[1.15] before:block before:mb-1.5 before:text-[0.8125rem] before:font-bold before:tracking-normal before:text-primary-700 dark:before:text-primary-500',
	// "**Best for:** …" / "**Avoid if:**" lines → the design's tinted callout.
	callout:
		'mt-6 [.callout-fit+&]:mt-2 rounded-2xl px-5 py-4.5 bg-primary-50 text-primary-900 dark:bg-primary-950 dark:text-primary-200 text-lg font-semibold leading-[1.45] [&>strong:first-child]:text-primary-700 dark:[&>strong:first-child]:text-primary-300',
	// Bold-only paragraph ("**How it works:**") = a mini-heading.
	leadIn: 'mt-8 mb-3 text-[1.0625em]',
};

function rehypeSectionCards() {
	const addClass = (node, cls) => {
		node.properties = node.properties || {};
		node.properties.className = [...(node.properties.className || []), ...cls.split(' ')];
	};
	return (tree, file) => {
		const out = [];
		let current = null;
		for (const node of tree.children) {
			if (node.type === 'mdxjsEsm') {
				out.push(node);
			} else if (node.type === 'element' && node.tagName === 'hr') {
				// MDX `---` section rules: the cards separate sections now.
			} else if (node.type === 'element' && node.tagName === 'h2') {
				addClass(node, REVIEW_CLASSES.h2);
				current = { type: 'element', tagName: 'section', properties: {}, children: [node] };
				addClass(current, `review-section ${REVIEW_CLASSES.section}`);
				out.push(current);
			} else if (current) {
				current.children.push(node);
			} else {
				out.push(node);
			}
		}
		tree.children = out;

		const fit = /^(best for|avoid if|skip it if|skip if|play here if)\b/i;
		const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));
		const mark = (node) => {
			if (node.type === 'element' && node.tagName === 'p') {
				const content = node.children.filter((c) => !(c.type === 'text' && !c.value.trim()));
				const first = content[0];
				if (first?.type === 'element' && first.tagName === 'strong' && fit.test(text(first).trim())) {
					addClass(node, `callout-fit ${REVIEW_CLASSES.callout}`);
				} else if (content.length === 1 && first?.type === 'element' && first.tagName === 'strong') {
					// Decided here, not via CSS :has(> strong:only-child), which can't
					// see text nodes and caught ordinary one-bold-phrase paragraphs.
					addClass(node, REVIEW_CLASSES.leadIn);
				}
			}
			(node.children || []).forEach(mark);
		};
		mark(tree);

		// FAQ sections written in markdown ("### Question?" or "**Question?**"
		// followed by answer paragraphs) → exported as frontmatter `faqsFromBody`
		// so the route can emit FAQPage JSON-LD built from the VISIBLE text
		// (schema = page, word for word). Protocol pages use <Faq> instead and
		// yield nothing here.
		const clean = (s) => s.replace(/\s+/g, ' ').trim();
		const faqs = [];
		for (const section of out.filter((n) => n.tagName === 'section')) {
			if (!/\b(faqs?|frequently asked)\b/i.test(text(section.children[0]))) continue;
			let q = null;
			for (const node of section.children.slice(1)) {
				if (node.type !== 'element') continue;
				const content = (node.children || []).filter((c) => !(c.type === 'text' && !c.value.trim()));
				const boldOnly = node.tagName === 'p' && content.length === 1 && content[0].tagName === 'strong';
				// A question must END in "?" — whether a ### heading or a bold line.
				const isQ = (node.tagName === 'h3' || boldOnly) && /\?\s*$/.test(text(node));
				if (isQ) {
					q = { question: clean(text(node)), answer: '' };
					faqs.push(q);
				} else if (q && ['p', 'ul', 'ol'].includes(node.tagName) && !boldOnly) {
					q.answer = clean(`${q.answer} ${text(node)}`);
				} else {
					// Anything else (a non-question heading/lead-in, a table, a
					// component) ends the answer rather than being silently merged
					// or dropped — the schema must never misrepresent the page.
					q = null;
				}
			}
		}
		const complete = faqs.filter((f) => f.question && f.answer);
		if (complete.length && file?.data?.astro?.frontmatter) file.data.astro.frontmatter.faqsFromBody = complete;
	};
}

// https://astro.build/config
export default defineConfig({
    markdown: {
        rehypePlugins: [rehypeAccessibleTables, rehypeSectionCards],
    },
    site: 'https://megawaysonline.com',
    trailingSlash: 'always',
    // Static output on Vercel; the adapter turns `redirects` into real HTTP 301s
    // (without it they deploy as meta-refresh stubs served with HTTP 200).
    adapter: vercel(),
    integrations: [
        icon(),
        mdx(),
        sitemap({
            // Keep the sitemap consistent with per-page robots meta:
            // exclude noindex pages. /search/ is the only noindex route.
            filter: (page) => page !== 'https://megawaysonline.com/search/',
        }),
    ],
    image: {
        // Optimize images to WebP format for better performance
        formats: ['webp'],
        quality: 80,
    },
    build: {
        // Inline all CSS: removes the render-blocking stylesheet request,
        // which is worth ~700ms of simulated mobile LCP (Phase 3 perf gate).
        inlineStylesheets: 'always',
    },
    vite: {
        plugins: [tailwindcss()],
    },
    // Canonical slug standard: slots drop the legacy "-review" suffix; casinos
    // use "[name]-casino-review". Every differing indexed URL 301s to canonical.
    // Source of truth: docs/redirects.csv (keep in sync).
    redirects: {
        // Slot slug normalisation (drop -review; fix wiking->viking, meatball->meatballs)
        '/online-slots/1-million-bc-megaways-review/':
            '/online-slots/1-million-bc-megaways/',
        '/online-slots/aloha-spirit-xtralock-review/':
            '/online-slots/aloha-spirit-xtralock/',
        '/online-slots/anubis-wild-megaways-review/':
            '/online-slots/anubis-wild-megaways/',
        '/online-slots/astro-newts-megaways-review/':
            '/online-slots/astro-newts-megaways/',
        '/online-slots/atlantis-megaways-review/':
            '/online-slots/atlantis-megaways/',
        '/online-slots/big-bass-bonanza-megaways-review/':
            '/online-slots/big-bass-bonanza-megaways/',
        '/online-slots/big-cat-king-review/':
            '/online-slots/big-cat-king/',
        '/online-slots/bonanza-megapays-review/':
            '/online-slots/bonanza-megapays/',
        '/online-slots/centurion-megaways-review/':
            '/online-slots/centurion-megaways/',
        '/online-slots/diamond-fruits-megaclusters-review/':
            '/online-slots/diamond-fruits-megaclusters/',
        '/online-slots/expendables-megaways-review/':
            '/online-slots/expendables-megaways/',
        '/online-slots/gods-of-olympia-megaways-review/':
            '/online-slots/gods-of-olympia-megaways/',
        '/online-slots/gold-megaways-review/':
            '/online-slots/gold-megaways/',
        '/online-slots/hot-spin-megaways-review/':
            '/online-slots/hot-spin-megaways/',
        '/online-slots/hypernova-megaways-review/':
            '/online-slots/hypernova-megaways/',
        '/online-slots/kingmaker-megaways-review/':
            '/online-slots/kingmaker-megaways/',
        '/online-slots/lightning-strike-megaways-review/':
            '/online-slots/lightning-strike-megaways/',
        '/online-slots/loki-lord-of-mischief-megaways-review/':
            '/online-slots/loki-lord-of-mischief-megaways/',
        '/online-slots/lone-rider-xtraways-review/':
            '/online-slots/lone-rider-xtraways/',
        '/online-slots/luck-of-the-irish-megaways-review/':
            '/online-slots/luck-of-the-irish-megaways/',
        '/online-slots/machina-megaways-review/':
            '/online-slots/machina-megaways/',
        '/online-slots/monopoly-megaways-review/':
            '/online-slots/monopoly-megaways/',
        '/online-slots/musketeer-megaways-review/':
            '/online-slots/musketeer-megaways/',
        '/online-slots/mystic-bear-xtrahold-review/':
            '/online-slots/mystic-bear-xtrahold/',
        '/online-slots/pig-wizard-megaways-review/':
            '/online-slots/pig-wizard-megaways/',
        '/online-slots/pirate-pays-megaways-review/':
            '/online-slots/pirate-pays-megaways/',
        '/online-slots/pirates-bounty-megaways-review/':
            '/online-slots/pirates-bounty-megaways/',
        '/online-slots/power-of-thor-megaways-review/':
            '/online-slots/power-of-thor-megaways/',
        '/online-slots/rainbow-riches-megaways-review/':
            '/online-slots/rainbow-riches-megaways/',
        '/online-slots/red-tiger/dragons-fire-megaways-review/':
            '/online-slots/dragons-fire-megaways/',
        '/online-slots/red-tiger/dragons-luck-megaways-review/':
            '/online-slots/dragons-luck-megaways/',
        '/online-slots/red-tiger/nft-megaways-review/':
            '/online-slots/nft-megaways/',
        '/online-slots/rock-n-ways-xtraways-review/':
            '/online-slots/rock-n-ways-xtraways/',
        '/online-slots/royal-rumble-xtragacha-review/':
            '/online-slots/royal-rumble-xtragacha/',
        '/online-slots/santa-king-megaways-review/':
            '/online-slots/santa-king-megaways/',
        '/online-slots/spicy-meatball-megaways-review/':
            '/online-slots/spicy-meatballs-megaways/',
        '/online-slots/star-clusters-megaclusters-review/':
            '/online-slots/star-clusters-megaclusters/',
        '/online-slots/ted-megaways-review/':
            '/online-slots/ted-megaways/',
        '/online-slots/the-dog-house-megaways-review/':
            '/online-slots/the-dog-house-megaways/',
        '/online-slots/wiking-honour-xtrawild-review/':
            '/online-slots/viking-honour-xtrawild/',
        '/online-slots/wild-portals-megaways-review/':
            '/online-slots/wild-portals-megaways/',

        // Casino slug normalisation (-online-casino-review -> -casino-review)
        '/online-casinos/bitdreams-online-casino-review/':
            '/online-casinos/bitdreams-casino-review/',
        '/online-casinos/bitstarz-online-casino-review/':
            '/online-casinos/bitstarz-casino-review/',
        '/online-casinos/blueleo-online-casino-review/':
            '/online-casinos/blueleo-casino-review/',
        '/online-casinos/casitsu-online-casino-review/':
            '/online-casinos/casitsu-casino-review/',
        '/online-casinos/fastpay-online-casino-review/':
            '/online-casinos/fastpay-casino-review/',
        '/online-casinos/woo-online-casino-review/':
            '/online-casinos/woo-casino-review/',
    },
});