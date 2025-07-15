'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const [isVisible, setIsVisible] = useState({});
  const [currentUseCase, setCurrentUseCase] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'

  const useCases = [
    {
      title: "SaaS Sales",
      description: "Qualify leads and book demos automatically",
      icon: "📊"
    },
    {
      title: "Legal Intake",
      description: "Collect client information with legal-grade accuracy",
      icon: "⚖️"
    },
    {
      title: "Healthcare",
      description: "HIPAA-compliant patient intake and scheduling",
      icon: "🏥"
    },
    {
      title: "Real Estate",
      description: "Property inquiries and showing appointments",
      icon: "🏠"
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
      <Head>
        <title>AI-Driven Conversations, Everywhere | Your Platform</title>
        <meta name="description" content="One event-driven platform to dial, qualify, and delight customers on every channel—while filling every form for you." />
        <meta property="og:title" content="AI-Driven Conversations, Everywhere" />
        <meta property="og:description" content="One event-driven platform to dial, qualify, and delight customers on every channel—while filling every form for you." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Sticky Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  YourCompany
                </div>
                <div className="hidden md:flex space-x-6">
                  <a href="#platform" className="text-gray-700 hover:text-indigo-600 transition-colors">Platform</a>
                  <a href="#use-cases" className="text-gray-700 hover:text-indigo-600 transition-colors">Use Cases</a>
                
                  <a href="#blog" className="text-gray-700 hover:text-indigo-600 transition-colors">Blog</a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
           
                <button onClick={scrollToEarlyAccess} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  EARLY ACCESS
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="pt-24 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
              <div className="flex justify-center space-x-4 mb-8">
                <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">Built on Cloudflare Workers</span>
                </div>
                <div className="flex items-center bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">AWS Activate Startup</span>
                </div>
              </div>
              
              <h1 className={`text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                AI-Driven Conversations,{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Everywhere
                </span>
              </h1>
              
              <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                One event-driven platform to dial, qualify, and delight customers on every channel—while filling every form for you.
              </p>
              
              <div className={`flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-400 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <button onClick={scrollToEarlyAccess} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Early Access
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">
                  Watch 90-sec Demo
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
                        <span>Dialing: +1 (555) 123-4567</span>
                      </div>
                      <div className="bg-gray-700 rounded p-2">
                        <span className="text-green-400">AI:</span> Hi John, this is Sarah from TechCorp...
                      </div>
                      <div className="bg-gray-600 rounded p-2">
                        <span className="text-blue-400">Customer:</span> I'm interested in your solution.
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-xl text-gray-600">Three powerful components working in harmony</p>
            </div>
            
            <div className="space-y-20">
              {/* Outbound AI Dialer */}
              <div className={`flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 transition-all duration-1000 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Outbound AI Dialer</h3>
                  <p className="text-xl text-gray-600 mb-6">
                    Turn cold leads into booked meetings, hands-free. Our autonomous dialer adapts scripts in-flight, balances agent utilization, and syncs every disposition to your CRM in real time.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                      <span>90% connect rate</span>
                    </div>
                    <div className="flex items-center text-blue-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                      <span>Real-time CRM sync</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 backdrop-blur-sm border border-gray-200">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Dialer Dashboard</h4>
                        <div className="flex items-center text-green-600">
                          <div className="w-2 h-2 bg-green-600 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm">Live</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Calls Today</span>
                          <span className="font-semibold">1,247</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Connect Rate</span>
                          <span className="font-semibold text-green-600">89.3%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Meetings Booked</span>
                          <span className="font-semibold text-blue-600">23</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inbound AI Intake */}
              <div className={`flex flex-col lg:flex-row-reverse items-center space-y-8 lg:space-y-0 lg:space-x-12 lg:space-x-reverse transition-all duration-1000 delay-200 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Inbound AI Intake</h3>
                  <p className="text-xl text-gray-600 mb-6">
                    Legal-grade intake with zero keystrokes. From immigration to personal-injury forms, our agent validates addresses, collects documents, and files everything directly into Clio or Lawmatics.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-purple-600">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                      <span>99.9% accuracy</span>
                    </div>
                    <div className="flex items-center text-indigo-600">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mr-2"></div>
                      <span>Direct CRM filing</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 backdrop-blur-sm border border-purple-200">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Intake Form</h4>
                        <div className="flex items-center text-purple-600">
                          <div className="w-2 h-2 bg-purple-600 rounded-full mr-2"></div>
                          <span className="text-sm">Auto-filling</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">Personal Information</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">Address Validation</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <span className="text-sm text-gray-600">Document Collection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event-Driven CDP */}
              <div className={`flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12 transition-all duration-1000 delay-400 ${isVisible['how-it-works'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Event-Driven CDP</h3>
                  <p className="text-xl text-gray-600 mb-6">
                    All your signals in one timeline. Calls, clicks, SMS opt-ins, and permission events stream into a real-time customer profile—ready for omnichannel campaigns.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center text-orange-600">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mr-2"></div>
                      <span>Real-time events</span>
                    </div>
                    <div className="flex items-center text-red-600">
                      <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
                      <span>360° customer view</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 backdrop-blur-sm border border-orange-200">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Customer Timeline</h4>
                        <div className="flex items-center text-orange-600">
                          <div className="w-2 h-2 bg-orange-600 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-sm">Streaming</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">Call completed</div>
                            <div className="text-xs text-gray-500">2 min ago</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">Email opened</div>
                            <div className="text-xs text-gray-500">1 hr ago</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium">SMS opt-in</div>
                            <div className="text-xs text-gray-500">3 hrs ago</div>
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

        {/* Dark Ops Cockpit */}
        <section id="ops-cockpit" className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Know exactly where calls drop off—and why</h2>
              <p className="text-xl text-gray-300">Advanced analytics and optimization tools</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Script A/B Testing by Persona</h3>
                <p className="text-gray-300">Optimize your scripts with real-time performance data across different customer segments.</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">🎙️</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Live Transcription & Sentiment</h3>
                <p className="text-gray-300">Real-time conversation analysis with emotional intelligence and tone detection.</p>
              </div>
              
              <div className="bg-gray-800 rounded-2xl p-8 hover:bg-gray-700 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Drop-off Heat-map with Auto-coach</h3>
                <p className="text-gray-300">Identify conversion bottlenecks and get AI-powered coaching recommendations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prompt Suite & Memory Layer */}
        <section id="prompt-suite" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Prompt experiments as easy as drag-and-drop</h2>
              <p className="text-xl text-gray-600">Powerful tools for AI conversation management</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Version Control</h3>
                <p className="text-gray-600">Track changes and rollback to previous versions with full audit trails.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rollbacks</h3>
                <p className="text-gray-600">Instantly revert to stable configurations when experiments don't perform.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Multivariate Testing</h3>
                <p className="text-gray-600">Test multiple prompt variations simultaneously with statistical significance.</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">GDPR/CCPA Safe Storage</h3>
                <p className="text-gray-600">Compliant data handling with automatic retention policies and deletion.</p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-language</h3>
                <p className="text-gray-600">Support for 50+ languages with context-aware translations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Case Carousel */}
        <section id="use-cases" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Every Industry</h2>
              <p className="text-xl text-gray-600">See how AI conversations transform your business</p>
            </div>
            
            <div className="relative">
              <div className="flex justify-center">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                  <div className="text-6xl mb-6">{useCases[currentUseCase].icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{useCases[currentUseCase].title}</h3>
                  <p className="text-gray-600 mb-6">{useCases[currentUseCase].description}</p>
                  <button className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                    Learn More
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
              <p className="text-xl text-gray-600">Built on the world's most trusted platforms</p>
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
                <span className="text-gray-600 font-medium">SOC 2-Ready</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-gray-600">HIPAA</span>
                </div>
                <span className="text-gray-600 font-medium">HIPAA-Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Timeline */}
        <section id="roadmap" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Product Roadmap</h2>
              <p className="text-xl text-gray-300">Our commitment to continuous innovation</p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-500 to-blue-500"></div>
              
              <div className="space-y-12">
                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">Q3 '24</h3>
                      <p className="text-gray-300">Beta voice platform launch</p>
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
                      <h3 className="text-xl font-bold mb-2">Q4 '24</h3>
                      <p className="text-gray-300">Voice GA + SMS integration</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-2">Q1 '25</h3>
                      <p className="text-gray-300">WhatsApp & Slack channels</p>
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
                      <h3 className="text-xl font-bold mb-2">Q2 '25</h3>
                      <p className="text-gray-300">Marketplace plug-ins ecosystem</p>
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
            <h2 className="text-4xl font-bold mb-4">Get Early Access</h2>
            <p className="text-xl mb-8 opacity-90">
              Join the waitlist and be among the first to experience the future of AI-driven conversations.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
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
              No spam, just early access updates and product announcements.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  YourCompany
                </div>
                <p className="text-gray-400">
                  AI-driven conversations that convert prospects into customers.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Outbound Dialer</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Inbound Intake</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Customer Data</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Use Cases</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">SaaS Sales</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Legal Intake</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Healthcare</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Real Estate</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2024 YourCompany Inc. • Built with ♥ on Cloudflare & AWS
              </p>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-4 opacity-60">
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">CF</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">AWS</span>
                  </div>
                  <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">G</span>
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