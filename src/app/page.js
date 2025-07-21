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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Kragnetic-AI
                </div>
                <div className="hidden md:flex space-x-6">
                  <a href="#platform" className="text-gray-700 hover:text-indigo-600 transition-colors">Platform</a>
                  <a href="#use-cases" className="text-gray-700 hover:text-indigo-600 transition-colors">Solutions</a>
                  <a href="#blog" className="text-gray-700 hover:text-indigo-600 transition-colors">Resources</a>
                  <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button onClick={scrollToEarlyAccess} className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        {/* --- rest of your JSX unchanged --- */}

        {/* Paste the rest of your component code here as there was no further conflict */}
      </div>
    </>
  );
}
