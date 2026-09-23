import type { Team, Bid, Submission } from './bidAndBuild';

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  contactId?: string;
  errors?: Record<string, string>;
  error?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  registrationId?: string;
  errors?: Record<string, string>;
  error?: string;
}

export interface TeamValidationResponse {
  success: boolean;
  team?: Team;
  message?: string;
  error?: string;
}

export interface BidResponse {
  success: boolean;
  message?: string;
  bid?: Bid;
  currentCoins?: number;
  error?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  submission?: Submission;
  error?: string;
}
