import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://abkaplesh02:SVcorISo3Iig70SG@mern.rge1tdf.mongodb.net/KragneticAIDB?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

// Global cache for connection (to avoid multiple connections in dev)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  console.log("⏳ Attempting DB connection...");
  console.log("Current cache state:", cached);

  if (cached.conn) {
    console.log("✅ Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connected!");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
