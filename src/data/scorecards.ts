/**
 * Scorecard definitions — the single source for category labels, scale and
 * overall-score maths, shared by ReviewHero and ScoreBars (slots + casinos).
 *
 * Slots: 5 categories /5; the overall is the editorial `rating`.
 * Casinos: 6 categories /10; the overall is the arithmetic mean
 * (CASINO-REVIEW-PROTOCOL law 2 — computed, never hand-picked).
 */

export const SCORECARDS = {
	slot: {
		max: 5,
		rows: [
			['features', 'Features'],
			['winPotential', 'Win potential'],
			['baseGame', 'Base game'],
			['value', 'Value / RTP'],
			['presentation', 'Presentation'],
		],
	},
	casino: {
		max: 10,
		rows: [
			['trust', 'Trust & licensing'],
			['megawaysLibrary', 'Megaways library'],
			['bonusFairness', 'Bonus fairness'],
			['payments', 'Payments'],
			['support', 'Support'],
			['rgTools', 'RG tools'],
		],
	},
} as const;

export type ScorecardType = keyof typeof SCORECARDS;

export interface ScoreRow {
	key: string;
	label: string;
	value: number;
}

/** Category rows in display order; [] when no scorecard exists. */
export function scoreRows(
	type: ScorecardType,
	scores?: Record<string, number> | null,
): ScoreRow[] {
	if (!scores) return [];
	return SCORECARDS[type].rows
		.filter(([key]) => typeof scores[key] === 'number')
		.map(([key, label]) => ({ key, label, value: Number(scores[key]) }));
}

/** Arithmetic mean, one decimal (casino overall). */
export function meanScore(rows: ScoreRow[]): number | undefined {
	if (!rows.length) return undefined;
	return Math.round((rows.reduce((s, r) => s + r.value, 0) / rows.length) * 10) / 10;
}

/**
 * A casino's displayed score. Scored (protocol) reviews show the category
 * mean /10; unscored launch-era reviews keep their /5 rating, flagged so the
 * UI can label it honestly. Closed casinos have no score.
 */
export function casinoScore(data: {
	status?: string;
	rating?: number;
	scorecard?: Record<string, number> | null;
}): { score?: number; max: number; scored: boolean } {
	const mean = meanScore(scoreRows('casino', data.scorecard));
	if (data.status === 'closed') return { max: 10, scored: false };
	return mean !== undefined
		? { score: mean, max: 10, scored: true }
		: { score: data.rating, max: 5, scored: false };
}

/**
 * Hub ordering: scored casinos first (best score first), then unscored ones
 * A–Z (their launch-era ratings aren't comparable with protocol scores), then
 * `warning` casinos, then closed casinos last. Change the order HERE.
 */
export function rankCasinos<T extends { data: Parameters<typeof casinoScore>[0] & { name: string } }>(
	entries: T[],
): T[] {
	const tier = (e: T) =>
		e.data.status === 'closed' ? 3 : e.data.status === 'warning' ? 2 : casinoScore(e.data).scored ? 0 : 1;
	return [...entries].sort(
		(a, b) =>
			tier(a) - tier(b) ||
			(tier(a) === 0 ? (casinoScore(b.data).score ?? 0) - (casinoScore(a.data).score ?? 0) : 0) ||
			a.data.name.localeCompare(b.data.name),
	);
}

/** Verbal band for a score — the same words everywhere a score is shown. */
export function scoreLabel(score: number, max: number): string {
	const r = score / max;
	if (r >= 0.9) return 'Exceptional';
	if (r >= 0.8) return 'Excellent';
	if (r >= 0.7) return 'Very good';
	if (r >= 0.6) return 'Good';
	if (r >= 0.5) return 'Mixed';
	return 'Poor';
}
