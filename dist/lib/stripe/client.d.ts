import type { Stripe } from '@stripe/stripe-js';
declare const getStripe: () => Promise<Stripe | null>;
export default getStripe;
