"use client"
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#00020e] border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-8">
                            <Link href="/" className="text-2xl text-[#ff4844] font-bold">
                                Kragnetic
                            </Link>

                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6">
                            <Link href="/" className="text-white hover:text-[#ff4844] transition-colors   max-lg:text-sm">Home</Link>
                            <Link href="/about-us" className="text-white hover:text-[#ff4844] transition-colors  max-lg:text-sm ">About Us</Link>
                            <Link href="/contact-us" className="text-white hover:text-[#ff4844] transition-colors  max-lg:text-sm ">Contact Us</Link>
                            <Link href="/book-demo" className="text-white hover:text-[#ff4844] transition-colors  max-lg:text-sm ">Request a demo</Link>
                        </div>

                        {/* Desktop Button */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link href="/book-demo" className="bg-[#ff4844] text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition  sm:px-[10px] sm:py-[5px]  md:py-[13px] ">
                                Get Your Revenue Assessment
                            </Link>
                        </div>

                        {/* Mobile Hamburger Icon */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
                                {isOpen ? <FiX /> : <FiMenu />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden bg-[#00020e] border-t border-gray-700">
                        <div className="flex flex-col items-center space-y-4 py-4">
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-white hover:text-[#ff4844] transition-colors">Home</Link>
                            <Link href="/about-us" onClick={() => setIsOpen(false)} className="text-white hover:text-[#ff4844] transition-colors">About Us</Link>
                            <Link href="/contact-us" onClick={() => setIsOpen(false)} className="text-white hover:text-[#ff4844] transition-colors">Contact Us</Link>
                            <Link href="/book-demo" onClick={() => setIsOpen(false)} className="text-white hover:text-[#ff4844] transition-colors">Request a demo</Link>
                            <Link href="/book-demo" onClick={() => setIsOpen(false)} className=" bg-[#ff4844] text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition">
                                Get Your Revenue Assessment
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
