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
        <div  id ="demo" className={`min-h-screen bg-white transition-all duration-1000 ${isVisible.demo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}  >
            {/* Hero Section */}
            <section className="pt-24 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="text-center">
                        <h1 className="font-space font-medium text-[57px] text-[#00020e] mb-6 leading-[60px]">
                            Book Your{' '}
                            <span className="text-[#ff4844] block">
                                Personalized Demo
                            </span>
                        </h1>
                        <p className="text-xl text-[#1b2534] mb-8 font-light">
                            Experience the power of our Omnichannel AI platform. See how we can transform your customer communications across all channels.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 ">
                        {/* Left Column - Benefits */}
                        <div >
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Book a Demo?</h2>

                            <div className="space-y-6">
                                <div className="flex flex-start space-x-4 ">
                                    
                                         <MdSubdirectoryArrowRight size={50} color='#ff4844'/>

                                    <div className='pt-[10px]'>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">See the Platform in Action</h3>
                                        <p className="text-gray-600">Get a live walkthrough of our unified AI platform managing voice, email, SMS, and chat interactions seamlessly.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                   <MdSubdirectoryArrowRight size={50} color='#ff4844'/>
                                    <div className='pt-[10px]'>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI Calculator</h3>
                                        <p className="text-gray-600">Discover your potential ROI increase with our proven analytics showing 247% average improvement.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <MdSubdirectoryArrowRight size={50} color='#ff4844'/>
                                    <div className='pt-[10px]'>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Capabilities Preview</h3>
                                        <p className="text-gray-600">Experience our generative AI analyzing conversations and providing real-time optimization suggestions.</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                      <MdSubdirectoryArrowRight size={50} color='#ff4844'/>
                                    <div  className='pt-[10px]'>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Solution Design</h3>
                                        <p className="text-gray-600">Get a tailored implementation plan specific to your industry and business needs.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-12 grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#ff4844]">500+</div>
                                    <div className="text-sm text-gray-600">Happy Clients</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#ff4844]">247%</div>
                                    <div className="text-sm text-gray-600">Avg ROI</div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="text-2xl font-bold text-[#ff4844]">24/7</div>
                                    <div className="text-sm text-gray-600">Support</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div>
                            <div className="bg-[#00020e] rounded-2xl shadow-xl p-8 border border-gray-200">
                                <h2 className="text-2xl font-bold text-white mb-6">Schedule Your Demo</h2>
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
                                            className={`w-full px-4 py-3 rounded-lg border ${
                                                formErrors.name ? 'border-[#ff4844]' : 'border-gray-300'
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
                                            className={`w-full px-4 py-3 rounded-lg border ${
                                                formErrors.email ? 'border-[#ff4844]' : 'border-gray-300'
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
                                        {isSubmitting ? 'Submitting...' : 'Book Demo'}
                                    </button>

                                    <p className="text-sm text-gray-500 text-center">
                                        By submitting this form, you agree to our terms and privacy policy.
                                    </p>
                                </form>

                                {submitMessage && (
                                    <div className={`mt-6 p-4 rounded-lg ${
                                        submitStatus === 'success'
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

            {/* CTA Section */}
            <section className="py-12 bg-gradient-to-br from-indigo-50 to-blue-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Join 500+ Companies Using Kragnetic-AI
                    </h2>
                    <p className="text-lg text-gray-600">
                        Transform your customer communications with our unified AI platform
                    </p>
                </div>
            </section>
        </div>
    );
}