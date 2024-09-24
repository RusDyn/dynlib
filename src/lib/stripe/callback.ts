import type Stripe from 'stripe';

import { stripe } from '@/src/lib/stripe/config';

import type { StripePriceListItem } from './utils';
import { relevantEvents } from './utils';

// const body = await req.text();
// const sig = req.headers.get('stripe-signature') as string;
// eslint-disable-next-line max-params
export async function StripeCallback(
  body: string | Buffer,
  sig: string,
  stripePriceList: StripePriceListItem[],
  callback: (userId: string, item: StripePriceListItem, amount: number) => void
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret)
      return new Response('Webhook secret not found.', { status: 400 });
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log(`🔔  Webhook received: ${event.type}`);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = (session.metadata || {})['userId'];
          if (!userId) {
            throw new Error('User ID is missing from the session.');
          }

          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id
          );
          // Process each item in the session
          for (const item of lineItems.data) {
            if (!item.price || item.price.type !== 'one_time') {
              // Skip recurring items
              continue;
            }
            const priceId = item.price.id;
            const quantity = item.quantity || 1;

            const price = stripePriceList.find((price) => price.id === priceId);
            if (!price) {
              throw new Error(`Invalid price ID. ${priceId}`);
            }
            const credits = price.credits * quantity;
            console.log(`Adding ${credits} credits to user ${userId}.`);
            // Add credits to the user based on the product ID and quantity
            await callback(userId, price, quantity);
          }

          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.log(error);
      return new Response(
        'Webhook handler failed. View your Next.js function logs.',
        {
          status: 400
        }
      );
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400
    });
  }
  return new Response(JSON.stringify({ received: true }));
}
