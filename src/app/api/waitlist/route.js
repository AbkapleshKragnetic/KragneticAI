// // src/app/api/waitlist/route.js
// import { MongoClient } from 'mongodb';
// import { NextResponse } from 'next/server';

// // MongoDB Atlas connection configuration
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://abkaplesh02:SVcorISo3Iig70SG@mern.rge1tdf.mongodb.net/WaitlistDB?retryWrites=true&w=majority';
// const MONGODB_DB = 'KragneticAI'; // Your database name

// // Global variables to cache the connection
// let cachedClient = null;
// let cachedDb = null;

// // Function to connect to MongoDB Atlas
// async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     console.log('Using cached database connection');
//     return { client: cachedClient, db: cachedDb };
//   }

//   console.log('Creating new database connection to MongoDB Atlas');
  
//   try {
//     const client = new MongoClient(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
//     });

//     await client.connect();
//     console.log('Connected to MongoDB Atlas successfully');

//     const db = client.db(MONGODB_DB);
    
//     // Cache the connection
//     cachedClient = client;
//     cachedDb = db;

//     return { client, db };
//   } catch (error) {
//     console.error('MongoDB Atlas connection error:', error);
//     throw error;
//   }
// }

// export async function POST(request) {
//   console.log('Waitlist API endpoint called');
  
//   try {
//     // Parse request body
//     const body = await request.json();
//     const { email } = body;

//     console.log('Processing email:', email);

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !emailRegex.test(email)) {
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'Please provide a valid email address' 
//         },
//         { status: 400 }
//       );
//     }

//     // Connect to MongoDB Atlas
//     const { db } = await connectToDatabase();
//     const collection = db.collection('waitListEmails');

//     // Check if email already exists (case-insensitive)
//     const existingEmail = await collection.findOne({ 
//       email: { $regex: new RegExp(`^${email}$`, 'i') } 
//     });
    
//     if (existingEmail) {
//       console.log('Email already exists:', email);
//       return NextResponse.json(
//         { 
//           success: false,
//           message: 'You\'re already on the waitlist!' 
//         },
//         { status: 200 }
//       );
//     }

//     // Insert new email with metadata
//     const newEntry = {
//       email: email.toLowerCase(),
//       originalEmail: email,
//       createdAt: new Date(),
//       source: 'landing_page',
//       status: 'pending',
//       userAgent: request.headers.get('user-agent') || 'unknown',
//       ip: request.headers.get('x-forwarded-for') || 
//           request.headers.get('x-real-ip') || 
//           'unknown',
//       referrer: request.headers.get('referer') || 'direct'
//     };

//     const result = await collection.insertOne(newEntry);

//     console.log('Email saved successfully to MongoDB Atlas:', result.insertedId);

//     // Get total count for position
//     const totalCount = await collection.countDocuments();
//     console.log('Total emails in waitlist:', totalCount);

//     return NextResponse.json(
//       { 
//         success: true,
//         message: 'Successfully joined the waitlist! We\'ll notify you when we launch.',
//         position: totalCount
//       },
//       { status: 201 }
//     );

//   } catch (error) {
//     console.error('API Error:', error);
//     console.error('Error name:', error.name);
//     console.error('Error code:', error.code);
    
//     // Handle specific MongoDB errors
//     if (error.name === 'MongoServerError' || error.code === 11000) {
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'This email is already registered.',
//         },
//         { status: 409 }
//       );
//     }
    
//     // Connection errors
//     if (error.message.includes('connect') || 
//         error.message.includes('ECONNREFUSED') ||
//         error.message.includes('getaddrinfo')) {
//       return NextResponse.json(
//         { 
//           success: false,
//           error: 'Unable to connect to database. Please try again later.',
//           details: process.env.NODE_ENV === 'development' ? error.message : undefined
//         },
//         { status: 503 }
//       );
//     }
    
//     return NextResponse.json(
//       { 
//         success: false,
//         error: 'Failed to join waitlist. Please try again.',
//         details: process.env.NODE_ENV === 'development' ? error.message : undefined
//       },
//       { status: 500 }
//     );
//   }
// }

// // GET method to check API status and connection
// export async function GET(request) {
//   try {
//     const { db } = await connectToDatabase();
//     const collection = db.collection('emails');
//     const count = await collection.countDocuments();
    
//     return NextResponse.json({
//       success: true,
//       message: 'Waitlist API is working',
//       database: MONGODB_DB,
//       totalEmails: count,
//       status: 'Connected to MongoDB Atlas'
//     });
//   } catch (error) {
//     return NextResponse.json({
//       success: false,
//       error: 'Database connection failed',
//       details: error.message
//     }, { status: 503 });
//   }
// }


import { connectDB } from '@/lib/DbConnection';
import WaitlistEntry from '@/models/WaitlistEntry';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    // Check if already exists
    const existing = await WaitlistEntry.findOne({ email });
    
    if (existing) {
      return NextResponse.json({ message: 'Already on the waitlist' }, { status: 200 });
    }

    const entry = new WaitlistEntry({
      email,
      originalEmail: email,
      source: 'landing_page',
      userAgent: request.headers.get('user-agent') || 'unknown',
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      referrer: request.headers.get('referer') || 'direct'
    });

    await entry.save();

    const total = await WaitlistEntry.countDocuments();

    return NextResponse.json({
      message: 'Successfully joined waitlist',
      position: total,
    }, { status: 201 });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
