// src/app/api/admin/user-forms/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import { connectDB } from '@/lib/DbConnection';
import UserDemo from '@/models/UserDemo';

// MongoDB connection

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (search) {
      query.$or = [
        { fullname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (status !== 'all') {
      query.status = status;
    }

    // Get total count
    const total = await UserDemo.countDocuments();
    console.log("Total user forms:", total);

    // Get paginated results
    const forms = await UserDemo
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: forms,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching user forms:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user forms' },
      { status: 500 }
    );
  }
}