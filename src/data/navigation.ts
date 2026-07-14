/**
 * Navigation configuration
 * Centralized navigation links for header/footer
 */

export interface NavLink {
	label: string;
	href: string;
}

export interface NavDropdown {
	label: string;
	items: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

// Type guard to check if item is a dropdown
export function isDropdown(item: NavItem): item is NavDropdown {
	return 'items' in item;
}

export const mainNavigation: NavItem[] = [
	{ label: 'Slots', href: '/online-slots/' },
	{ label: 'Casinos', href: '/online-casinos/' },
	{
		label: 'Providers',
		items: [
			// Every indexed provider listing + legacy nav providers with content.
			// (Yggdrasil removed in Phase 4: no slots, and the URL 404s on the live site.)
			{ label: 'Big Time Gaming', href: '/online-slots/btg/' },
			{ label: 'Blueprint Gaming', href: '/online-slots/blueprint/' },
			{ label: 'Iron Dog Studio', href: '/online-slots/iron-dog/' },
			{ label: 'iSoftBet', href: '/online-slots/isoftbet/' },
			{ label: 'Jelly', href: '/online-slots/jelly/' },
			{ label: 'Microgaming', href: '/online-slots/microgaming/' },
			{ label: 'NetEnt', href: '/online-slots/netent/' },
			{ label: 'PoggiPlay', href: '/online-slots/poggiplay/' },
			{ label: 'Pragmatic Play', href: '/online-slots/pragmatic-play/' },
			{ label: 'Red Tiger', href: '/online-slots/red-tiger/' },
			{ label: 'Relax Gaming', href: '/online-slots/relax/' },
			{ label: 'Scientific Games', href: '/online-slots/scientific-games/' },
			{ label: 'Stakelogic', href: '/online-slots/stakelogic/' },
		],
	},
	{
		label: 'Mechanics',
		items: [
			{ label: 'Megaways', href: '/megaways/' },
			{ label: 'Megaclusters', href: '/megaclusters/' },
			{ label: 'Megaquads', href: '/megaquads/' },
			{ label: 'Megapays', href: '/megapays/' },
			{ label: 'Megadrop', href: '/megadrop/' },
			{ label: 'Xtraways', href: '/xtraways/' },
		],
	},
];
