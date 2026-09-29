import 'server-only';
import { Resend } from 'resend';

export interface CyberSabhaEmailDetails {
  registrationNumber: string;
  teamName: string;
  amount: number;
  status: string;
  leaderEmail: string;
  members: { fullName: string; email: string; isLeader: boolean }[];
  reason?: string;
}

const eventDetails = '7 October 2026, 9:00 AM–5:00 PM IST · JVN Hall, 4th Floor, CSD Department';
const clubEmail = process.env.CYBERSABHA_NOTIFICATION_EMAIL || 'desoc.club@gmail.com';
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char] || char));

export async function sendCyberSabhaEmail(kind: 'received' | 'verified' | 'rejected', details: CyberSabhaEmailDetails) {
  if (!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.CYBERSABHA_EMAIL_FROM || 'CyberSabha 2.0 <onboarding@resend.dev>';
  const greeting = `<p>Hello ${escapeHtml(details.teamName)},</p>`;
  const memberList = `<ul>${details.members.map((member) => `<li>${escapeHtml(member.fullName)}${member.isLeader ? ' (Team leader)' : ''}</li>`).join('')}</ul>`;
  let subject = `CyberSabha 2.0 registration ${details.registrationNumber}`;
  let body = '';

  if (kind === 'received') {
    body = `${greeting}<p>Your registration has been received and is pending payment verification.</p><p><strong>Registration ID:</strong> ${escapeHtml(details.registrationNumber)}<br><strong>Team:</strong> ${escapeHtml(details.teamName)}<br><strong>Total amount:</strong> ₹${details.amount}<br><strong>Status:</strong> Payment verification pending</p><p>Team members:</p>${memberList}<p>${eventDetails}</p><p>We will email you when the payment is verified.</p>`;
  } else if (kind === 'verified') {
    subject = `CyberSabha 2.0 registration confirmed: ${details.registrationNumber}`;
    body = `${greeting}<p>Your payment has been verified and your team registration is confirmed.</p><p><strong>Registration ID:</strong> ${escapeHtml(details.registrationNumber)}</p><p>${eventDetails}</p>`;
  } else {
    subject = `CyberSabha 2.0 payment needs attention: ${details.registrationNumber}`;
    body = `${greeting}<p>Payment for registration <strong>${escapeHtml(details.registrationNumber)}</strong> could not be verified.</p><p><strong>Reason:</strong> ${escapeHtml(details.reason || 'Please contact the organizers.')}</p><p>Contact desoc.club@gmail.com for help.</p>`;
  }

  const replyTo = process.env.CYBERSABHA_REPLY_TO || 'desoc.club@gmail.com';
  const deliveries = [
    resend.emails.send({ from, to: details.leaderEmail, replyTo, subject, html: body }),
  ];

  if (kind === 'received') {
    deliveries.push(resend.emails.send({ from, to: clubEmail, replyTo, subject: `New CyberSabha 2.0 registration: ${details.registrationNumber}`, html: body }));
  }

  const results = await Promise.allSettled(deliveries);
  const failures = results
    .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    .map((result) => result.reason instanceof Error ? result.reason.message : 'Email delivery failed');
  if (failures.length) throw new Error(failures.join('; '));
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value.error) throw new Error(result.value.error.message);
  }
}