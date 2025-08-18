'use client'
import Link from 'next/link';
import { UseInViewAnimation } from '@/customHooks/UseInViewAnimation';
export default function Home() {
  const isVisible = UseInViewAnimation();

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Sticky Navigation */}

        {/* Hero Section */}
        <section id="hero" className={`mt-35  relative overflow-hidden transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} flex items-center `}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center ">
            <div className=" mb-12 ">
              <h1 className={`font-space font-medium text-[#00020e] mb-6 text-[64px] max-sm:text-[28px] `}>
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
           
          </div>
        </section>

      


      </div>
    </>
  );
}