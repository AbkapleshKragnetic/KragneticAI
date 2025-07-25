
import mongoose from "mongoose";
const userFormSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
    ,
    userMessage: {
        type: String,
        required: true
    },
    callsRange: {
        type: String,
        required: true

    },
    status: {
    type: String,
    enum: ['pending', 'contacted', 'converted', 'rejected'],
    default: 'pending'
    },
    termsAndConditions: {
        type: Boolean,
        required: true
    }

});

// Prevent model overwrite during hot reload
export default mongoose.models.userFormData ||
    mongoose.model('userFormData', userFormSchema);
