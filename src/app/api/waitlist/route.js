// Add this GET method to your existing src/app/api/waitlist/route.js file

import { connectDB } from "@/lib/DbConnection";
import WaitlistEntry from "@/models/WaitlistEntry";
import { NextResponse } from 'next/server';

export async function GET(request) {

  try {
    // Use your existing database connection method
    // if (mongoose.connections[0].readyState !== 1) {
     connectDB();
    // }
    console.log("Connected to the database");
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    const total = await WaitlistEntry.countDocuments();
   
    const entries = await WaitlistEntry
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: entries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}