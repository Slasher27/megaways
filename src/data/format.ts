/**
 * Display formatting shared by review components. MDX components receive the
 * RAW frontmatter (no Zod coercion), so dates may arrive as strings — coerce.
 */
export function fmtDate(value?: Date | string | null): string | undefined {
	if (!value) return undefined;
	const d = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(d.getTime())) return undefined;
	return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Review TOC = the MDX body's H2s + the route-rendered closing sections
 * (Pros & Cons, Our verdict), numbered continuously like the design.
 * Returns the full list and a `num(id)` lookup for the section eyebrows.
 */
export function reviewToc(
	h2s: { depth: number; slug: string; text: string }[],
	opts: { prosCons: boolean; verdictHeadline?: string },
) {
	const toc = [...h2s];
	if (opts.prosCons) toc.push({ depth: 2, slug: 'pros-and-cons', text: 'Pros & Cons' });
	if (opts.verdictHeadline) toc.push({ depth: 2, slug: 'our-verdict', text: `Our Verdict: ${opts.verdictHeadline}` });
	const num = (slug: string) => String(toc.findIndex((h) => h.slug === slug) + 1).padStart(2, '0');
	return { toc, num };
}

export const eur =(n?: number | null) =>
	n === undefined || n === null ? undefined : `€${n.toLocaleString('en-GB')}`;
