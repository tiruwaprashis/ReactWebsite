const mongoose = require('mongoose');

const DocumentRequestSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Please provide student ID'],
    trim: true
  },
  fullName: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  documentType: {
    type: String,
    enum: ['transcript', 'character'],
    required: true
  },
  purpose: {
    type: String,
    required: [true, 'Please specify purpose'],
    enum: [
      'higher_education',
      'employment',
      'scholarship',
      'visa',
      'personal',
      'other'
    ]
  },
  deliveryMethod: {
    type: String,
    enum: ['email', 'pickup'],
    required: true
  },
  additionalNotes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DocumentRequest', DocumentRequestSchema);