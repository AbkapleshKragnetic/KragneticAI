"use client"
const Footer = () => {
  

    return (
       <footer className="bg-gray-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © 2025 Kragnetic-AI Inc. All rights reserved.
              </p>

              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center opacity-60 gap-[20px]">
                  <div className="bg-gray-700 px-2 py-1 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">SOC2</span>
                  </div>
                  <div className="bg-gray-700 px-2 py-1 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">ISO</span>
                  </div>
                  <div className="bg-gray-700 px-2 py-1 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">GDPR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
    )
}
export default Footer;