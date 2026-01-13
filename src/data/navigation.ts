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
