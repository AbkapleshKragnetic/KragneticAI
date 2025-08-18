

// import { connectDB } from '../../../lib/DbConnection';
// import WaitlistEntry from '../../../models/WaitlistEntry';
// import { NextResponse } from 'next/server';
//   export const runtime = 'edge';

// export async function POST(request) {
//   try {
//     const { email } = await request.json();
//     if (!email) {
//       return NextResponse.json({ error: 'Email is required' }, { status: 400 });
//     }

//     await connectDB();

//     // Check if already exists
//     const existing = await WaitlistEntry.findOne({ email });
    
//     if (existing) {
//       return NextResponse.json({ message: 'Already on the waitlist' }, { status: 200 });
//     }

//     const entry = new WaitlistEntry({
//       email,
//       originalEmail: email,
//       source: 'landing_page',
//       userAgent: request.headers.get('user-agent') || 'unknown',
//       ip: request.headers.get('x-forwarded-for') || 'unknown',
//       referrer: request.headers.get('referer') || 'direct'
//     });

//     await entry.save();

//     const total = await WaitlistEntry.countDocuments();

//     return NextResponse.json({
//       message: 'Successfully joined waitlist',
//       position: total,
//     }, { status: 201 });

//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
