'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UseInViewAnimation } from '@/customHooks/UseInViewAnimation';
import { FaPhone, FaRegEnvelope, FaChartBar } from "react-icons/fa";
import bgImage from "../../public/assests/images/bgImage.jpg"

export default function Home() {
  const isVisible = UseInViewAnimation();
  const [currentUseCase, setCurrentUseCase] = useState(0);

  const scrollToEarlyAccess = () => {
    const earlyAccessSection = document.getElementById('early-access');
    if (earlyAccessSection) {
      earlyAccessSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  




  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Sticky Navigation */}

        {/* Hero Section */}
        <section id="hero" className={`mt-35  relative overflow-hidden transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} flex items-center `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center ">
            <div className=" mb-12 ">
              <h1 className={`font-space font-medium  text-[#00020e] mb-6 text-[40px] max-sm:text-[28px] `}>
                Revenue Intelligence and
                <span className="text-[#ff4844] block">
                  Optimization That Never Sleeps
                </span>
              </h1>

              <p className={`text-xl text-[#1b2534] mb-8 max-w-[700px] mx-auto font-light max-sm:text-[20px]`}>
                AI-powered voice, chat, email, sms, and workflow optimization that converts more prospects, books more appointments, and maximizes every customer interaction.

              </p>

              <div className='flex flex-col justify-center items-center gap-5'>
                <Link href="/book-demo" className="text-center border-2 border-[#ff4844] bg-[#ff4844] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg">
                  Get Kragentic In Action
                </Link>
                <p className='text-xl text-[#1b2534] mb-8 max-w-[700px] mx-auto font-light max-sm:text-[20px]'>Join businesses already capturing 40% more revenue from the same lead volume
                </p>
              </div>
            </div>
          </div>
        </section>

      

        {/* AI Capabilities */}
        <section id="prompt-suite">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="  font-bold text-[#00020e] mb-2 leading-[48px] text-[30px] text-[40px] max-lg:text-[30px] max-sm:text-[24px]">Experience the Future of Customer Acquisition
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className=" rounded-2xl p-8 border border-purple-200 shadow-[5px_5px_10px_#ff4844]">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Never Miss Another Lead</h3>
                <p className="text-[16px] text-[#1b2534]">Feel the relief of knowing every call is answered, every chat is responded to, and every lead is captured - even at 3 AM when your competitors' phones go straight to voicemail.</p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 shadow-[5px_5px_10px_#ff4844]">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Quote Instantly, Close Faster</h3>
                <p className="text-[16px] text-[#1b2534]">Watch prospects say "yes" in real-time as AI delivers perfect pricing that considers your costs, competitor rates, and customer value - no more losing deals to delayed quotes.
                </p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 shadow-[5px_5px_10px_#ff4844]">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Book Smarter, Earn More</h3>
                <p className="text-[16px] text-[#1b2534]"> Experience the satisfaction of seeing your calendar fill with optimized appointments that consider travel time, service duration, and contractor availability - maximizing revenue per day.</p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 shadow-[5px_5px_10px_#ff4844]">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Scale Without Limits</h3>
                <p className="text-[16px] text-[#1b2534]">Feel the power of handling thousands of simultaneous conversations while maintaining the personal touch that builds customer loyalty and referrals.</p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 shadow-[5px_5px_10px_#ff4844]">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Optimize Everything</h3>
                <p className="text-[16px] text-[#1b2534]">Discover insights that transform your business as AI analyzes every conversation, identifies winning scripts, and continuously improves your conversion rates .</p>
              </div>
              <div className="rounded-2xl p-8 border border-purple-200 shadow-[5px_5px_10px_#ff4844]">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Integrate Seamlessly</h3>
                <p className="text-[16px] text-[#1b2534]">Breathe easy knowing your existing CRM, scheduling tools, and business systems work perfectly with Kragentic - no disruption, just enhancement.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="early-access" className="py-20 bg-gradient-to-r from-[#00020e] to-[#1b2534] text-white mt-5">
          <div className=" mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className=" font-bold mb-4 text-[40px] max-lg:text-[30px] max-sm:text-[24px]">Ready to Transform Every Lead Into Revenue?
            </h2>
            <div className='flex flex-col justify-center items-center gap-5'>
              <Link href="/book-demo" className="text-center border-2 border-[#ff4844] bg-[#ff4844] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg">
                Get Kragentic In Action
              </Link>
              <p className='text-xl text-white mb-8  mx-auto font-light'>Join businesses already capturing 40% more revenue from the same lead volume
              </p>
            </div>
            <p className="text-[30px]  mb-4">
              Ready to see your specific use case?

            </p>

            <p className="text-xl text-white mb-4  mx-auto font-light">
              Book a personalized demonstration where we'll show you exactly how Kragentic optimizes your current lead flow.
            </p>
               <div className='flex flex-col justify-center items-center gap-5'>
              <Link href="/book-demo" className="text-center border-2 border-[#ff4844] bg-[#ff4844] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg">
               Get Your Revenue Assessment 
              </Link>
             
            </div>
          </div>
        </section>

        {/* Use Case Carousel */}
        {/* <section id="use-cases" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[48px]  font-bold text-[#00020e] mb-2 leading-[48px]">Proven Results Across Industries</h2>
              <p className="text-[22px] text-[#1b2534] font-light">See how agencies and sales teams increase ROI with omnichannel AI</p>
            </div>

            <div className="relative">
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                  <div className="text-6xl mb-6">{useCases[currentUseCase].icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{useCases[currentUseCase].title}</h3>
                  <p className="text-gray-600 mb-6">{useCases[currentUseCase].description}</p>
                  <button className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                    View Case Study
                  </button>
                </div>
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                {useCases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentUseCase(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentUseCase ? 'bg-indigo-600' : 'bg-gray-300'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Roadmap Timeline
        <section id="roadmap" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Innovation Roadmap</h2>
              <p className="text-xl text-gray-300">Continuous innovation to stay ahead of the curve</p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-blue-500"></div>

              <div className="space-y-12">
                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">Q1 2024</h3>
                      <p className="text-gray-300">Advanced emotion recognition and sentiment analysis</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-indigo-500 rounded-full relative z-10"></div>
                  <div className="flex-1 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="w-4 h-4 bg-blue-500 rounded-full relative z-10"></div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">Q2 2024</h3>
                      <p className="text-gray-300">Multi-modal AI with video and document understanding</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">Q3 2024</h3>
                      <p className="text-gray-300">Industry-specific AI models and specialized training</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-purple-500 rounded-full relative z-10"></div>
                  <div className="flex-1 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full relative z-10"></div>
                  <div className="flex-1 text-left pl-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">Q4 2024</h3>
                      <p className="text-gray-300">Autonomous agent orchestration and workflow automation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}




      </div>
    </>
  );
}