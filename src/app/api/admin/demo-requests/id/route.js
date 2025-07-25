// src/app/api/admin/user-forms/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/DbConnection';
import UserForm from '@/models/UserForm';

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
    const total = await UserForm.countDocuments(query);

    // Get paginated results
    const forms = await UserForm
      .find(query)
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

// src/app/api/admin/user-forms/[id]/route.js
export async function PATCH(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;
    const body = await request.json();

    const updatedForm = await UserForm.findByIdAndUpdate(
      id,
      { 
        ...body,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedForm) {
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedForm
    });

  } catch (error) {
    console.error('Error updating form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update form' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = params;

    const deletedForm = await UserForm.findByIdAndDelete(id);

    if (!deletedForm) {
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Form deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete form' },
      { status: 500 }
    );
  }
}