"use client"
import Link from "next/link";

const Header = () => {
  
    const scrollToEarlyAccess = () => {
        const earlyAccessSection = document.getElementById('early-access');
        if (earlyAccessSection) {
            earlyAccessSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#00020e] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <Link  href="/" className="text-2xl text-[#ff4844] ">
                                Kragnetic-AI
                            </Link>
                            <div className="hidden md:flex space-x-6">
                                {/* <Link href="/" className="text-gray-700 hover:text-indigo-600 transition-colors">Platform</Link> */}
                                <Link href="/" className="text-white hover:text-[#ff4844] transition-colors">Home</Link>
                                <Link href="/about-us" className="text-white hover:text-[#ff4844] transition-colors">About Us</Link>
                                <Link href="/contact-us" className="text-white hover:text-[#ff4844] transition-colors">Contact Us</Link>
                                <Link href="/book-demo" className="text-white hover:text-[#ff4844] transition-colors">Request a demo</Link>
                                {/* <Link href="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</Link> */}
                                 {/* <Link href="/chat-analysis" className="text-gray-700 hover:text-indigo-600 transition-colors">Chat Analysis </Link> */}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button onClick={scrollToEarlyAccess} className="bg-[#ff4844] text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header;