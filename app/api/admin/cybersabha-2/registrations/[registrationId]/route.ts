import { NextRequest, NextResponse } from 'next/server';
import { requireCyberSabhaAdmin } from '@/lib/cybersabha/adminAuth';
import { getSupabaseAdmin } from '@/lib/cybersabha/supabase';
import { sendCyberSabhaEmail, type CyberSabhaEmailDetails } from '@/lib/cybersabha/email';

interface RouteContext {
  params: Promise<{ registrationId: string }>;
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await requireCyberSabhaAdmin(request);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const { registrationId } = await context.params;
    const payload = await request.json() as { status?: string; reason?: string };
    if (!['payment_verified', 'payment_rejected'].includes(payload.status || '')) {
      return NextResponse.json({ error: 'Choose payment verified or payment rejected.' }, { status: 400 });
    }
    const { data, error } = await getSupabaseAdmin().rpc('set_cybersabha_payment_status', {
      p_registration_id: registrationId,
      p_status: payload.status,
      p_reason: payload.reason || null,
      p_admin_email: auth.user.email,
    });
    if (error) {
      if (error.message.includes('REJECTION_REASON_REQUIRED')) return NextResponse.json({ error: 'A rejection reason is required.' }, { status: 400 });
      if (error.message.includes('REGISTRATION_NOT_FOUND')) return NextResponse.json({ error: 'Registration not found.' }, { status: 404 });
      if (error.message.includes('CAPACITY_REACHED')) return NextResponse.json({ error: 'Capacity is full; this rejected or cancelled registration cannot be restored.' }, { status: 409 });
      throw error;
    }

    try {
      await sendRegistrationStatusEmail(registrationId, payload.status as 'payment_verified' | 'payment_rejected', payload.reason);
    } catch (emailError) {
      console.error('CyberSabha status email preparation failed:', emailError);
    }
    return NextResponse.json({ success: true, registration: data });
  } catch (error) {
    console.error('CyberSabha payment update failed:', error);
    return NextResponse.json({ error: 'Could not update payment status.' }, { status: 500 });
  }
}

async function sendRegistrationStatusEmail(registrationId: string, status: 'pending_payment_verification' | 'payment_verified' | 'payment_rejected', reason?: string) {
  const supabase = getSupabaseAdmin();
  const { data: registration, error } = await supabase.from('registrations').select('*').eq('id', registrationId).single();
  if (error || !registration) throw error || new Error('Registration not found after update.');
  const [{ data: members, error: memberError }, { data: payment, error: paymentError }] = await Promise.all([
    supabase.from('registration_members').select('*').eq('registration_id', registrationId).order('member_index'),
    supabase.from('payments').select('rejection_reason').eq('registration_id', registrationId).single(),
  ]);
  if (memberError || paymentError || !members?.length) throw memberError || paymentError || new Error('Registration members are missing.');
  const emailDetails: CyberSabhaEmailDetails = {
    registrationNumber: registration.registration_number,
    teamName: registration.team_name,
    amount: registration.total_amount,
    status,
    leaderEmail: members[registration.leader_member_index].email,
    members: members.map((member, index) => ({ fullName: member.full_name, email: member.email, isLeader: index === registration.leader_member_index })),
    reason: reason || payment?.rejection_reason || undefined,
  };
  try {
    const emailKind = status === 'pending_payment_verification' ? 'received' : status === 'payment_verified' ? 'verified' : 'rejected';
    await sendCyberSabhaEmail(emailKind, emailDetails);
  } catch (emailError) {
    console.error('CyberSabha status email failed:', emailError);
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  const auth = await requireCyberSabhaAdmin(request);
  if ('error' in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  try {
    const { registrationId } = await context.params;
    const { data: registration, error } = await getSupabaseAdmin()
      .from('registrations')
      .select('status')
      .eq('id', registrationId)
      .single();
    if (error || !registration) return NextResponse.json({ error: 'Registration not found.' }, { status: 404 });
    if (!['pending_payment_verification', 'payment_verified', 'payment_rejected'].includes(registration.status)) {
      return NextResponse.json({ error: 'No registration email is available for this status.' }, { status: 409 });
    }
    await sendRegistrationStatusEmail(registrationId, registration.status as 'pending_payment_verification' | 'payment_verified' | 'payment_rejected');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('CyberSabha email resend failed:', error);
    return NextResponse.json({ error: 'Could not resend confirmation email.' }, { status: 500 });
  }
}