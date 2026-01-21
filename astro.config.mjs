// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://megawaysonline.com',
    trailingSlash: 'always',
    integrations: [icon(), mdx()],
    vite: {
        plugins: [tailwindcss()],
    },
    redirects: {
        // Red Tiger slots → flat structure (6 redirects)
        '/online-slots/red-tiger/dragons-fire-megaways-review/':
            '/online-slots/dragons-fire-megaways-review/',
        '/online-slots/red-tiger/pirates-plenty-megaways-review/':
            '/online-slots/pirates-plenty-megaways-review/',
        '/online-slots/red-tiger/big-cat-rescue-megaways-review/':
            '/online-slots/big-cat-rescue-megaways-review/',
        '/online-slots/red-tiger/nft-megaways-review/':
            '/online-slots/nft-megaways-review/',
        '/online-slots/red-tiger/dragons-luck-megaways-review/':
            '/online-slots/dragons-luck-megaways-review/',
        '/online-slots/red-tiger/primate-king-megaways/':
            '/online-slots/primate-king-megaways-review/',

        // Casino reviews → shorter URLs (8 redirects)
        '/online-casinos/bitstarz-online-casino-review/':
            '/online-casinos/bitstarz-casino-review/',
        '/online-casinos/fastpay-online-casino-review/':
            '/online-casinos/fastpay-casino-review/',
        '/online-casinos/casitsu-online-casino-review/':
            '/online-casinos/casitsu-casino-review/',
        '/online-casinos/bitdreams-online-casino-review/':
            '/online-casinos/bitdreams-casino-review/',
        '/online-casinos/woo-online-casino-review/':
            '/online-casinos/woo-casino-review/',
        '/online-casinos/blueleo-online-casino-review/':
            '/online-casinos/blueleo-casino-review/',
        '/online-casinos/rocket-play-online-casino/':
            '/online-casinos/rocketplay-casino-review/',
        '/online-casinos/oshi-online-casino/':
            '/online-casinos/oshi-casino-review/',
    },
});