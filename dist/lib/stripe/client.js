import { loadStripe } from '@stripe/stripe-js';
var stripePromise;
var getStripe = function () {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
};
export default getStripe;
