# Payment Integration Setup Guide

This guide will help you set up the payment integration for your Next.js application.

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id_here

# CashApp Configuration
CASHAPP_TAG=YourCashTag
```

## Setup Instructions

### 1. Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or log in
3. Get your API keys from the Developers > API keys section
4. Add your keys to `.env.local`

### 2. PayPal Setup
1. Go to [PayPal Developer](https://developer.paypal.com/)
2. Create an app in the My Apps & Credentials section
3. Get your Client ID
4. Add it to `.env.local`
5. Update the PayPal Client ID in `pages/pay.tsx` (line 15 and 65)

### 3. CashApp Setup
1. Update the `cashTag` variable in `pages/pay.tsx` (line 8)
2. Replace `$YourCashTag` with your actual CashTag

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Visit `http://localhost:3000/pay` to see the payment page

## Features

- **CashApp**: Redirects to your CashTag link
- **PayPal**: Integrated Smart Payment Buttons
- **Stripe**: Creates checkout sessions via API route

## File Structure

```
pages/
├── pay.tsx                          # Main payment page
├── payment-success.tsx              # Success page
├── payment-cancel.tsx               # Cancel page
└── api/
    └── create-checkout-session.ts   # Stripe API route
```

## Customization

- Update payment amounts in the respective handlers
- Modify styling by editing the Tailwind classes
- Add additional payment methods by following the existing pattern
- Customize success/cancel page content

## Security Notes

- Never commit your `.env.local` file
- Use test keys during development
- Switch to live keys only in production
- Validate all payment data on the server side
