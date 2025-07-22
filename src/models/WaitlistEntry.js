
import mongoose from "mongoose";

const waitlistEntrySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  originalEmail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  source: String,
  status: {
    type: String,
    default: 'pending',
  },
  userAgent: String,
  ip: String,
  referrer: String,
});

// Prevent model overwrite during hot reload
export default mongoose.models.WaitlistEntry ||
 mongoose.model('WaitlistEntry', waitlistEntrySchema);
