import mongoose from "mongoose";

const bookDemoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'scheduled', 'completed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // This will automatically manage createdAt and updatedAt
});

// Add index for email for better query performance
bookDemoSchema.index({ email: 1 });
bookDemoSchema.index({ createdAt: -1 });

// Prevent model overwrite during hot reload
export default mongoose.models.UserDemo|| 
    mongoose.model('UserDemo', bookDemoSchema);