import type { StaticImageData } from 'next/image';

export interface CommitteeMember {
  id?: number | string;
  name: string;
  role: string;
  image?: string | StaticImageData;
}

export interface AlumniTeam {
  title: string;
  members: CommitteeMember[];
}
