export interface StripePriceListItem {
    id: string;
    credits: number;
    price: number;
}
export declare const relevantEvents: Set<string>;
export declare const getURL: (path?: string) => string;
export declare const getErrorRedirect: (path: string, errorName: string, errorDescription?: string, disableButton?: boolean, arbitraryParams?: string) => string;
export declare const createOrRetrieveCustomer: ({ email, userId }: {
    email: string;
    userId: string;
}) => Promise<string>;
