/**
 * audit-responsive.mjs — device-matrix + accessibility audit for built pages.
 *
 * Catches the two classes of bug that eyeballing one or two viewports misses:
 *   1. horizontal page overflow at narrow widths (320px is the real floor)
 *   2. axe-core critical/serious violations, in BOTH colour schemes
 *
 * Usage (build first — this reads dist/):
 *   npm run build
 *   node scripts/audit-responsive.mjs /online-casinos/oshi-casino-review/
 *   node scripts/audit-responsive.mjs /online-slots/gold-megaways/ --shots
 *
 * Multiple paths are allowed. With no path it audits the four archetypes.
 * `--shots` writes shot-<path>-<width>.png into the CWD.
 *
 * Requires devDependencies playwright-core + axe-core, and a Chromium build:
 *   npx playwright install chromium-headless-shell
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ROOT = path.resolve(process.cwd(), 'dist');

let chromium, AXE;
try {
	({ chromium } = await import('playwright-core'));
	AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
} catch {
	console.error(
		'Missing deps. Run:\n  npm i -D playwright-core axe-core\n  npx playwright install chromium-headless-shell'
	);
	process.exit(1);
}

if (!fs.existsSync(ROOT)) {
	console.error('No dist/ — run `npm run build` first.');
	process.exit(1);
}

// Chromium headless shell location (playwright's standard cache).
function findChromium() {
	const base = path.join(
		process.env.LOCALAPPDATA || path.join(process.env.HOME || '', '.cache'),
		'ms-playwright'
	);
	if (!fs.existsSync(base)) return null;
	const dir = fs
		.readdirSync(base)
		.filter((d) => d.startsWith('chromium_headless_shell-'))
		.sort()
		.pop();
	if (!dir) return null;
	for (const rel of [
		'chrome-headless-shell-win64/chrome-headless-shell.exe',
		'chrome-headless-shell-linux64/chrome-headless-shell',
		'chrome-headless-shell-mac/chrome-headless-shell',
	]) {
		const p = path.join(base, dir, rel);
		if (fs.existsSync(p)) return p;
	}
	return null;
}

// Real-world floor to wide desktop. 320 and 768 are the ones that break.
const VIEWPORTS = [
	['iPhone SE', 320],
	['iPhone 12 mini', 375],
	['iPhone 14', 390],
	['Pro Max', 430],
	['tablet portrait', 768],
	['iPad Air', 820],
	['small laptop', 1018],
	['laptop', 1280],
	['desktop', 1440],
	['wide', 1920],
];

const DEFAULT_PATHS = [
	'/',
	'/online-slots/',
	'/online-slots/gold-megaways/',
	'/online-casinos/oshi-casino-review/',
];

/**
 * Git Bash (MSYS) rewrites a leading-"/" argument into a Windows path, e.g.
 * `/online-slots/x/` arrives as `C:/Program Files/Git/online-slots/x/`.
 * Recover the route, and normalise to a leading + trailing slash either way
 * (the site is trailingSlash: 'always').
 */
function normalizeTarget(t) {
	let s = String(t).replace(/\\/g, '/');
	const msys = s.match(/^[A-Za-z]:\/.*?\/Git\/(.*)$/);
	if (msys) s = '/' + msys[1];
	if (!s.startsWith('/')) s = '/' + s;
	if (!s.endsWith('/')) s += '/';
	return s;
}

const args = process.argv.slice(2);
const shots = args.includes('--shots');
const paths = args.filter((a) => !a.startsWith('--')).map(normalizeTarget);
const targets = paths.length ? paths : DEFAULT_PATHS;

const TYPES = {
	'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
	'.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
	'.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
	'.json': 'application/json', '.xml': 'application/xml', '.avif': 'image/avif',
};

const server = http.createServer((req, res) => {
	const p = decodeURIComponent(req.url.split('?')[0]);
	let f = path.join(ROOT, p);
	if (p.endsWith('/')) f = path.join(f, 'index.html');
	if (!fs.existsSync(f)) { res.writeHead(404); return res.end('not found'); }
	if (fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
	res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
	fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const exe = findChromium();
const browser = await chromium.launch(exe ? { executablePath: exe } : {});

let overflowCount = 0;
let a11yCount = 0;

for (const target of targets) {
	console.log(`\n${'='.repeat(64)}\n${target}\n${'='.repeat(64)}`);

	// --- 1. Overflow across the device matrix ---
	console.log('viewport'.padEnd(17) + 'width'.padStart(6) + '  overflow');
	for (const [name, w] of VIEWPORTS) {
		const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 });
		await page.goto(base + target, { waitUntil: 'networkidle' });
		const m = await page.evaluate(() => ({
			docW: document.documentElement.scrollWidth,
			winW: window.innerWidth,
			culprits: [...document.querySelectorAll('*')]
				.filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
				.slice(0, 3)
				.map((el) => `${el.tagName.toLowerCase()}.${String(el.className || '').split(' ')[0]}`),
		}));
		const over = m.docW - m.winW;
		if (over > 0) {
			overflowCount++;
			console.log(`${name.padEnd(17)}${String(w).padStart(6)}  OVERFLOW +${over}px -> ${m.culprits.join(', ')}`);
		} else {
			console.log(`${name.padEnd(17)}${String(w).padStart(6)}  ok`);
		}
		if (shots) {
			const slug = target.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home';
			await page.screenshot({ path: `shot-${slug}-${w}.png`, fullPage: false });
		}
		await page.close();
	}

	// --- 2. axe-core, both colour schemes, mobile + desktop ---
	for (const scheme of ['light', 'dark']) {
		for (const [label, w] of [['mobile', 390], ['desktop', 1440]]) {
			const page = await browser.newPage({
				viewport: { width: w, height: 1100 }, colorScheme: scheme, deviceScaleFactor: 1,
			});
			await page.goto(base + target, { waitUntil: 'networkidle' });
			await page.addScriptTag({ content: AXE });
			const r = await page.evaluate(async () =>
				window.axe.run(document, {
					runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
				})
			);
			const bad = r.violations.filter((v) => ['critical', 'serious'].includes(v.impact));
			a11yCount += bad.length;
			console.log(`axe ${scheme}/${label}: ${bad.length} critical/serious` +
				(bad.length ? ' -> ' + bad.map((v) => `${v.id}(${v.nodes.length})`).join(', ') : ''));
			for (const v of bad) console.log(`    ${v.id}: ${v.help}\n      ${v.nodes[0].html.slice(0, 140)}`);
			await page.close();
		}
	}
}

await browser.close();
server.close();

console.log(`\n${'='.repeat(64)}`);
console.log(`overflow failures: ${overflowCount} | axe critical/serious: ${a11yCount}`);
const failed = overflowCount > 0 || a11yCount > 0;
console.log(failed ? 'FAIL' : 'PASS');
process.exit(failed ? 1 : 0);
