/**
 * Payment-method slug → display label + icon, for the casino frontmatter
 * `paymentMethods[]` values. Brand logos from simple-icons where the brand
 * exists; lucide concept icons otherwise (never a fake logo).
 */
export interface PaymentMethodMeta {
	label: string;
	icon: string;
}

const methods: Record<string, PaymentMethodMeta> = {
	bitcoin: { label: 'Bitcoin', icon: 'simple-icons:bitcoin' },
	ethereum: { label: 'Ethereum', icon: 'simple-icons:ethereum' },
	litecoin: { label: 'Litecoin', icon: 'simple-icons:litecoin' },
	dogecoin: { label: 'Dogecoin', icon: 'simple-icons:dogecoin' },
	'bitcoin-cash': { label: 'Bitcoin Cash', icon: 'simple-icons:bitcoincash' },
	tether: { label: 'Tether', icon: 'simple-icons:tether' },
	ripple: { label: 'Ripple (XRP)', icon: 'simple-icons:ripple' },
	coinspaid: { label: 'CoinsPaid', icon: 'lucide:bitcoin' },
	visa: { label: 'Visa', icon: 'simple-icons:visa' },
	mastercard: { label: 'Mastercard', icon: 'simple-icons:mastercard' },
	maestro: { label: 'Maestro', icon: 'lucide:credit-card' },
	skrill: { label: 'Skrill', icon: 'lucide:wallet' },
	neteller: { label: 'Neteller', icon: 'lucide:wallet' },
	mifinity: { label: 'MiFinity', icon: 'lucide:wallet' },
	sticpay: { label: 'SticPay', icon: 'lucide:wallet' },
	ecopayz: { label: 'ecoPayz', icon: 'lucide:wallet' },
	ezeewallet: { label: 'eZeeWallet', icon: 'lucide:wallet' },
	paysafe: { label: 'Paysafe', icon: 'simple-icons:paysafe' },
	paysafecard: { label: 'paysafecard', icon: 'simple-icons:paysafe' },
	neosurf: { label: 'Neosurf', icon: 'lucide:ticket' },
	cashtocode: { label: 'CashtoCode', icon: 'lucide:ticket' },
	zimpler: { label: 'Zimpler', icon: 'lucide:smartphone' },
	interac: { label: 'Interac', icon: 'lucide:landmark' },
	instadebit: { label: 'InstaDebit', icon: 'lucide:landmark' },
	idebit: { label: 'iDebit', icon: 'lucide:landmark' },
};

/** Resolve a frontmatter slug; unknown slugs fall back to a readable label + generic icon. */
export function paymentMethodMeta(slug: string): PaymentMethodMeta {
	return (
		methods[slug] ?? {
			label: slug.replace(/-/g, ' '),
			icon: 'lucide:credit-card',
		}
	);
}
