
import { connectDB } from '@/lib/DbConnection';

import UserForm from '@/models/UserForm';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { fullname, company,jobTitle,phoneNumber, country, userMessage,email, callsRange } = await request.json();
    if (!fullname||!company||!jobTitle||!phoneNumber||!country||userMessage||!email||!callsRange) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectDB();

    const existing = await UserForm.findOne({ email })
    
    if (existing) {
      return NextResponse.json({ message: 'Already registered email' }, { status: 200 });
    }

    const userFormData = new UserForm({
      fullname,
      company,
       jobTitle,
      phoneNumber,
      country,
      userMessage,
      email,
      callsRange
    });

    await userFormData.save();

   

    return NextResponse.json({
      message: 'message is send successfully',
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}