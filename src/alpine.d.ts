// TypeScript declarations for Alpine.js and its plugins
import type { Alpine as AlpineType } from 'alpinejs';

// Declare Alpine.js plugin modules (they export a default plugin function)
declare module '@alpinejs/ui' {
	const plugin: (alpine: AlpineType) => void;
	export default plugin;
}

declare module '@alpinejs/focus' {
	const plugin: (alpine: AlpineType) => void;
	export default plugin;
}

declare module '@alpinejs/collapse' {
	const plugin: (alpine: AlpineType) => void;
	export default plugin;
}

// Augment the Window interface to include Alpine
declare global {
	interface Window {
		Alpine: AlpineType;
	}
}

// This export statement ensures TypeScript treats this as a module
export {};
