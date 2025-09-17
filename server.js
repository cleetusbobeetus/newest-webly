// Webly Industries Backend Server
// Handles Stripe payments securely

// Load environment variables
require('dotenv').config({ path: './config.env' });

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Pricing plans configuration
const PRICING_PLANS = {
    consultation: {
        name: 'Free Consultation',
        price: 0,
        description: 'Free website analysis and recommendations'
    },
    starter_installment: {
        name: 'Starter Website + Maintenance',
        price: 30000, // $300.00 in cents
        description: '5-page website with monthly maintenance'
    },
    starter: {
        name: 'Starter Package',
        price: 299900, // $2,999.00 in cents
        description: '5-page custom website'
    },
    professional: {
        name: 'Professional Package',
        price: 799900, // $7,999.00 in cents
        description: '15-page advanced website with 3D graphics'
    },
    enterprise: {
        name: 'Enterprise Package',
        price: 1999900, // $19,999.00 in cents
        description: 'Unlimited pages with custom features'
    }
};

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { planId } = req.body;
        
        if (!planId) {
            return res.status(400).json({ error: 'Plan ID is required' });
        }

        const plan = PRICING_PLANS[planId];
        
        if (!plan) {
            return res.status(400).json({ error: 'Invalid plan ID' });
        }

        // Free consultation - redirect to contact
        if (plan.price === 0) {
            return res.json({ 
                success: true, 
                redirect: '/#contact',
                message: 'Free consultation - redirecting to contact form'
            });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: plan.name,
                        description: plan.description,
                    },
                    unit_amount: plan.price,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${req.headers.origin}/payment-success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/payment-cancel.html`,
            metadata: {
                plan: planId,
                customer_email: req.body.email || 'not_provided'
            },
            customer_email: req.body.email,
            billing_address_collection: 'required',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'SE', 'NO', 'DK', 'FI', 'CH', 'AT', 'BE', 'IE', 'PT', 'GR', 'LU', 'MT', 'CY', 'EE', 'LV', 'LT', 'PL', 'CZ', 'SK', 'SI', 'HU', 'RO', 'BG', 'HR', 'JP', 'SG', 'HK', 'NZ', 'MX', 'BR', 'AR', 'CL', 'CO', 'PE', 'UY', 'VE', 'ZA', 'EG', 'NG', 'KE', 'GH', 'MA', 'TN', 'DZ', 'IN', 'PK', 'BD', 'LK', 'NP', 'BT', 'MV', 'ID', 'MY', 'TH', 'VN', 'PH', 'KH', 'LA', 'MM', 'BN', 'TL', 'CN', 'KR', 'TW', 'MN', 'KZ', 'UZ', 'KG', 'TJ', 'TM', 'AF', 'IR', 'IQ', 'SY', 'LB', 'JO', 'IL', 'PS', 'SA', 'AE', 'QA', 'BH', 'KW', 'OM', 'YE', 'TR', 'RU', 'BY', 'UA', 'MD', 'GE', 'AM', 'AZ', 'KZ', 'UZ', 'KG', 'TJ', 'TM', 'AF', 'IR', 'IQ', 'SY', 'LB', 'JO', 'IL', 'PS', 'SA', 'AE', 'QA', 'BH', 'KW', 'OM', 'YE', 'TR', 'RU', 'BY', 'UA', 'MD', 'GE', 'AM', 'AZ']
            }
        });

        res.json({ 
            success: true, 
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ 
            error: 'Failed to create checkout session',
            message: error.message 
        });
    }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment succeeded:', session.id);
            // Here you can send confirmation emails, update databases, etc.
            break;
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent succeeded:', paymentIntent.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'Webly Industries Backend'
    });
});

// Serve the main website
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Webly Industries Backend running on port ${PORT}`);
    console.log(`📧 Contact: zanelafaverr@gmail.com`);
    console.log(`💳 Stripe integration: Ready`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    process.exit(0);
});
