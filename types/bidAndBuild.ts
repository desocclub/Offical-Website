export interface Asset {
  _id?: string;
  id?: string;
  name: string;
  basePrice: number;
  soldTo?: string;
  soldToTeam?: string | null;
  isSold?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Submission {
  fileUrl?: string;
  figmaLink?: string;
  submittedAt?: string;
}

export interface Team {
  id: string;
  _id?: string;
  teamName: string;
  email: string;
  coins: number;
  assets: Asset[];
  submission?: Submission;
  createdAt?: string;
  updatedAt?: string;
}

export interface Bid {
  _id?: string;
  id?: string;
  teamId: string;
  teamName?: string;
  assetId: string;
  amount: number;
  createdAt?: string;
}

export interface CurrentAuction {
  assetId: string;
  assetName: string;
  basePrice: number;
  isRunning: boolean;
  durationSeconds?: number;
  auctionEndsAt: string | null;
  remainingMs?: number;
  highestBid: {
    amount: number;
    teamId?: string;
    teamName?: string;
  } | null;
}

export interface CurrentAuctionResponse {
  success: boolean;
  completed?: boolean;
  currentAuction: CurrentAuction | null;
  error?: string;
}

export interface AuctionResponse {
  success: boolean;
  auction?: CurrentAuction;
  currentAuction?: CurrentAuction | null;
  completed?: boolean;
  message?: string;
  error?: string;
}
