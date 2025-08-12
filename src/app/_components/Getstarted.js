"use client"

import { useState } from 'react';
const Getstarted = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');
        setSubmitStatus('');

        const formData = new FormData(e.target);
        const email = formData.get('email');

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitMessage(data.message);
                setSubmitStatus('success');
                e.target.reset(); // Clear the form

                // Optional: Show position in queue
                if (data.position) {
                    setSubmitMessage(`${data.message} You're #${data.position} on the list!`);
                }
            } else {
                setSubmitMessage(data.message || data.error || 'Something went wrong. Please try again.');
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Submit error:', error);
            setSubmitMessage('Network error. Please check your connection and try again.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);

            // Clear message after 5 seconds
            setTimeout(() => {
                setSubmitMessage('');
                setSubmitStatus('');
            }, 5000);
        }
    };




    return (
        <section id="early-access" className="py-20 bg-gradient-to-r from-[#00020e] to-[#1b2534] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-[48px] font-bold mb-4">Ready to Scale Your Customer Communications?</h2>
                <p className="text-[22px] mb-8 opacity-90">
                    Join agencies and sales teams using Kragnetic-AI to deliver consistent experiences across voice, email, SMS, and chat while increasing ROI.
                </p>

                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className=" bg-white flex flex-col sm:flex-row rounded-full p-1">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your work email"
                            required
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-4 text-gray-900 placeholder-gray-500 focus:outline-none disabled:opacity-50"
                        />
                        <button

                            disabled={isSubmitting}
                            className=" bg-[#ff4844] text-white px-8 py-3 rounded-full font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                        >
                            {isSubmitting ? 'Starting...' : 'Start Free Trial'}
                        </button>
                    </div>
                </form>

                {submitMessage && (
                    <div className={`mt-4 p-3 rounded-lg ${submitStatus === 'success'
                        ? 'bg-green-500/20 text-green-100'
                        : 'bg-red-500/20 text-red-100'
                        }`}>
                        <p className="text-[16px]">{submitMessage}</p>
                    </div>
                )}

                <p className="mt-4 text-[16px] opacity-75">
                    No credit card required • 14-day free trial • Cancel anytime
                </p>
            </div>
        </section>
    )
}
export default Getstarted;