// TypeScript declarations for Alpine.js
import type { Alpine as AlpineType } from 'alpinejs';

// Augment the Window interface to include Alpine
declare global {
	interface Window {
		Alpine: AlpineType;
	}
}

// This export statement ensures TypeScript treats this as a module
export {};
