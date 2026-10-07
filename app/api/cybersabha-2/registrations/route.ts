import { after, NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/cybersabha/supabase';
import { sendCyberSabhaEmail, type CyberSabhaEmailDetails } from '@/lib/cybersabha/email';

export const runtime = 'nodejs';
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[6-9]\d{9}$/;

function isValidImage(file: File, bytes: Uint8Array) {
  if (file.type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (file.type === 'image/png') return bytes.slice(0, 8).join(',') === '137,80,78,71,13,10,26,10';
  if (file.type === 'image/webp') return String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
    && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
  return false;
}

function validateMembers(value: unknown) {
  if (!Array.isArray(value) || value.length < 2 || value.length > 4) return 'Team size must be between 2 and 4.';
  const members = value.map((raw) => {
    const member = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {};
    return {
      full_name: String(member.fullName || '').trim(),
      email: String(member.email || '').trim().toLowerCase(),
      phone: String(member.phone || '').replace(/\s+/g, ''),
      college: String(member.college || '').trim(),
      department: String(member.department || '').trim(),
      academic_year: String(member.academicYear || '').trim(),
    };
  });

  for (const [index, member] of members.entries()) {
    if (member.full_name.length < 2 || member.full_name.length > 100) return `Member ${index + 1}: enter a valid full name.`;
    if (!emailPattern.test(member.email) || member.email.length > 254) return `Member ${index + 1}: enter a valid email.`;
    if (!phonePattern.test(member.phone)) return `Member ${index + 1}: enter a valid 10-digit Indian mobile number.`;
    if ([member.college, member.department, member.academic_year].some((value) => !value || value.length > 120)) {
      return `Member ${index + 1}: college, department, and academic year are required.`;
    }
  }

  if (new Set(members.map((member) => member.email)).size !== members.length) return 'Each team member must use a different email.';
  if (new Set(members.map((member) => member.phone)).size !== members.length) return 'Each team member must use a different phone number.';
  return members;
}

export async function POST(request: NextRequest) {
  let screenshotPath = '';
  let supabase: ReturnType<typeof getSupabaseAdmin>;
  try {
    supabase = getSupabaseAdmin();
    const form = await request.formData();
    const teamName = String(form.get('teamName') || '').trim();
    let membersInput: unknown;
    try {
      membersInput = JSON.parse(String(form.get('members') || 'null'));
    } catch {
      return NextResponse.json({ error: 'Member details are malformed. Please review the form.' }, { status: 400 });
    }
    const membersResult = validateMembers(membersInput);
    const leaderMemberIndex = Number(form.get('leaderMemberIndex'));
    const declaration = form.get('declaration') === 'true';
    const screenshot = form.get('paymentScreenshot');

    if (!teamName || teamName.length > 100) return NextResponse.json({ error: 'Enter a team name up to 100 characters.' }, { status: 400 });
    if (typeof membersResult === 'string') return NextResponse.json({ error: membersResult }, { status: 400 });
    if (!Number.isInteger(leaderMemberIndex) || leaderMemberIndex < 0 || leaderMemberIndex >= membersResult.length) {
      return NextResponse.json({ error: 'Select a team leader.' }, { status: 400 });
    }
    if (!declaration) return NextResponse.json({ error: 'Confirm the declaration before registering.' }, { status: 400 });
    if (!(screenshot instanceof File) || screenshot.size === 0) return NextResponse.json({ error: 'Payment screenshot is required.' }, { status: 400 });
    if (screenshot.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: 'Screenshot must be 5 MB or smaller.' }, { status: 400 });

    const bytes = new Uint8Array(await screenshot.arrayBuffer());
    if (!isValidImage(screenshot, bytes)) return NextResponse.json({ error: 'Upload a valid JPG, PNG, or WebP payment screenshot.' }, { status: 400 });

    screenshotPath = `${crypto.randomUUID()}.${screenshot.type === 'image/jpeg' ? 'jpg' : screenshot.type.split('/')[1]}`;
    const { error: uploadError } = await supabase.storage
      .from('cybersabha-payment-proofs')
      .upload(screenshotPath, bytes, { contentType: screenshot.type, upsert: false });
    if (uploadError) throw uploadError;

    const rpcMembers = membersResult.map((member, member_index) => ({ ...member, member_index }));
    const { data, error } = await supabase.rpc('create_cybersabha_registration', {
      p_team_name: teamName,
      p_leader_member_index: leaderMemberIndex,
      p_members: rpcMembers,
      p_utr: null,
      p_screenshot_path: screenshotPath,
    });

    if (error) {
      await supabase.storage.from('cybersabha-payment-proofs').remove([screenshotPath]);
      screenshotPath = '';
      const message = error.message || '';
      if (error.code === '23505') {
        const duplicateMessage = message.includes('phone')
          ? 'A team member phone number is already registered for this event.'
          : 'A team member email is already registered for this event.';
        return NextResponse.json({ error: duplicateMessage }, { status: 409 });
      }
      if (message.includes('CAPACITY_REACHED')) return NextResponse.json({ error: 'All 21 team places are filled.' }, { status: 409 });
      if (message.includes('REGISTRATION_CLOSED')) return NextResponse.json({ error: 'Registration is closed.' }, { status: 410 });
      if (message.includes('INVALID_TEAM_SIZE')) return NextResponse.json({ error: 'Team size must be between 2 and 4.' }, { status: 400 });
      throw error;
    }

    const registration = data as {
      id: string; registration_number: string; team_name: string; team_size: number; total_amount: number; status: string;
    };
    const emailDetails: CyberSabhaEmailDetails = {
      registrationNumber: registration.registration_number,
      teamName: registration.team_name,
      amount: registration.total_amount,
      status: registration.status,
      leaderEmail: membersResult[leaderMemberIndex].email,
      members: membersResult.map((member, index) => ({ fullName: member.full_name, email: member.email, isLeader: index === leaderMemberIndex })),
    };
    after(async () => {
      try {
        await sendCyberSabhaEmail('received', emailDetails);
      } catch (emailError) {
        console.error('CyberSabha registration email failed:', emailError);
      }
    });

    return NextResponse.json({
      registrationNumber: registration.registration_number,
      teamName: registration.team_name,
      members: emailDetails.members,
      totalAmount: registration.total_amount,
      status: registration.status,
    }, { status: 201 });
  } catch (error) {
    console.error('CyberSabha registration failed:', error);
    return NextResponse.json({ error: 'Registration could not be completed. Please try again.' }, { status: 500 });
  }
}