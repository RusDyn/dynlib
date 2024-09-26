import type { StripePriceListItem } from './utils';
export declare function StripeCallback(body: string | Buffer, sig: string, stripePriceList: StripePriceListItem[], callback: (userId: string, item: StripePriceListItem, amount: number) => void): Promise<Response>;
