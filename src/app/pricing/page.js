"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
export default function Pricing() {
  const [formData, setFormData] = useState({
    fullname: "",
    company: "",
    email: "",
    jobTitle: "",
    phoneNumber: "",
    country: "",
    callsRange: "",
    userMessage: "",
    termsAndConditions: false,
  });
  const [formErrors, setFormErrors] = useState({});
  console.log(formErrors);

  const validateField = (name, value) => {
    switch (name) {
      case "fullname":
        if (!value.trim()) return "Full name is required";
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value))
          return "Full name should not contain numbers or symbols";
        break;
      case "company":
        if (!value.trim()) return "Company name is required";
        break;
      case "jobTitle":
        if (!value.trim()) return "jobTitle is required";
        break;
      case "country":
        if (!value.trim()) return "Country name is required";
      case "callsRange":
        if (!value.trim()) return "callsRange is required";
      case "userMessage":
        if (!value.trim()) return "userMessage is required";
        break;

      case "email":
        if (!value.trim()) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format";
        break;

      case "phoneNumber":
        if (!value.trim()) return "Phone number is required";
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value))
          return "Enter a valid 10-digit phone number";
        break;

      case "termsAndConditions":
        if (!value) return "You must accept the terms";
        break;

      default:
        return "";
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Update form data
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Validate this field
    const errorMsg = validateField(name, newValue);
    setFormErrors({
      ...formErrors,
      [name]: errorMsg,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Step 1: Validate all fields
 
    const errors = {};
    console.log(errors);
    for (const [name, value] of Object.entries(formData)) {
      const error = validateField(name, value);
      if (error) {
        errors[name] = error;
      }
    }

    // Step 2: Update the formErrors state
    setFormErrors(errors);

    // Step 3: Check if any errors exist
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    // Step 4: Submit if no errors
    setSubmitting(true);

    console.log("submitting", submitting);
    try {
      const res = await fetch("/api/userForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("result", result);
      if (res.ok) {
        // setMessage(result.message);
        setFormData({
          fullname: "",
          company: "",
          email: "",
          jobTitle: "",
          phoneNumber: "",
          country: "",
          callsRange: "",
          userMessage: "",
          termsAndConditions: false,
        });

        toast.success("form is submitted successfully");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong!");
      // setMessage('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // Optional: Track conversion event
    console.log("Thank you page viewed");
  }, []);
  const scrollToEarlyAccess = () => {
    const earlyAccessSection = document.getElementById("early-access");
    if (earlyAccessSection) {
      earlyAccessSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Sticky Navigation */}

        {/* Hero Section */}
        <section id="hero" className="pt-24 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="flex justify-center space-x-4 mb-8">
                <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    Pricing
                  </span>
                </div>
              </div>

              <h1
                className={`text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 transition-all duration-1000 `}
              >
                Simple pricing that{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  scales to suit your needs
                </span>
              </h1>

              <p
                className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200 `}
              >
                Scale your voice assistant with confidence across your
                organization and use cases with a transparent pricing structure.
              </p>
              <p
                className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200 `}
              >
                Ongoing use of the voice assistant is priced on a per-minute
                basis, which includes proactive performance improvements,
                maintenance and 24/7 support.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {/* Advanced Natural Language Understanding */}
              <div
                className={`flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 transition-all duration-1000 `}
              >
                <div className="lg:w-1/1">
                  <div className="sticky top-[100px]">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Included in all plans
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                      <div className="rounded-2xl p-5 border border-gray-50 shadow-md">
                        {/* <h3 className="text-xl font-bold text-gray-900 mb-4">Conversation Script Analysis</h3> */}
                        <p className="text-gray-600">
                          Support system including a web ticket portal and a
                          24/7/365 emergency support phone line
                        </p>
                      </div>

                      <div className=" rounded-2xl p-5 border border-gray-50 shadow-md">
                        {/* <h3 className="text-xl font-bold text-gray-900 mb-4">Omnichannel Customer Journey</h3> */}
                        <p className="text-gray-600">
                          The highest standards of data security with 24/7 data
                          infrastructure, compliance certificates and regular
                          audits and testing
                        </p>
                      </div>

                      <div className=" rounded-2xl p-5 border border-gray-50 shadow-md">
                        {/* <h3 className="text-xl font-bold text-gray-900 mb-4">ROI Optimization Engine</h3> */}
                        <p className="text-gray-600">
                          99.9% SLA for uptime on your phone lines
                        </p>
                      </div>

                      <div className=" rounded-2xl p-5 border border-gray-50 shadow-md">
                        {/* <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Automation</h3> */}
                        <p className="text-gray-600">
                          Monitoring and improving for maintenance and system
                          performance
                        </p>
                      </div>

                      <div className=" rounded-2xl p-5 border border-gray-50 shadow-md">
                        {/* <h3 className="text-xl font-bold text-gray-900 mb-4">Integrated Customer Data</h3> */}
                        <p className="text-gray-600">
                          Upgrades to the latest system features to ensure
                          best-in-class performance
                        </p>
                      </div>
                      <div className=" rounded-2xl p-5 border border-gray-50 shadow-md">
                        <p className="text-gray-600">
                          An ever-evolving tech stack built with the latest and
                          best-in-class technology for the best performance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-7 backdrop-blur-sm border border-gray-200">
                    <form
                      className=" w-full max-w-md"
                      onSubmit={handleFormSubmit}
                    >
                      {/* <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contact Us</h2> */}
                      <div className="block mb-4">
                        {/* <label className="text-gray-700">First name?<span>*</span></label> */}
                        <input
                          type="text"
                          name="fullname"
                          required
                          placeholder="Full Name"
                          value={formData.fullname}
                          onChange={handleChange}
                          className={`mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300  ${
                            formErrors.fullname
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.fullname && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.fullname}
                          </p>
                        )}
                      </div>
                      <div className="block mb-4">
                        {/* <label className="text-gray-700">Where do you work?<span>*</span></label> */}
                        <input
                          type="text"
                          name="company"
                          placeholder="Company name"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className={`mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300  ${
                            formErrors.company
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.company && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.company}
                          </p>
                        )}
                      </div>
                      <div className="block mb-4">
                        {/* <span className="text-gray-700">Email</span> */}
                        <input
                          type="email"
                          name="email"
                          placeholder="Email address"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className={`mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300  ${
                            formErrors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="block mb-4">
                        {/* <label className="text-gray-700">Where do you work?<span>*</span></label> */}
                        <input
                          type="text"
                          name="jobTitle"
                          placeholder="Job title"
                          required
                          value={formData.jobTitle}
                          onChange={handleChange}
                          className={`mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300  ${
                            formErrors.jobTitle
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.jobTitle && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.jobTitle}
                          </p>
                        )}
                      </div>

                      <div className="block mb-4">
                        {/* <label className="text-gray-700">Where do you work?<span>*</span></label> */}
                        <input
                          type="text"
                          name="phoneNumber"
                          placeholder="Phone number"
                          required
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          className={`mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300  ${
                            formErrors.phoneNumber
                              ? " border-b-red-500"
                              : " border-b-gray-300"
                          }`}
                        />
                        {formErrors.phoneNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.phoneNumber}
                          </p>
                        )}
                      </div>
                      <div className="block mb-4">
                        <select
                          className="mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300"
                          name="country"
                          onChange={handleChange}
                          value={formData.country}
                        >
                          <option value="">-- Select Country --</option>
                          <option value="IN">India</option>
                          <option value="US">United States</option>
                          <option value="UK">United Kingdom</option>
                          <option value="CA">Canada</option>
                          <option value="AU">Australia</option>
                        </select>
                        {formErrors.country && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.country}
                          </p>
                        )}
                      </div>
                      <div className="block mb-4">
                        <select
                          className="mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300"
                          name="callsRange"
                          onChange={handleChange}
                          value={formData.callsRange}
                        >
                          <option disabled="" value="">
                            Select a range
                          </option>
                          <option value="&lt; 10K">less than 10,000</option>
                          <option value="10K - 50K">10,000-50,000</option>
                          <option value="50K - 250K">50,000-250,000</option>
                          <option value="250K - 500K">250,000-500,000</option>
                          <option value="500K - 1M">500,000-1,000,000</option>
                          <option value="&gt; 1M">more than 1,000,000</option>
                        </select>
                        {formErrors.callsRange && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.callsRange}
                          </p>
                        )}
                      </div>

                      <div className="block mb-6">
                        <span className="text-gray-700">
                          What else can you tell us about your project
                        </span>
                        <textarea
                          name="userMessage"
                          required
                          value={formData.userMessage}
                          onChange={handleChange}
                          placeholder="Brief description of project requirements, budget, and timeline:"
                          rows="2"
                          className="mt-1 block w-full py-3 focus:outline-0 focus:border-b-blue-500 border-b border-b-gray-300"
                        ></textarea>
                        {formErrors.userMessage && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.userMessage}
                          </p>
                        )}
                      </div>
                      <p className="text-[14px]  mb-4">
                        Your personal data will be processed in accordance with
                        our Privacy Policy.
                      </p>
                      <label className="inline-flex space-x-3">
                        <input
                          type="checkbox"
                          name="termsAndConditions"
                          onChange={handleChange}
                          checked={formData.termsAndConditions}
                          className="form-checkbox text-blue-600 h-5 w-5"
                        />
                        <span className="text-[14px]">
                          I agree to PolyAI sending me promotional messages, as
                          described in the PolyAI Privacy Notice.
                        </span>
                      </label>
                      {formErrors.termsAndConditions && (
                        <p className="text-red-500 text-sm">
                          {formErrors.termsAndConditions}
                        </p>
                      )}
                      <div className="block mt-6">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                          {submitting ? "Submitting...." : "Submit"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  Kragnetic-AI
                </div>
                <p className="text-gray-400">
                  Omnichannel AI platform that unifies customer communications
                  and drives ROI with intelligent insights.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Omnichannel AI
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Script Analytics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Customer Data
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      ROI Insights
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Channels</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Voice Communications
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Email Automation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      SMS Messaging
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Chat Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2024 Kragnetic-AI Inc. All rights reserved.
              </p>

              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-4 opacity-60">
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">SOC2</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">ISO</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">GDPR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
