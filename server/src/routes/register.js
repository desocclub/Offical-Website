const express = require('express');
const { v2: cloudinary } = require('cloudinary');
const Registration = require('../models/Registration');
const upload = require('../middleware/upload');
const { appendRow } = require('../sheets');

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });

const runUpload = (req, res) =>
  new Promise((resolve, reject) => {
    upload.single('paymentScreenshot')(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

const validate = (body, file) => {
  const e = {};
  if (!body.fullName?.trim())
    e.fullName = 'Full name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email || ''))
    e.email = 'Valid email is required';
  if (!/^\d{10}$/.test((body.phone || '').replace(/\s/g, '')))
    e.phone = 'Valid 10-digit phone is required';
  if (!body.year)
    e.year = 'Academic year is required';
  if (!body.event)
    e.event = 'Event is required';
  if (!body.leaderName?.trim())
    e.leaderName = 'Group leader name is required';
  if (!body.leaderCollege?.trim())
    e.leaderCollege = 'Group leader college is required';
  if (!body.transactionId?.trim())
    e.transactionId = 'UPI Transaction ID is required';
  if (!file)
    e.paymentScreenshot = 'Payment screenshot is required';
  return Object.keys(e).length ? e : null;
};

router.post('/register', async (req, res) => {
  // Parse multipart form data
  try {
    await runUpload(req, res);
  } catch (err) {
    const msg =
      err.code === 'LIMIT_FILE_SIZE'
        ? 'File too large. Maximum 5 MB allowed.'
        : err.message;
    return res.status(400).json({ success: false, error: msg });
  }

  // Server-side validation
  const errors = validate(req.body, req.file);
  if (errors) return res.status(400).json({ success: false, errors });

  // Parse members JSON string sent from frontend
  let members = [];
  try {
    members = JSON.parse(req.body.members || '[]');
  } catch {
    // Malformed members array — ignore, save empty
  }

  try {
    // Upload screenshot to Cloudinary
    const paymentScreenshotUrl = await uploadToCloudinary(
      req.file.buffer,
      'genesis/payment-screenshots'
    );

    // Save registration to MongoDB
    const registration = await Registration.create({
      fullName:             req.body.fullName.trim(),
      email:                req.body.email.trim().toLowerCase(),
      phone:                req.body.phone.trim(),
      year:                 req.body.year,
      leaderName:           req.body.leaderName.trim(),
      leaderCollege:        req.body.leaderCollege.trim(),
      members,
      event:                req.body.event,
      transactionId:        req.body.transactionId.trim(),
      paymentScreenshotUrl,
    });

    // Append to Google Sheet (non-blocking — sheet failure won't break registration)
    appendRow(registration).catch((err) =>
      console.error('Google Sheets append failed:', err.message)
    );

    return res.status(201).json({ success: true, registrationId: registration._id });

  } catch (err) {
    // Handle unique index violations
    if (err.code === 11000) {
      const key = Object.keys(err.keyPattern || {})[0] || '';
      const msg =
        key.includes('email')
          ? 'This email is already registered for this event.'
          : key.includes('phone')
          ? 'This phone number is already registered for this event.'
          : key.includes('transactionId')
          ? 'This UPI Transaction ID has already been used.'
          : 'Duplicate registration detected.';
      return res.status(409).json({ success: false, error: msg });
    }

    console.error('Registration error:', err);
    return res.status(500).json({ success: false, error: 'Server error. Please try again.' });
  }
});

module.exports = router;
