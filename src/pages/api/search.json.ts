// API endpoint for search data
// Returns JSON with all slots and casinos for client-side search
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
	// Fetch all slots and casinos
	const [slots, casinos] = await Promise.all([
		getCollection('slots'),
		getCollection('casinos'),
	]);

	// Format data for search
	const searchData = {
		slots: slots.map((slot) => ({
			name: slot.data.name,
			slug: slot.data.slug,
			provider: slot.data.provider,
			url: `/online-slots/${slot.data.slug}/`,
			type: 'slot',
		})),
		casinos: casinos.map((casino) => ({
			name: casino.data.name,
			slug: casino.data.slug,
			url: `/online-casinos/${casino.data.slug}-casino-review/`,
			type: 'casino',
		})),
	};

	return new Response(JSON.stringify(searchData), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
