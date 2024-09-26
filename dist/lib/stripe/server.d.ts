type CheckoutResponse = {
    sessionId?: string;
    error?: string;
};
export declare function checkoutWithStripe(priceId: string, redirectPath?: string): Promise<CheckoutResponse>;
export declare function createStripePortal(currentPath: string): Promise<string>;
export {};
