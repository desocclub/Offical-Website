/**
 * Centralized API helpers for communicating with the DESOC Express backend.
 * Uses NEXT_PUBLIC_API_URL or defaults to http://localhost:5000.
 */

import type {
  ContactPayload,
  ContactResponse,
  RegistrationResponse,
  TeamValidationResponse,
  BidResponse,
  SubmissionResponse,
} from '@/types/api';
import type {
  Team,
  CurrentAuctionResponse,
} from '@/types/bidAndBuild';

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const API_ROUTES = {
  contact: `${API_BASE}/api/contact`,
  register: `${API_BASE}/api/genesis/register`,
  genesis: `${API_BASE}/api/genesis`,
  genesisRegister: `${API_BASE}/api/genesis/register`,
  recruitment: `${API_BASE}/api/recruitment`,
  team: {
    validate: `${API_BASE}/api/team/validate`,
    get: (id: string) => `${API_BASE}/api/team/${id}`,
    submission: (id: string) => `${API_BASE}/api/team/${id}/submission`,
  },
  auction: {
    current: `${API_BASE}/api/current-auction`,
    bid: `${API_BASE}/api/bid`,
    start: `${API_BASE}/api/auction/start`,
    next: `${API_BASE}/api/auction/next`,
  },
  admin: {
    teams: `${API_BASE}/api/admin/teams`,
    team: `${API_BASE}/api/admin/team`,
  },
};

/**
 * Send contact inquiry to Express backend
 */
export async function sendContactMessage(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch(API_ROUTES.contact, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Failed to submit contact message');
  }
  return data;
}

/**
 * Submit event registration multipart form data to Express backend
 */
export async function submitRegistration(formData: FormData): Promise<RegistrationResponse> {
  const res = await fetch(API_ROUTES.genesisRegister, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Registration failed');
  }
  return data;
}

/**
 * Validate team credentials for Bid & Build
 */
export async function validateTeam(credentials: { email: string; teamName: string }): Promise<TeamValidationResponse & { team: Team }> {
  const res = await fetch(API_ROUTES.team.validate, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      teamName: credentials.teamName.trim(),
      email: credentials.email.trim().toLowerCase(),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.team) {
    throw new Error(data.message || data.error || 'Team validation failed');
  }
  return data;
}

/**
 * Fetch team status by ID
 */
export async function fetchTeamById(id: string): Promise<Team> {
  const res = await fetch(API_ROUTES.team.get(id));
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.team) {
    throw new Error(data.error || 'Failed to fetch team');
  }
  return data.team;
}

/**
 * Fetch current live auction state
 */
export async function fetchCurrentAuction(): Promise<CurrentAuctionResponse> {
  const res = await fetch(API_ROUTES.auction.current);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch auction');
  }
  return data;
}

/**
 * Place a bid for an asset
 */
export async function placeBid(payload: { teamId: string; assetId: string; amount: number }): Promise<BidResponse> {
  const res = await fetch(API_ROUTES.auction.bid, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Failed to place bid');
  }
  return data;
}

/**
 * Submit Bid & Build design deliverables
 */
export async function submitTeamDeliverable(teamId: string, formData: FormData): Promise<SubmissionResponse> {
  const res = await fetch(API_ROUTES.team.submission(teamId), {
    method: 'POST',
    body: formData,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || data.error || 'Submission failed');
  }
  return data;
}

/**
 * Admin action: Start the auction
 */
export async function startAuction(durationSeconds: number, adminKey?: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(API_ROUTES.auction.start, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(adminKey ? { 'x-admin-key': adminKey } : {}),
    },
    body: JSON.stringify({ durationSeconds }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || 'Failed to start auction');
  }
  return data;
}

/**
 * Admin action: Next asset in auction
 */
export async function nextAuctionAsset(adminKey?: string): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(API_ROUTES.auction.next, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(adminKey ? { 'x-admin-key': adminKey } : {}),
    },
    body: JSON.stringify({}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || data.message || 'Failed to advance auction asset');
  }
  return data;
}

/**
 * Admin action: Fetch all registered teams
 */
export async function fetchAdminTeams(adminKey?: string): Promise<Team[]> {
  const res = await fetch(API_ROUTES.admin.teams, {
    headers: {
      ...(adminKey ? { 'x-admin-key': adminKey } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to load teams');
  }
  return data.teams || [];
}

/**
 * Admin action: Create or register a team directly
 */
export async function createAdminTeam(
  payload: { teamName: string; email: string; coins?: number },
  adminKey?: string
): Promise<{ success: boolean; team: Team }> {
  const res = await fetch(API_ROUTES.admin.team, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(adminKey ? { 'x-admin-key': adminKey } : {}),
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.team) {
    throw new Error(data.error || 'Failed to register team');
  }
  return data;
}
