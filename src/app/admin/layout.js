// src/app/admin/layout.js
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'User Forms', href: '/admin/user-forms', icon: '📝' },
    { name: 'Waitlist', href: '/admin/waitlist', icon: '📋' },

  ];

  const isActive = (href) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-between px-4 bg-gray-800">
          <Link href="/admin" className="text-xl font-bold text-white">
            Admin Panel
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            ✕
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <span>←</span>
            <span>Back to Website</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : ''
      }`}>
        {/* Top Navigation */}
        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin User</span>
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}