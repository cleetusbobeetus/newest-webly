// Stripe Payment Integration for Webly Industries
// This works alongside existing "Get Started" buttons

class StripePaymentHandler {
    constructor() {
        this.stripe = null;
        this.isLoaded = false;
        this.init();
    }

    async init() {
        // Load Stripe.js
        await this.loadStripe();
        
        // Add payment options to existing buttons
        this.addPaymentOptions();
    }

    async loadStripe() {
        if (typeof Stripe === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://js.stripe.com/v3/';
            script.onload = () => {
                this.stripe = Stripe(STRIPE_CONFIG.publishableKey);
                this.isLoaded = true;
                console.log('✅ Stripe loaded successfully');
            };
            document.head.appendChild(script);
        } else {
            this.stripe = Stripe(STRIPE_CONFIG.publishableKey);
            this.isLoaded = true;
        }
    }

    addPaymentOptions() {
        // Add payment options to pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach((card, index) => {
            const existingButton = card.querySelector('.btn-primary');
            if (existingButton && !card.querySelector('.payment-options')) {
                this.addPaymentButtons(card, existingButton);
            }
        });
    }

    addPaymentButtons(card, existingButton) {
        // Create payment options container
        const paymentContainer = document.createElement('div');
        paymentContainer.className = 'payment-options';
        paymentContainer.style.cssText = `
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        `;

        // Add payment buttons
        const payNowBtn = document.createElement('button');
        payNowBtn.className = 'btn-payment';
        payNowBtn.innerHTML = '💳 Pay Now';
        payNowBtn.style.cssText = `
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            transition: all 0.3s ease;
        `;

        const payLaterBtn = document.createElement('button');
        payLaterBtn.className = 'btn-payment-secondary';
        payLaterBtn.innerHTML = '📧 Get Quote';
        payLaterBtn.style.cssText = `
            background: transparent;
            color: var(--primary);
            border: 2px solid var(--primary);
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 0.5rem;
            transition: all 0.3s ease;
        `;

        // Add hover effects
        payNowBtn.addEventListener('mouseenter', () => {
            payNowBtn.style.transform = 'translateY(-2px)';
            payNowBtn.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
        });
        payNowBtn.addEventListener('mouseleave', () => {
            payNowBtn.style.transform = 'translateY(0)';
            payNowBtn.style.boxShadow = 'none';
        });

        payLaterBtn.addEventListener('mouseenter', () => {
            payLaterBtn.style.transform = 'translateY(-2px)';
            payLaterBtn.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3)';
        });
        payLaterBtn.addEventListener('mouseleave', () => {
            payLaterBtn.style.transform = 'translateY(0)';
            payLaterBtn.style.boxShadow = 'none';
        });

        // Add click handlers
        payNowBtn.addEventListener('click', () => {
            this.handlePayment(card);
        });

        payLaterBtn.addEventListener('click', () => {
            // Scroll to contact form
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        });

        paymentContainer.appendChild(payNowBtn);
        paymentContainer.appendChild(payLaterBtn);
        
        // Insert after existing button
        existingButton.parentNode.insertBefore(paymentContainer, existingButton.nextSibling);
    }

    async handlePayment(card) {
        if (!this.isLoaded) {
            alert('Payment system is loading, please try again in a moment.');
            return;
        }

        // Determine which plan was selected
        const planName = this.getPlanFromCard(card);
        const plan = PRICING_PLANS[planName];
        
        if (!plan) {
            alert('Plan not found. Please contact us directly.');
            return;
        }

        if (plan.price === 0) {
            // Free consultation - redirect to contact
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        try {
            // Create checkout session
            const response = await this.createCheckoutSession(plan);
            
            if (response.error) {
                throw new Error(response.error.message);
            }

            // Redirect to Stripe Checkout
            const { error } = await this.stripe.redirectToCheckout({
                sessionId: response.sessionId
            });

            if (error) {
                throw new Error(error.message);
            }
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed: ' + error.message + '\n\nPlease contact us directly or try again.');
        }
    }

    getPlanFromCard(card) {
        const title = card.querySelector('.pricing-title')?.textContent?.toLowerCase();
        
        if (title?.includes('consultation')) return 'consultation';
        if (title?.includes('starter') && title?.includes('maintenance')) return 'starter_installment';
        if (title?.includes('starter')) return 'starter';
        if (title?.includes('professional')) return 'professional';
        if (title?.includes('enterprise')) return 'enterprise';
        
        return 'consultation'; // Default fallback
    }

    async createCheckoutSession(plan) {
        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: this.getPlanIdFromName(plan.name),
                    email: document.querySelector('input[name="email"]')?.value || ''
                })
            });

            const data = await response.json();

            if (data.success) {
                if (data.redirect) {
                    // Free consultation - redirect to contact
                    window.location.href = data.redirect;
                    return { success: true };
                } else if (data.url) {
                    // Redirect to Stripe Checkout
                    window.location.href = data.url;
                    return { success: true };
                }
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            
            // Fallback: show contact option
            const message = `
Payment system temporarily unavailable.

Please contact me directly:
📧 Email: ZaneLaFaver@gmail.com
📱 Phone: +1 (385) 253-2721

Plan: ${plan.name}
Price: $${(plan.price / 100).toFixed(2)}
            `;
            
            alert(message);
            
            // Scroll to contact form
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            
            return { error: { message: error.message } };
        }
    }

    getPlanIdFromName(planName) {
        const name = planName.toLowerCase();
        if (name.includes('consultation')) return 'consultation';
        if (name.includes('starter') && name.includes('maintenance')) return 'starter_installment';
        if (name.includes('starter')) return 'starter';
        if (name.includes('professional')) return 'professional';
        if (name.includes('enterprise')) return 'enterprise';
        return 'consultation';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StripePaymentHandler();
});
