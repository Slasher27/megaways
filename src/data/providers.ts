/**
 * Provider name → listing-slug resolution, driven by the providers collection.
 *
 * Canonical rule (Phase 4): a slot's `provider` frontmatter string equals the
 * provider stub's `name` exactly (e.g. "Big Time Gaming", "Red Tiger Gaming").
 * The stub's `slug` owns the URL (/online-slots/<slug>/), so display names and
 * URLs stay decoupled (e.g. "Big Time Gaming" → /online-slots/btg/).
 */
import { getCollection } from 'astro:content';

const providers = await getCollection('providers');

const slugByName = new Map(
	providers.map((p) => [p.data.name.toLowerCase(), p.data.slug]),
);

/** Resolve a provider display name to its listing slug (e.g. "Big Time Gaming" → "btg"). */
export function providerSlug(name: string): string {
	return (
		slugByName.get(name.toLowerCase()) ??
		name.toLowerCase().replace(/\s+/g, '-')
	);
}
