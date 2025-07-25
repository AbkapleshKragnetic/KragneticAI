// src/app/api/admin/stats/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import UserForm from '@/models/UserForm';
import UserDemo from '@/models/UserDemo';
import WaitlistEntry from '@/models/WaitlistEntry';
import { connectDB } from '@/lib/DbConnection';

export async function GET(request) {
  try {
    await connectDB();

    // Get counts for each collection
    const [totalUserForms, totalDemoRequests, totalWaitlist] = await Promise.all([
      UserDemo.countDocuments(),
      UserDemo.countDocuments(),
      WaitlistEntry.countDocuments()
    ]);

    // Get recent activity (last 5 entries from each collection)
    const recentActivity = [];
    
    const recentForms = await UserDemo.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .select('fullname createdAt');
    
    const recentDemos = await UserDemo.find()
      .sort({ createdAt: -1 })
      .limit(2)
      .select('name createdAt');
    
    const recentWaitlist = await WaitlistEntry.find()
      .sort({ createdAt: -1 })
      .limit(1)
      .select('email createdAt');

    // Format recent activity
    recentForms.forEach(form => {
      recentActivity.push({
        type: 'User Form',
        description: `${form.fullname} submitted a form`,
        time: new Date(form.createdAt).toLocaleTimeString()
      });
    });

    recentDemos.forEach(demo => {
      recentActivity.push({
        type: 'Demo Request',
        description: `${demo.name} requested a demo`,
        time: new Date(demo.createdAt).toLocaleTimeString()
      });
    });

    recentWaitlist.forEach(entry => {
      recentActivity.push({
        type: 'Waitlist',
        description: `${entry.email} joined waitlist`,
        time: new Date(entry.createdAt).toLocaleTimeString()
      });
    });

    // Sort by time
    recentActivity.sort((a, b) => new Date(b.time) - new Date(a.time));

    return NextResponse.json({
      success: true,
      stats: {
        totalUserForms,
        totalDemoRequests,
        totalWaitlist,
        totalChatAnalysis: 0, // Add this when you have chat analysis data
        recentActivity: recentActivity.slice(0, 5)
      }
    });

  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}