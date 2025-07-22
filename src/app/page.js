'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const [currentUseCase, setCurrentUseCase] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    // Carousel rotation
    const interval = setInterval(() => {
      setCurrentUseCase((prev) => (prev + 1) % useCases.length);
    }, 3000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

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
        <section id="hero" className="pt-24 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="flex justify-center space-x-4 mb-8">
                <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Omnichannel Intelligence</span>
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Script Analytics</span>
                </div>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Omnichannel AI{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Customer Platform
                </span>
              </h1>
              
              <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Unified AI platform that handles voice, email, SMS, and chat conversations with real-time customer intelligence and script analytics. Drive ROI across every channel with generative AI insights.
              </p>
              
              <div className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-400 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <button onClick={scrollToEarlyAccess} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Start Free Trial
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">
                  Book a Demo
                </button>
              </div>
            </div>
            
            {/* Mock Device */}
            <div className={`flex justify-center transition-all duration-1000 delay-600 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative group">
                <div className="w-96 h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl transform group-hover:rotate-2 transition-transform duration-300 overflow-hidden">
                  <div className="p-6 text-white">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Multi-channel active: Voice, Email, SMS, Chat</span>
                      </div>
                      <div className="bg-gray-700 rounded p-2">
                        <span className="text-blue-400">AI Agent:</span> I see you contacted us via email yesterday. Let me continue helping with your account issue.
                      </div>
                      <div className="bg-gray-600 rounded p-2">
                        <span className="text-green-400">Customer:</span> Yes, I also sent an SMS but haven't heard back.
                      </div>
                      <div className="bg-gray-700 rounded p-2">
                        <span className="text-blue-400">AI Agent:</span> I have your full conversation history. Let me resolve this now...
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Omnichannel AI Infrastructure</h2>
              <p className="text-xl text-gray-600">Unified platform that connects every customer touchpoint</p>
            </div>
            
            <div className="space-y-20">
              {/* Advanced Natural Language Understanding */}
              <div className={`flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 transition-all duration-1000 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 backdrop-blur-sm border border-gray-200">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
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
              </div>

              {/* Seamless Integration */}
              <div className={`flex flex-col lg:flex-row-reverse items-center space-y-8 lg:space-y-0 lg:space-x-12 lg:space-x-reverse transition-all duration-1000 delay-200 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 backdrop-blur-sm border border-purple-200">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
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
              </div>

              {/* Real-time Performance Analytics */}
              <div className={`flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 transition-all duration-1000 delay-400 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 backdrop-blur-sm border border-orange-200">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
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
          </div>
        </section>

        {/* Enterprise Features */}
        <section id="ops-cockpit" className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Complete Customer Communication Suite</h2>
              <p className="text-xl text-gray-300">Everything you need to manage customer interactions across all channels</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">📞</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Intelligent Voice Management</h3>
                <p className="text-gray-300">AI-powered voice conversations with natural language processing and sentiment analysis for better customer experiences.</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Unified Messaging Platform</h3>
                <p className="text-gray-300">Integrated email, SMS, and chat management with automated workflows and intelligent routing capabilities.</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Advanced Analytics & Insights</h3>
                <p className="text-gray-300">Comprehensive analytics across all channels with ROI tracking, performance metrics, and predictive insights.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section id="prompt-suite" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Generative AI-Powered Platform</h2>
              <p className="text-xl text-gray-600">Advanced AI capabilities that drive results across every customer interaction</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Conversation Script Analysis</h3>
                <p className="text-gray-600">AI-powered analysis of call scripts with performance insights, conversion tracking, and optimization recommendations.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Omnichannel Customer Journey</h3>
                <p className="text-gray-600">Track and optimize customer interactions across voice, email, SMS, and chat with unified journey mapping.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">ROI Optimization Engine</h3>
                <p className="text-gray-600">Generative AI insights that identify revenue opportunities and provide actionable recommendations to increase ROI.</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Intelligent Automation</h3>
                <p className="text-gray-600">Automated workflows for inbound and outbound communications with smart routing and response generation.</p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Integrated Customer Data</h3>
                <p className="text-gray-600">Centralized customer profiles with conversation history, preferences, and behavior patterns across all touchpoints.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Case Carousel */}
        <section id="use-cases" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Results Across Industries</h2>
              <p className="text-xl text-gray-600">See how agencies and sales teams increase ROI with omnichannel AI</p>
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
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentUseCase ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Infrastructure & Compliance */}
        <section id="infrastructure" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise-Grade Infrastructure</h2>
              <p className="text-xl text-gray-600">Built on the world's most trusted cloud platforms</p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-gray-600">CF</span>
                </div>
                <span className="text-gray-600 font-medium">Cloudflare</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-gray-600">AWS</span>
                </div>
                <span className="text-gray-600 font-medium">AWS</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-gray-600">G</span>
                </div>
                <span className="text-gray-600 font-medium">Google Cloud</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-gray-600">SOC</span>
                </div>
                <span className="text-gray-600 font-medium">SOC 2 Type II</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-gray-600">ISO</span>
                </div>
                <span className="text-gray-600 font-medium">ISO 27001</span>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Timeline */}
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
        </section>

        {/* Early Access Form */}
        <section id="early-access" className="py-20 bg-gradient-to-br from-indigo-600 to-blue-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Scale Your Customer Communications?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join agencies and sales teams using Kragnetic-AI to deliver consistent experiences across voice, email, SMS, and chat while increasing ROI.
            </p>
            
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your work email"
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                />
                <button
                 
                  disabled={isSubmitting}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Starting...' : 'Start Free Trial'}
                </button>
              </div>
            </form>
            
            {submitMessage && (
              <div className={`mt-4 p-3 rounded-lg ${
                submitStatus === 'success' 
                  ? 'bg-green-500/20 text-green-100' 
                  : 'bg-red-500/20 text-red-100'
              }`}>
                <p className="text-sm font-medium">{submitMessage}</p>
              </div>
            )}
            
            <p className="mt-4 text-sm opacity-75">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
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
                  Omnichannel AI platform that unifies customer communications and drives ROI with intelligent insights.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Omnichannel AI</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Script Analytics</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Customer Data</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">ROI Insights</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Channels</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Voice Communications</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Email Automation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">SMS Messaging</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Chat Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
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