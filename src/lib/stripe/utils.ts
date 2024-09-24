import { getStripeCustomerId, updateUser } from '../db';
import { stripe } from './config';

export interface StripePriceListItem {
  id: string;
  credits: number;
  price: number;
}

export const relevantEvents = new Set([
  //'product.created',
  //'product.updated',
  //'product.deleted',
  //'price.created',
  //'price.updated',
  //'price.deleted',
  'checkout.session.completed'
  //'customer.subscription.created',
  //'customer.subscription.updated',
  //'customer.subscription.deleted'
]);

export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL &&
    process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
        process?.env?.NEXT_PUBLIC_VERCEL_URL &&
          process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : // If neither is set, default to localhost for local development.
          'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

const toastKeyMap: { [key: string]: string[] } = {
  status: ['status', 'status_description'],
  error: ['error', 'error_description']
};

const getToastRedirect = (
  path: string,
  toastType: string,
  toastName: string,
  toastDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
  // eslint-disable-next-line max-params
): string => {
  const [nameKey, descriptionKey] = toastKeyMap[toastType];

  let redirectPath = `${path}?${nameKey}=${encodeURIComponent(toastName)}`;

  if (toastDescription) {
    redirectPath += `&${descriptionKey}=${encodeURIComponent(toastDescription)}`;
  }

  if (disableButton) {
    redirectPath += `&disable_button=true`;
  }

  if (arbitraryParams) {
    redirectPath += `&${arbitraryParams}`;
  }

  return redirectPath;
};

export const getErrorRedirect = (
  path: string,
  errorName: string,
  errorDescription: string = '',
  disableButton: boolean = false,
  arbitraryParams: string = ''
  // eslint-disable-next-line max-params
) =>
  getToastRedirect(
    path,
    'error',
    errorName,
    errorDescription,
    disableButton,
    arbitraryParams
  );

export const createOrRetrieveCustomer = async ({
  email,
  userId
}: {
  email: string;
  userId: string;
}) => {
  // Check if the customer already exists in Supabase
  const dbStripeCustomerId = await getStripeCustomerId(userId);
  let stripeCustomerId: string | undefined;
  if (dbStripeCustomerId) {
    // Retrieve the Stripe customer ID using the customer ID, with email fallback
    const existingStripeCustomer =
      await stripe.customers.retrieve(dbStripeCustomerId);
    if (existingStripeCustomer) {
      stripeCustomerId = existingStripeCustomer.id;
    }
  } else {
    // If Stripe ID is missing from database, try to retrieve Stripe customer ID by email
    const stripeCustomers = await stripe.customers.list({ email: email });
    stripeCustomerId =
      stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
  }

  // If still no stripeCustomerId, create a new customer in Stripe
  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await createCustomerInStripe(userId, email);
  if (!stripeIdToInsert) throw new Error('Stripe customer creation failed.');

  if (stripeCustomerId) {
    // If db has a record but doesn't match Stripe, update Supabase record
    if (dbStripeCustomerId !== stripeCustomerId) {
      try {
        await updateUser(userId, { stripeCustomerId: stripeCustomerId });
      } catch (updateError) {
        throw new Error(`Db customer record update failed: ${updateError}`);
      }
    }
    // If db has a record and matches Stripe, return Stripe customer ID
    return stripeCustomerId;
  } else {
    // If db has no record, create a new record and return Stripe customer ID
    await updateUser(userId, { stripeCustomerId: stripeIdToInsert });
    return stripeIdToInsert;
  }
};

const createCustomerInStripe = async (userId: string, email: string) => {
  const customerData = { metadata: { userId }, email: email };
  const newCustomer = await stripe.customers.create(customerData);
  if (!newCustomer) {
    throw new Error('Stripe customer creation failed.');
  }
  return newCustomer.id;
};
