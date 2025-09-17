// Stripe Configuration for Webly Industries
// Replace with your actual Stripe keys

const STRIPE_CONFIG = {
    // Test keys - replace with your live keys when ready
    publishableKey: 'pk_live_51S8R0NIT7NRdj7DWBhHEDUeBgVDs6ck5ZH5321Lu6wHF4BMOasal7MftK3qfQclVed5CgWvVrsPQrgxCsT1CzFtw00oS5ppVu0',
    secretKey: 'sk_test_your_secret_key_here', // Keep this server-side only!
    
    // Your Stripe account details
    businessName: 'Webly Industries',
    businessEmail: 'zanelafaverr@gmail.com',
    
    // Statement descriptor (appears on customer's bank statement)
    statementDescriptor: 'WEBLY INDUSTRIES',
    
    // Currency and locale
    currency: 'usd',
    locale: 'en',
    
    // Success and cancel URLs
    successUrl: window.location.origin + '/payment-success.html',
    cancelUrl: window.location.origin + '/payment-cancel.html',
    
    // Webhook endpoint (you'll need to set this up later)
    webhookSecret: 'whsec_your_webhook_secret_here'
};

// Pricing plans configuration
const PRICING_PLANS = {
    consultation: {
        name: 'Free Consultation',
        price: 0,
        description: 'Free website analysis and recommendations',
        features: [
            'Email Website Analysis',
            'Current Website Audit', 
            'Identify Weaknesses & Issues',
            'Improvement Recommendations',
            'Technology Upgrade Suggestions',
            'Performance Optimization Tips',
            'Custom Action Plan',
            'No Obligation'
        ]
    },
    
    starter_installment: {
        name: 'Starter Website + Maintenance',
        price: 30000, // $300.00 in cents
        description: '5-page website with monthly maintenance',
        features: [
            '5-Page Custom Website',
            'Mobile Responsive Design',
            'Basic SEO Optimization',
            'Contact Form Integration',
            'SSL Certificate Included',
            'Monthly Updates & Changes',
            'Priority Support',
            'Performance Monitoring',
            'Security Updates'
        ],
        recurring: {
            price: 9900, // $99.00 in cents
            interval: 'month'
        }
    },
    
    starter: {
        name: 'Starter Package',
        price: 299900, // $2,999.00 in cents
        description: '5-page custom website',
        features: [
            '5-Page Custom Website',
            'Mobile Responsive Design',
            'Basic SEO Optimization',
            'Contact Form Integration',
            '3 Months Free Maintenance',
            'SSL Certificate Included'
        ]
    },
    
    professional: {
        name: 'Professional Package',
        price: 799900, // $7,999.00 in cents
        description: '15-page advanced website with 3D graphics',
        features: [
            '15-Page Advanced Website',
            '3D Graphics & Animations',
            'AI-Powered Features',
            'E-commerce Integration',
            'Advanced Analytics',
            '6 Months Free Maintenance',
            'Priority Support',
            'Custom Admin Dashboard'
        ]
    },
    
    enterprise: {
        name: 'Enterprise Package',
        price: 1999900, // $19,999.00 in cents
        description: 'Unlimited pages with custom features',
        features: [
            'Unlimited Pages',
            'Custom WebGL Applications',
            'Advanced AI Integration',
            'Multi-language Support',
            'Custom API Development',
            '24/7 Priority Support',
            'White-label Solutions',
            'Custom Training'
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STRIPE_CONFIG, PRICING_PLANS };
}
