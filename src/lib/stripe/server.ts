'use server';

import type Stripe from 'stripe';

import { auth } from '@/src/lib/auth';

import { stripe } from './config';
import { createOrRetrieveCustomer, getErrorRedirect, getURL } from './utils';

type CheckoutResponse = {
  sessionId?: string;
  error?: string;
};

export async function checkoutWithStripe(
  priceId: string,
  redirectPath: string = '/settings'
): Promise<CheckoutResponse> {
  try {
    // Get the user from Supabase auth
    const session = await auth();

    if (!session || !session.user) {
      throw new Error('Could not get user session.');
    }

    const userId = session.user.id!;

    // Retrieve or create the customer in Stripe
    const customer = await getCustomer(userId, session.user.email!);

    let params: Stripe.Checkout.SessionCreateParams = {
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer,
      customer_update: {
        address: 'auto'
      },
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      metadata: {
        userId
      },
      cancel_url: getURL(redirectPath),
      success_url: getURL(redirectPath)
    };

    params = {
      ...params,
      mode: 'payment'
    };

    // Create a checkout session in Stripe
    let stripeSession;
    try {
      stripeSession = await stripe.checkout.sessions.create(params);
    } catch (err) {
      console.error(err);
      throw new Error('Unable to create checkout session.');
    }

    // Instead of returning a Response, just return the data or error.
    if (stripeSession) {
      return { sessionId: stripeSession.id };
    } else {
      throw new Error('Unable to create checkout session.');
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message
      };
    } else {
      return {
        error: 'An unknown error occurred.'
      };
    }
  }
}

const getCustomer = async (userId: string = '', email: string = '') => {
  const customer = await createOrRetrieveCustomer({
    userId,
    email
  });
  if (!customer) {
    throw new Error('Could not get customer.');
  }
  return customer;
};
export async function createStripePortal(currentPath: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Could not get user session.');
    }

    const customer = await getCustomer(session.user?.id, session.user?.email!);
    try {
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: getURL('/')
      });
      if (!url) {
        throw new Error('Could not create billing portal');
      }
      return url;
    } catch (err) {
      console.error(err);
      throw new Error('Could not create billing portal');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return getErrorRedirect(
        currentPath,
        error.message,
        'Please try again later or contact a system administrator.'
      );
    } else {
      return getErrorRedirect(
        currentPath,
        'An unknown error occurred.',
        'Please try again later or contact a system administrator.'
      );
    }
  }
}
