// Post-build guard for the 47 SEO-critical 301s (docs/redirects.csv).
// @astrojs/vercel emits redirect route regexes that only match the path
// WITHOUT a trailing slash (e.g. ^/online-slots/x-review$), while every
// indexed legacy URL ends in a slash (trailingSlash: 'always'). Make each
// permanent-redirect src tolerate an optional trailing slash so slashed
// requests 301 directly instead of falling through to the 404 route.
import { readFileSync, writeFileSync } from 'node:fs';

const CONFIG = '.vercel/output/config.json';
const EXPECTED = 47; // keep in sync with docs/redirects.csv

const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
let patched = 0;

for (const route of config.routes ?? []) {
	if (route.status === 301 && route.src?.endsWith('$') && !route.src.endsWith('/?$')) {
		route.src = route.src.slice(0, -1) + '/?$';
		patched++;
	}
}

if (patched !== EXPECTED) {
	console.error(
		`patch-vercel-redirects: expected ${EXPECTED} permanent redirects, patched ${patched}. ` +
			'Reconcile docs/redirects.csv, astro.config.mjs and this script.',
	);
	process.exit(1);
}

writeFileSync(CONFIG, JSON.stringify(config));
console.log(`patch-vercel-redirects: ${patched} redirect patterns now accept an optional trailing slash.`);
