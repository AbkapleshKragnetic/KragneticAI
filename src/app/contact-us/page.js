'use client';
import { useState, useEffect } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaGlobe } from "react-icons/fa";
import { UseInViewAnimation } from '@/customHooks/UseInViewAnimation';

export default function Contactus() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const isVisible = UseInViewAnimation();



  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Full name is required";
        if (!/^[A-Za-z\s]+$/.test(value)) return "Full name should not contain numbers or symbols";
        break;
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
        break;
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message should be at least 10 characters long";
        break;
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const errors = {};
    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) errors[name] = error;
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      // setSubmitMessage("Please fix the errors before submitting.");
      setSubmitStatus('error');
      setTimeout(() => { setSubmitMessage(''); setSubmitStatus(''); }, 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus('');

    try {
      const response = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitMessage("We'll contact you within 24 hours.");
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setFormErrors({});
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
      setTimeout(() => { setSubmitMessage(''); setSubmitStatus(''); }, 5000);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-lg border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors disabled:opacity-50";

  return (
    <div className="min-h-screen bg-white mt-[60px]">
      <section
        id="contact"
        className={`py-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left Column - Info */}
            <div className='flex flex-col gap-4 '>
              <h1 className='font-space font-medium text-[57px] text-[#00020e] mb-6 leading-[60px]'>Get in touch</h1>
              <h3 className='text-xl text-[#1b2534] mb-8 max-w-[700px] font-light '>
                Looking to get in touch with someone at Kragnetic-AI? Let us know what you’re looking for and we’ll make sure we get you to the right place.
              </h3>
              <p className='flex items-center gap-2  '>

                <FaMapMarkerAlt className="text-[#ff4844] size-[20px]" />
                <span className=" font-semibold">123 Innovation Street, Silicon Valley, CA 94025, USA</span>
              </p>
              <p className='flex items-center gap-2 '>

                <FaPhone className="text-[#ff4844] size-[20px]" />
                <span className="font-semibold">+1 234 567 890</span>
              </p>
              <p className='flex items-center gap-2'>

                <FaEnvelope className="text-[#ff4844] size-[20px]" />
                <span className="font-semibold">contact@kragnetic-ai.com</span>
              </p>
              <p className='flex items-center gap-2 '>

                <FaGlobe className="text-[#ff4844] size-[20px]" />
                <span className="font-semibold">www.kragnetic-ai.com</span>
              </p>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mx-auto w-[450px] '>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact us</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll contact you within 24 hours
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="John Doe"
                      className={`${inputBase} ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Work Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="john.doe@company.com"
                      className={`${inputBase} ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      placeholder="Type your message..."
                      rows={4}
                      className={`${inputBase} ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ff4844] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none cursor-pointer"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to our terms and privacy policy.
                  </p>
                </form>

                {/* Status message */}
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
                <p className="text-sm text-gray-500">🔒 Your information is secure and will never be shared</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
