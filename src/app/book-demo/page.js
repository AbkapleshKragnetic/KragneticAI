'use client'
import { useState } from 'react';
import { UseInViewAnimation } from '@/customHooks/UseInViewAnimation';
import { MdSubdirectoryArrowRight } from "react-icons/md";

export default function BookDemo() {
    const isVisible = UseInViewAnimation();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'
    const [formErrors, setFormErrors] = useState({});

    const validateField = (name, value) => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Full name is required";
                const nameRegex = /^[A-Za-z\s]+$/;
                if (!nameRegex.test(value))
                    return "Full name should not contain numbers or symbols";
                break;
            case "email":
                if (!value.trim()) return "Email is required";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Invalid email format";
                break;
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        const errorMsg = validateField(name, value);
        setFormErrors({
            ...formErrors,
            [name]: errorMsg,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Validate all fields before submission
        const errors = {};
        for (const [name, value] of Object.entries(formData)) {
            const error = validateField(name, value);
            if (error) {
                errors[name] = error;
            }
        }

        setFormErrors(errors);

        // Check if there are any errors
        if (Object.keys(errors).length > 0) {
            setSubmitMessage("Please fix the errors before submitting.");
            setSubmitStatus('error');

            // Clear error message after 5 seconds
            setTimeout(() => {
                setSubmitMessage('');
                setSubmitStatus('');
            }, 5000);
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');
        setSubmitStatus('');

        try {
            const response = await fetch('/api/book-demo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitMessage('Successfully added data to database! We\'ll contact you within 24 hours.');
                setSubmitStatus('success');
                setFormData({ name: '', email: '' }); // Clear form
                setFormErrors({}); // Clear errors
            } else {
                setSubmitMessage(data.message || 'Something went wrong. Please try again.');
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
        <div id="demo" className={`min-h-screen bg-white transition-all duration-1000 ${isVisible.demo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} `}  >

            {/* Main Content */}
            <section className="py-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-20">
                        {/* Left Column - Benefits */}
                        <div >
                            <p className="text-[16px] font-bold text-gray-900 mb-8 "> Get Your Revenue Assessment
                            </p>
                            <h2 className='  mb-3 leading-tight text-[38px] max-sm:text-[28px]   '>
                                See how Kragentic transforms missed opportunities into captured revenue
                            </h2>
                            <p className='text-[16px] mb-3'>
                                Schedule a personalized demonstration with our team to discover exactly how much additional revenue your business is leaving on the table - and how Kragentic captures it automatically.

                            </p>

                            <div className="space-y-6">
                                <div className="flex flex-start space-x-4 ">
                                    <div>
                                        <MdSubdirectoryArrowRight size={30} color='#ff4844' />
                                    </div>
                                    <div >
                                        <h3 className="text-[24px] font-semibold text-gray-900 mb-2 ">Instant Revenue Recognition</h3>
                                        <p className="text-gray-600">Feel the excitement of seeing your exact revenue potential within the first 15 minutes of our demo. <br />
                                            Calculate precisely how many leads you're losing to delayed responses, missed calls, and manual processes - then watch us show you the automated system that captures every single opportunity.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-start space-x-4">
                                    <div>
                                        <MdSubdirectoryArrowRight size={30} color='#ff4844' />
                                    </div>

                                    <div>
                                        <h3 className="text-[24px] font-semibold text-gray-900 mb-2">Seamless Implementation Power</h3>
                                        <p className="text-gray-600">Experience the relief of knowing your entire revenue system can be optimized without disrupting current operations. <br />
                                            Witness how Kragentic integrates with your existing CRM, scheduling tools, and business processes to enhance what's working while fixing what isn't - implementation in weeks, not months.

                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div>
                                        <MdSubdirectoryArrowRight size={30} color='#ff4844' />
                                    </div>

                                    <div >
                                        <h3 className="text-[24px] font-semibold text-gray-900 mb-2">Intelligent Optimization That Learns</h3>
                                        <p className="text-gray-600">Discover the confidence that comes from AI that gets smarter with every interaction. <br/>
                                            See real-time analytics showing how our ML and RL systems continuously optimize your scripts, pricing, scheduling, and lead nurturing to maximize conversion rates and customer lifetime value.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            
                        </div>

                        {/* Right Column - Form */}
                       <div>
                            <div className="bg-[#00020e] rounded-2xl shadow-xl p-8 border border-gray-200 sticky top-20">
                                <h2 className="text-2xl font-bold text-white mb-6">Get Your Revenue Assessment</h2>
                                <p className="text-white mb-8">Fill out the form below and we'll contact you within 24 hours to schedule your personalized demo.</p>

                                <form onSubmit={handleSubmit} className="space-y-6 text-white">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium  mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-3 rounded-lg border ${formErrors.name ? 'border-[#ff4844]' : 'border-gray-300'
                                                } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors disabled:opacity-50`}
                                            placeholder="John Doe"
                                        />
                                        {formErrors.name && (
                                            <p className="text-[#ff4844] text-sm mt-1">
                                                {formErrors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium  mb-2">
                                            Work Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            disabled={isSubmitting}
                                            className={`w-full px-4 py-3 rounded-lg border ${formErrors.email ? 'border-[#ff4844]' : 'border-gray-300'
                                                } focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors disabled:opacity-50`}
                                            placeholder="john.doe@company.com"
                                        />
                                        {formErrors.email && (
                                            <p className="text-[#ff4844] text-sm mt-1">
                                                {formErrors.email}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#ff4844] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none"
                                    >
                                        {isSubmitting ? 'Submitting...' : 'Submit'}
                                    </button>

                                    <p className="text-sm text-gray-500 text-center">
                                        By submitting this form, you agree to our terms and privacy policy.
                                    </p>
                                </form>

                                {submitMessage && (
                                    <div className={`mt-6 p-4 rounded-lg ${submitStatus === 'success'
                                        ? 'bg-green-50 text-green-800 border border-green-200'
                                        : 'bg-red-50 text-red-800 border border-red-200'
                                        }`}>
                                        <p className="font-medium">{submitMessage}</p>
                                    </div>
                                )}
                            </div>

                            {/* Trust Badge */}
                            <div className="mt-8 text-center">
                                <p className="text-sm text-gray-500">
                                    🔒 Your information is secure and will never be shared
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

         
        </div>
    );
}