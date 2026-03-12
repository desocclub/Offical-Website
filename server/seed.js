/**
 * seed.js — Insert test registrations directly into MongoDB + Cloudinary + Sheets
 * Usage:  node seed.js
 *         node seed.js --clean   (wipe all test entries first)
 */
require('dotenv').config();
const mongoose  = require('mongoose');
const { v2: cloudinary } = require('cloudinary');
const { appendRow } = require('./src/sheets');
const Registration = require('./src/models/Registration');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Tiny 1×1 red PNG (base64) used as a placeholder payment screenshot
const PLACEHOLDER_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

const SEED_DATA = [
  {
    fullName: 'Arjun Sharma',
    email: 'arjun.test@example.com',
    phone: '9876543810',
    year: '2nd Year',
    leaderName: 'Arjun Sharma',
    leaderCollege: 'KKWIEER Nashik',
    members: [
      { name: 'Priya Patil',    college: 'KKWIEER Nashik' },
      { name: 'Rohit Desai',    college: 'KKWIEER Nashik' },
      { name: 'Sneha Kulkarni', college: 'MIT Pune' },
    ],
    event: 'Hackathon',
    transactionId: 'TEST-TXN-001',
  },
  {
    fullName: 'Meera Joshi',
    email: 'meer4a.test@example.com',
    phone: '9876543810',
    year: '3rd Year',
    leaderName: 'Meera Joshi',
    leaderCollege: 'YCCE Nagpur',
    members: [
      { name: 'Aniket Wagh', college: 'YCCE Nagpur' },
      { name: 'Disha More',  college: 'VNIT Nagpur' },
      { name: '',            college: '' },
    ],
    event: 'UI/UX Challenge',
    transactionId: 'TEST-TXN-0042',
  },
  {
    fullName: 'Rahul Nair',
    email: 'rahu4l.test@example.com',
    phone: '9988796695',
    year: '1st Year',
    leaderName: 'Rahul Nair',
    leaderCollege: 'SIT Pune',
    members: [
      { name: 'Kavya Rao',    college: 'SIT Pune' },
      { name: 'Tushar Sane',  college: 'PCCOE Pune' },
      { name: '',             college: '' },
    ],
    event: 'Technical Quiz',
    transactionId: 'TEST-TXN-00943',
  },
  {
    fullName: 'Anjali Mehta',
    email: 'anjal4i.test@example.com',
    phone: '9876543810',
    year: '4th Year',
    leaderName: 'Anjali Mehta',
    leaderCollege: 'COEP Pune',
    members: [
      { name: 'Vivek Borse',  college: 'COEP Pune' },
      { name: 'Pooja Jagtap', college: 'COEP Pune' },
      { name: 'Nikhil Shah',  college: 'DJ Sanghvi Mumbai' },
    ],
    event: 'Paper Presentation',
    transactionId: 'TEST-TXN-0044',
  },
  {
    fullName: 'Kiran Pawar',
    email: 'kiran.test@example.com',
    phone: '9555444333',
    year: '2nd Year',
    leaderName: 'Kiran Pawar',
    leaderCollege: 'PICT Pune',
    members: [
      { name: 'Siddhi Gore',   college: 'PICT Pune' },
      { name: 'Aditya Shinde', college: 'PICT Pune' },
      { name: '',              college: '' },
    ],
    event: 'Coding Contest',
    transactionId: 'TEST-TXN-005',
  },
];

const uploadPlaceholder = () =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      PLACEHOLDER_PNG,
      { folder: 'genesis/payment-screenshots', public_id: 'test-placeholder' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );
  });

const run = async () => {
  const clean = process.argv.includes('--clean');

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME || 'desoc-genesis',
  });
  console.log('MongoDB connected');

  if (clean) {
    const result = await Registration.deleteMany({
      transactionId: { $in: SEED_DATA.map((d) => d.transactionId) },
    });
    console.log(`Cleaned ${result.deletedCount} test record(s)`);
    await mongoose.disconnect();
    return;
  }

  // Upload a single placeholder screenshot (reused for all test entries)
  console.log('Uploading placeholder screenshot to Cloudinary...');
  const screenshotUrl = await uploadPlaceholder();
  console.log('Screenshot URL:', screenshotUrl);

  let inserted = 0;
  let skipped  = 0;

  for (const data of SEED_DATA) {
    try {
      const members = data.members.filter((m) => m.name.trim());
      const registration = await Registration.create({
        ...data,
        members,
        paymentScreenshotUrl: screenshotUrl,
        registeredAt: new Date(),
      });

      // Append to Google Sheet (awaited in seed so all rows land before disconnect)
      try {
        await appendRow(registration);
        console.log(`✓ Inserted + Sheet: ${data.fullName} — ${data.event}`);
      } catch (sheetErr) {
        console.warn(`  Sheet append failed for ${data.event}:`, sheetErr.message);
        console.log(`✓ Inserted (no sheet): ${data.fullName} — ${data.event}`);
      }
      inserted++;
    } catch (err) {
      if (err.code === 11000) {
        console.log(`  Skipped (duplicate): ${data.fullName} — ${data.event}`);
        skipped++;
      } else {
        console.error(`  Error for ${data.fullName}:`, err.message);
      }
    }
  }

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
  console.log('Run with --clean to remove test entries.\n');
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
