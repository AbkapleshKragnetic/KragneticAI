// src/app/admin/page.js
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUserForms: 0,
    totalDemoRequests: 0,
    totalWaitlist: 0,
    totalChatAnalysis: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'User Forms',
      value: stats.totalUserForms,
      icon: '📝',
      href: '/admin/user-forms',
      color: 'bg-blue-500'
    },
    
    {
      title: 'Waitlist Entries',
      value: stats.totalWaitlist,
      icon: '📋',
      href: '/admin/waitlist',
      color: 'bg-purple-500'
    },
    
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                {stat.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          {stats.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 text-sm">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                  <span className="text-gray-600">{activity.type}</span>
                  <span className="font-medium text-gray-900">{activity.description}</span>
                  <span className="text-gray-500 ml-auto">{activity.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/user-forms"
            className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors"
          >
            <span className="block text-lg">View All Forms</span>
          </Link>
          <Link
            href="/admin/demo-requests"
            className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors"
          >
            <span className="block text-lg">Manage Demos</span>
          </Link>
          <Link
            href="/admin/export"
            className="bg-white/20 hover:bg-white/30 rounded-lg p-4 text-center transition-colors"
          >
            <span className="block text-lg">Export Data</span>
          </Link>
        </div>
      </div>
    </div>
  );
}