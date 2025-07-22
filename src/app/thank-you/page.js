'use client'
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  useEffect(() => {
    // Optional: Track conversion event
    console.log('Thank you page viewed');
  }, []);

  return (
    <>
      <Head>
        <title>Thank You - Early Access Confirmed</title>
        <meta name="description" content="Thank you for joining our early access program. We'll be in touch soon!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
            {/* Success Animation */}
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg 
                className="w-10 h-10 text-white animate-pulse" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              You're In! 🎉
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Thank you for joining our early access program. We'll notify you as soon as we're ready to launch.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Priority access to beta features</li>
                  <li>• Exclusive product updates</li>
                  <li>• Direct line to our founding team</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  href="/"
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:shadow-lg transition-all duration-200 text-center"
                >
                  Back to Home
                </Link>
                
                <button
                  onClick={() => window.open('https://twitter.com/intent/tweet?text=Just%20signed%20up%20for%20early%20access%20to%20AI-driven%20conversations%20platform!', '_blank')}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-full font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200"
                >
                  Share on Twitter
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Questions? Email us at{' '}
                <a 
                  href="mailto:hello@yourcompany.com" 
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  hello@yourcompany.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}