import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function PayPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // CashApp redirect function
  const handleCashApp = () => {
    // Replace with your actual CashTag
    const cashTag = '$YourCashTag'; // Update this with your actual CashTag
    window.open(`https://cash.app/${cashTag}`, '_blank');
  };

  // PayPal integration
  const handlePayPal = () => {
    setIsLoading(true);
    setError('');
    
    // PayPal will be handled by the Smart Payment Buttons
    // The actual payment processing will be done by PayPal's SDK
  };

  // Stripe checkout session
  const handleStripe = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Add any necessary data for the checkout session
          amount: 1000, // Amount in cents (e.g., $10.00)
          currency: 'usd',
          // Add other necessary fields
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      setError('Failed to create checkout session. Please try again.');
      console.error('Stripe error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Payment Options - Webly Industries</title>
        <meta name="description" content="Choose your preferred payment method for Webly Industries services" />
        <script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Choose Payment Method
            </h1>
            <p className="text-xl text-gray-300">
              Select your preferred way to pay for Webly Industries services
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* CashApp Button */}
            <button
              onClick={handleCashApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-4"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-500 font-bold text-lg">$</span>
              </div>
              <span>Pay with Cash App</span>
            </button>

            {/* PayPal Button */}
            <div className="w-full">
              <div id="paypal-button-container" className="w-full"></div>
            </div>

            {/* Stripe Button */}
            <button
              onClick={handleStripe}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-4 disabled:cursor-not-allowed"
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">S</span>
              </div>
              <span>{isLoading ? 'Processing...' : 'Pay with Stripe'}</span>
            </button>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">
              All payments are secure and encrypted. Choose the method that works best for you.
            </p>
          </div>
        </div>
      </div>

      {/* PayPal Script */}
      <Script
        src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize PayPal buttons
          if (window.paypal) {
            window.paypal.Buttons({
              createOrder: function(data, actions) {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: '10.00' // Update with your actual amount
                    }
                  }]
                });
              },
              onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                  // Handle successful payment
                  console.log('Payment completed:', details);
                  alert('Payment successful!');
                });
              },
              onError: function(err) {
                console.error('PayPal error:', err);
                setError('PayPal payment failed. Please try again.');
              }
            }).render('#paypal-button-container');
          }
        }}
      />
    </>
  );
}
