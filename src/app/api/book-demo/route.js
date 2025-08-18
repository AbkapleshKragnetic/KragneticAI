// import { NextResponse } from 'next/server';
// import { connectDB } from '../../../lib/DbConnection';
// import UserDemo from '../../../models/UserDemo';


// // MongoDB connection
//   await connectDB();
// export async function POST(request) {
//   try {
//     // Connect to database
//     await connectDB();
    
//     const body = await request.json();
//     const { name, email } = body;

//     // Validate required fields
//     if (!name || !email) {
//       return NextResponse.json(
//         { success: false, message: 'Please provide both name and email' },
//         { status: 400 }
//       );
//     }

//     // Check if email already exists
//     const existingDemo = await UserDemo.findOne({ email });
//     if (existingDemo) {
//       return NextResponse.json(
//         { success: false, message: 'This email has already been registered for a demo. We\'ll contact you soon!' },
//         { status: 400 }
//       );
//     }

//     // Create new demo request
//     const newDemoRequest = new UserDemo({
//       name,
//       email
//     });

//     // Save to database
//     const savedRequest = await newDemoRequest.save();

//     console.log('Demo request saved:', {
//       id: savedRequest._id,
//       name: savedRequest.name,
//       email: savedRequest.email,
//       timestamp: savedRequest.createdAt
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Demo request submitted successfully! We\'ll contact you within 24 hours.',
//       requestId: savedRequest._id
//     });

//   } catch (error) {
//     console.error('Demo booking error:', error);
    
//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       const messages = Object.values(error.errors).map(err => err.message);
//       return NextResponse.json(
//         { success: false, message: messages.join(', ') },
//         { status: 400 }
//       );
//     }
    
//     // Handle duplicate key error
//     if (error.code === 11000) {
//       return NextResponse.json(
//         { success: false, message: 'This email is already registered for a demo.' },
//         { status: 400 }
//       );
//     }
    
//     return NextResponse.json(
//       { success: false, message: 'Internal server error. Please try again later.' },
//       { status: 500 }
//     );
//   }
// }

// // Optional: GET method to retrieve demo requests (for admin use)
// export async function GET(request) {
//   try {
//     await connectDB();
    
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page')) || 1;
//     const limit = parseInt(searchParams.get('limit')) || 10;
//     const skip = (page - 1) * limit;

//     // Get total count
//     const total = await UserDemo.countDocuments();

//     // Get paginated results
//     const demoRequests = await UserDemo
//       .find({})
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     return NextResponse.json({
//       success: true,
//       data: demoRequests,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit)
//       }
//     });

//   } catch (error) {
//     console.error('Error fetching demo requests:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch demo requests' },
//       { status: 500 }
//     );
//   }
// }