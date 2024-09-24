var _a, _b;
import Stripe from 'stripe';
export var stripe = new Stripe((_b = (_a = process.env.STRIPE_SECRET_KEY_LIVE) !== null && _a !== void 0 ? _a : process.env.STRIPE_SECRET_KEY) !== null && _b !== void 0 ? _b : '', {
    // https://github.com/stripe/stripe-node#configuration
    // https://stripe.com/docs/api/versioning
    // @ts-ignore
    apiVersion: null,
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
        name: 'DynLib',
        version: '0.0.0',
        url: 'https://github.com/rusdyn/dynlib'
    }
});
