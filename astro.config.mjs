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

// https://astro.build/config
export default defineConfig({
    markdown: {
        rehypePlugins: [rehypeAccessibleTables],
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