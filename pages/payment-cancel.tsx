import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Payment Cancelled - Webly Industries</title>
        <meta name="description" content="Your payment has been cancelled" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Payment Cancelled
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Your payment was cancelled. No charges have been made to your account.
            </p>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/pay')}
                className="w-full bg-white text-red-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Try Again
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Return to Homepage
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-300">
              <p>If you need assistance, please contact our support team.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
