import type { StaticImageData } from 'next/image';

export type CommitteeStatus = 'revealed' | 'teaser';

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  image?: string | StaticImageData;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

export interface CommitteeTeam {
  id: string;
  title: string;
  members: CommitteeMember[];
}

export interface YearCommittee {
  year: string;
  label: string;
  status: CommitteeStatus;
  theme?: string;
  teams?: CommitteeTeam[];
  teaserDetails?: {
    badgeText?: string;
    headline?: string;
    subtitle?: string;
    description?: string;
  };
}

export interface AlumniTeam {
  title: string;
  members: CommitteeMember[];
}

