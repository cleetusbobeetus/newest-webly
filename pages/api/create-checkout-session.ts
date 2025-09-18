import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const { amount, currency = 'usd', description = 'Webly Industries Service' } = req.body;

    // Validate required fields
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: description,
              description: 'Professional web development services',
              images: ['https://weblyindustries.com/images/webly-logo.png'], // Add your logo URL
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/payment-cancel`,
      metadata: {
        // Add any additional metadata you need
        service: 'webly-industries',
      },
      // Optional: Add customer information if available
      // customer_email: customerEmail,
      // billing_address_collection: 'required',
      // shipping_address_collection: {
      //   allowed_countries: ['US'],
      // },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
