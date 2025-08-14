"use client"

import Link from 'next/link';

const Footer = () => {
  

    return (
       <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2025 Kragnetic-AI Inc. All rights reserved.
              </p>

              <div className="flex items-center space-x-6 mt-4 md:mt-0">
               <Link href="/about-us" className='underline'>About us</Link>
              </div>
            </div>
          </div>
        </footer>
    )
}
export default Footer;