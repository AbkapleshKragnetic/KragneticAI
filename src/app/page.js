'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UseInViewAnimation } from '@/customHooks/UseInViewAnimation';
import { FaPhone , FaRegEnvelope , FaChartBar} from "react-icons/fa";
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

  const useCases = [
    {
      title: "Sales & Marketing",
      description: "Omnichannel customer engagement with AI-powered lead qualification and automated follow-ups",
      icon: "📈"
    },
    {
      title: "Customer Support",
      description: "Unified support across voice, email, SMS, and chat with intelligent routing and resolution",
      icon: "🎧"
    },
    {
      title: "Healthcare",
      description: "HIPAA-compliant patient communication platform with appointment scheduling and follow-ups",
      icon: "🏥"
    },
    {
      title: "Financial Services",
      description: "Secure customer communication with compliance monitoring and fraud detection capabilities",
      icon: "🏦"
    }
  ];

 
    
 

  


  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Sticky Navigation */}

        {/* Hero Section */}
        <section id="hero" className={`pt-24 pb-20 relative overflow-hidden transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className=" bg-cover bg-center h-96 w-full absolute inset-0 h-screen" ></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex gap-[30px]">
            <div className=" mb-12">
              <div className="flex  space-x-4 mb-8">
                <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Omnichannel Intelligence</span>
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Script Analytics</span>
                </div>
              </div>

              <h1 className={`font-space font-medium text-[57px] text-[#00020e] mb-6 leading-[60px] `}>
                Omnichannel AI{' '}
                <span className="text-[#ff4844] block">
                  Conversational Platform
                </span>
              </h1>

              <p className={`text-xl text-[#1b2534] mb-8 max-w-[700px] font-light`}>
                Unified AI platform that handles Voice, Email, SMS, and Chat conversations with real-time intelligence and script analytics drive ROI across every channel. Drive ROI across every channel with Generative AI insights.
              </p>

              <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4'>
                {/* <button onClick={scrollToEarlyAccess} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Start Free Trial
                </button> */}
                <div className="flex flex-row items-center gap-[15px]">

                  <Link href="/book-demo" className=" text-center border-2 border-[#1b2534] text-[#1b2534] px-8 py-3 rounded-full text-lg font-semibold hover:bg-[#1b2534] hover:text-[#ffffff] hover:shadow-lg">
                    Request a demo
                  </Link>
                  <div onClick={scrollToEarlyAccess} className="text-center border-2 border-[#ff4844] bg-[#ff4844] text-white px-8 py-3 rounded-full text-lg font-semibold hover:shadow-lg">
                    Get started
                  </div>
                </div>
           
              </div>
            </div>

            {/* Mock Device */}
            <div className='flex justify-center ml-auto'>
              <div className="relative group">
                <div className="w-96 h-64 bg-gradient-to-br from-[#00020e] to-[#1b2534] rounded-2xl shadow-2xl overflow-hidden h-[500px]">
                  <div className="p-6 text-white">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[green-400] rounded-full animate-pulse"></div>
                        <span>Multi-channel active: Voice, Email, SMS, Chat</span>
                      </div>
                      <div className="bg-[#1b2534] rounded p-2">
                        <span className="text-blue-400">AI Agent:</span> I see you contacted us via email yesterday. Let me continue helping with your account issue.
                      </div>
                      <div className="bg-gray-600 rounded p-2">
                        <span className="text-green-400">Customer:</span> Yes, I also sent an SMS but haven't heard back.
                      </div>
                      <div className="bg-[#1b2534] rounded p-2">
                        <span className="text-blue-400">AI Agent:</span> I have your full conversation history. Let me resolve this now...
                      </div>
                      <div className="bg-gray-600 rounded p-2">
                        <span className="text-green-400">Customer:</span> Thank you, I really need this sorted out quickly.
                      </div>

                      <div className="bg-[#1b2534] rounded p-2">
                        <span className="text-blue-400">AI Agent:</span> Absolutely. I’ve already escalated your case to priority support.
                      </div>

                      <div className="bg-gray-600 rounded p-2">
                        <span className="text-green-400">Customer:</span> Perfect, I appreciate the quick help.
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[48px]  font-bold text-[#00020e] mb-2 leading-[48px] ">Omnichannel AI Infrastructure</h2>
              <p className="text-[22px] text-[#1b2534] font-light">Unified platform that connects every customer touchpoint</p>
            </div>

            <div className="space-y-20">
              {/* Advanced Natural Language Understanding */}
              <div className='flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 '>
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Unified Customer Data Platform</h3>
                  <p className="text-xl text-gray-600 mb-6">
                    Consolidate customer interactions across voice, email, SMS, and chat into a single intelligence layer. Real-time customer profiles with conversation history and behavioral insights.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      <span>Unified profiles</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Multi-channel tracking</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                    <div className="rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Customer Intelligence Hub</h4>
                        <div className="flex items-center text-green-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm">Real-time</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Channel Interactions</span>
                          <span className="font-semibold text-green-600">847K/month</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Response Time</span>
                          <span className="font-semibold">2 sec</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">ROI Increase</span>
                          <span className="font-semibold text-blue-600">+247%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
           

              {/* Seamless Integration */}
              <div className='flex flex-col lg:flex-row-reverse items-center space-y-8 lg:space-y-0 lg:space-x-12 lg:space-x-reverse'>
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Generative AI Script Analytics</h3>
                  <p className="text-xl text-gray-600 mb-6">
                    Analyze conversation scripts across all channels with AI-powered insights. Identify what works, optimize performance, and increase conversion rates with data-driven recommendations.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-purple-600">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                      <span>Script optimization</span>
                    </div>
                    <div className="flex items-center text-indigo-600">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                      <span>Performance insights</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                 
                    <div className="rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Script Performance</h4>
                        <div className="flex items-center text-purple-600">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                          <span className="text-sm">Optimizing</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">Conversion Rate</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">Script Effectiveness</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">ROI Optimization</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            

              {/* Real-time Performance Analytics */}
              <div className='flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 '>
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Omnichannel Orchestration</h3>
                  <p className="text-xl text-gray-600 mb-6">
                    Seamlessly manage customer journeys across voice, email, SMS, and chat. Intelligent routing ensures customers get consistent experiences regardless of channel preference.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-orange-600">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                      <span>Smart routing</span>
                    </div>
                    <div className="flex items-center text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                      <span>Journey mapping</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                 
                    <div className="rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Channel Performance</h4>
                        <div className="flex items-center text-orange-600">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm">Live</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">Voice: 92% satisfaction</div>
                            <div className="text-xs text-gray-500">↑ 8% this month</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">Email: 3.2min avg response</div>
                            <div className="text-xs text-gray-500">↓ 40% faster</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">SMS: 94% open rate</div>
                            <div className="text-xs text-gray-500">↑ Industry leading</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
        </section>

        {/* Enterprise Features */}
        <section id="ops-cockpit" className="py-20 bg-[#00020e] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[48px]  font-bold text-[#ffffff] mb-2 leading-[48px]">Complete Customer Communication Suite</h2>
              <p className="text-[22px] text-[#ffffff] font-light">Everything you need to manage customer interactions across all channels</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="">
                  <FaPhone size={30} />
                </div>
                <h3 className="text-[22px] font-bold mt-2">Intelligent Voice Management</h3>
                <p className="text-[18px] text-gray-300 mt-1">AI-powered voice conversations with natural language processing and sentiment analysis for better customer experiences.</p>
              </div>

              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="">
                  <FaRegEnvelope size={30}/>
                </div>
                <h3 className="text-[22px] font-bold mt-2">Unified Messaging Platform</h3>
                <p className="text-[18px] text-gray-300 mt-1">Integrated email, SMS, and chat management with automated workflows and intelligent routing capabilities.</p>
              </div>

              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="">
                 <FaChartBar size={30}/>
                </div>
                <h3 className="text-[22px] font-bold mt-2">Advanced Analytics & Insights</h3>
                <p className="text-[18px] text-gray-300 mt-1">Comprehensive analytics across all channels with ROI tracking, performance metrics, and predictive insights.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section id="prompt-suite" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-[48px]  font-bold text-[#00020e] mb-2 leading-[48px]">Generative AI-Powered Platform</h2>
              <p className="text-[22px] text-[#1b2534] font-light">Advanced AI capabilities that drive results across every customer interaction</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className=" rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Conversation Script Analysis</h3>
                <p className="text-[16px] text-[#1b2534]">AI-powered analysis of call scripts with performance insights, conversion tracking, and optimization recommendations.</p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Omnichannel Customer Journey</h3>
                <p className="text-[16px] text-[#1b2534]">Track and optimize customer interactions across voice, email, SMS, and chat with unified journey mapping.</p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">ROI Optimization Engine</h3>
                <p className="text-[16px] text-[#1b2534]">Generative AI insights that identify revenue opportunities and provide actionable recommendations to increase ROI.</p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Intelligent Automation</h3>
                <p className="text-[16px] text-[#1b2534]">Automated workflows for inbound and outbound communications with smart routing and response generation.</p>
              </div>

              <div className="rounded-2xl p-8 border border-purple-200 hover:shadow-lg">
                <h3 className="text-[22px] font-bold mb-2 text-[#00020e]">Integrated Customer Data</h3>
                <p className="text-[16px] text-[#1b2534]">Centralized customer profiles with conversation history, preferences, and behavior patterns across all touchpoints.</p>
              </div>
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