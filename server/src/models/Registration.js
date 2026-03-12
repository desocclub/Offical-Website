const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const registrationSchema = new mongoose.Schema({
  fullName:             { type: String, required: true, trim: true },
  email:                { type: String, required: true, trim: true, lowercase: true },
  phone:                { type: String, required: true, trim: true },
  year:                 { type: String, required: true },
  leaderName:           { type: String, required: true, trim: true },
  leaderCollege:        { type: String, required: true, trim: true },
  members:              { type: [memberSchema], default: [] },
  event:                { type: String, required: true },
  transactionId:        { type: String, required: true, trim: true },
  paymentScreenshotUrl: { type: String, required: true },
  registeredAt:         { type: Date, default: Date.now },
});

// Prevent duplicate registrations
registrationSchema.index({ email: 1, event: 1 }, { unique: true });
registrationSchema.index({ phone: 1, event: 1 }, { unique: true });
registrationSchema.index({ transactionId: 1 },   { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);
