
import { connectDB } from '@/lib/DbConnection';

import UserForm from '@/models/UserForm';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { fullname, company,jobTitle,phoneNumber, country, userMessage,email, callsRange,termsAndConditions } = await request.json();
    if (
      !fullname
      ||!company
      ||!jobTitle
      ||!phoneNumber
      ||!country
      ||!userMessage
      ||!email
      ||!callsRange
      ||!termsAndConditions) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectDB();

    const existing = await UserForm.findOne({ email })
    
    if (existing) {
      return NextResponse.json({ error: 'Already registered email' }, { status: 409 });
    }

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

    await userFormData.save();
    return NextResponse.json({
      message: 'message is send successfully',
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}