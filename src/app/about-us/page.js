'use client'
import { useState, useEffect } from 'react';
import { UseInViewAnimation } from '@/customHooks/UseInViewAnimation';

export default function Aboutus() {
  const isVisible = UseInViewAnimation();

  return (
    <div className={`min-h-screen bg-white mt-[60px] transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className=' font-medium text-[57px] text-[#00020e] mb-6 leading-[60px] '>About Us</h2>
            <p className='text-xl text-[#1b2534] mb-8 font-light'>
              Learn more about our mission, vision, and the team behind Kragnetic-AI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div id="mission">
              <h3 className='text-xl text-[#1b2534] mb-8 font-bold '>Our Mission</h3>
              <p className=' text-xl text-[#1b2534] mb-8 font-light' >
                At Kragnetic-AI, our mission is to revolutionize customer engagement by providing an AI-driven platform that handles voice, email, SMS, and chat conversations with real-time intelligence and script analytics.
              </p>
              <p className='text-xl text-[#1b2534] mb-8 font-light' >
                We aim to drive ROI across every channel with generative AI insights that optimize customer interactions and enhance business outcomes.
              </p>
            </div>

            <div id="vision">
              <h3 className='text-xl text-[#1b2534] mb-8 font-bold '>Our Vision</h3>
              <p className='text-xl text-[#1b2534] mb-8 font-light '>
                Our vision is to become the leading provider of omnichannel AI solutions, empowering businesses to deliver exceptional customer experiences and achieve sustainable growth.
              </p>
              <p className='text-xl text-[#1b2534] mb-8 font-light'>
                We strive to continuously innovate and adapt to the evolving needs of our customers, ensuring that our platform remains at the forefront of AI technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className='text-xl text-[#1b2534] mb-8 font-bold'>Meet the Team</h2>
            <p className='text-xl text-[#1b2534] mb-8 font-light '>
              Get to know the dedicated individuals who make Kragnetic-AI possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div id="john" className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img src="/team-member1.jpg" alt="Team Member 1" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className='text-xl text-[#1b2534] mb-8 font-bold'>John Doe</h3>
              <p className=' text-md text-[#1b2534] mb-8 font-light'>CEO & Founder</p>
            </div>

            <div id="jane" className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img src="/team-member2.jpg" alt="Team Member 2" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className='text-xl text-[#1b2534] mb-8 font-bold'>Jane Smith</h3>
              <p className='text-md text-[#1b2534] mb-8 font-light '>CTO</p>
            </div>

            <div id="emily" className="bg-white rounded-lg shadow-lg p-6 text-center">
              <img src="/team-member3.jpg" alt="Team Member 3" className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h3 className='text-xl text-[#1b2534] mb-8 font-bold '>Emily Johnson</h3>
              <p className='text-md text-[#1b2534] mb-8 font-light'>Head of Marketing</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
