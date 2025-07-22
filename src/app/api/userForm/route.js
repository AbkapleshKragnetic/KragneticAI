import { connectDB } from '../../../lib/DbConnection';
import UserForm from '../../../models/UserForm';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { 
      fullname, 
      company, 
      jobTitle, 
      phoneNumber, 
      country, 
      userMessage, 
      email, 
      callsRange, 
      termsAndConditions 
    } = body;

    // Validate required fields
    const requiredFields = {
      fullname,
      company,
      jobTitle,
      phoneNumber,
      country,
      userMessage,
      email,
      callsRange,
      termsAndConditions
    };

    // Check for missing fields
    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields', 
          missingFields 
        }, 
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if email already exists
    const existingUser = await UserForm.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' }, 
        { status: 409 }
      );
    }

    // Create new user form entry
    const userFormData = new UserForm({
      fullname,
      company,
      jobTitle,
      phoneNumber,
      country,
      userMessage,
      email,
      callsRange,
      termsAndConditions
    });

    // Save to database
    await userFormData.save();

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
    }, { status: 201 });

  } catch (error) {
    console.error('UserForm API Error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate entry found' }, 
        { status: 409 }
      );
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.message 
        }, 
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// Optional: Add GET method to retrieve form submissions (if needed)
export async function GET(request) {
  try {
    await connectDB();
    
    // You might want to add authentication here
    const forms = await UserForm.find({})
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json({
      success: true,
      data: forms,
      count: forms.length
    });
    
  } catch (error) {
    console.error('GET UserForm Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch forms' }, 
      { status: 500 }
    );
  }
}