import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function PaymentSuccess() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (router.query.session_id) {
      setSessionId(router.query.session_id as string);
    }
  }, [router.query.session_id]);

  return (
    <>
      <Head>
        <title>Payment Successful - Webly Industries</title>
        <meta name="description" content="Your payment has been processed successfully" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-green-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-200 mb-6">
              Thank you for your payment. Your transaction has been processed successfully.
            </p>

            {sessionId && (
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  Session ID: <span className="font-mono text-green-300">{sessionId}</span>
                </p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-white text-green-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Return to Homepage
              </button>
              
              <button
                onClick={() => router.push('/contact')}
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
              >
                Contact Support
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-300">
              <p>You will receive a confirmation email shortly.</p>
              <p>If you have any questions, please don't hesitate to contact us.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
