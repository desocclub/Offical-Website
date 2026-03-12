const { google } = require('googleapis');

const SHEET_ID  = process.env.GOOGLE_SHEET_ID;
const SHEET_TAB = 'Sheet1';

const getAuth = () =>
  new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

/**
 * Appends one registration row to the Google Sheet.
 * Column order matches the headers added manually in Row 1:
 * Timestamp | Full Name | Email | Phone | Year |
 * Leader Name | Leader College |
 * Member 1 Name | Member 1 College |
 * Member 2 Name | Member 2 College |
 * Member 3 Name | Member 3 College |
 * Event | Transaction ID | Payment Screenshot | Registration ID | Status
 */
const appendRow = async (registration) => {
  const auth   = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  const {
    registeredAt, fullName, email, phone, year,
    leaderName, leaderCollege, members,
    event, transactionId, paymentScreenshotUrl, _id,
  } = registration;

  const m = (i) => members[i] || {};

  const row = [
    new Date(registeredAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    fullName,
    email,
    phone,
    year,
    leaderName,
    leaderCollege,
    m(0).name    || '',
    m(0).college || '',
    m(1).name    || '',
    m(1).college || '',
    m(2).name    || '',
    m(2).college || '',
    event,
    transactionId,
    paymentScreenshotUrl,
    String(_id),
    'Pending',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range:         `${SHEET_TAB}!A1`,
    valueInputOption: 'USER_ENTERED',
    requestBody:   { values: [row] },
  });
};

module.exports = { appendRow };
