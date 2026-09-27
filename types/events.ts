import type { StaticImageData } from 'next/image';

export type EventStatus = 'confirmed' | 'tba';

export type EventLifecycleState = 'live' | 'upcoming' | 'past' | 'tba';

export interface EventSchedule {
  status: EventStatus;
  startDate: string | null;
  endDate: string | null;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  image?: string | StaticImageData;
  coverImage?: string | StaticImageData;
  location?: string;
  registrationUrl?: string;
  schedule: EventSchedule;
}

export interface FormattedEventSchedule {
  date: string;
  time?: string;
  fullSchedule: string;
}

export interface EventStatusBadge {
  state: string;
  label: string;
  isLive: boolean;
}

export interface PastEvent {
  id: string;
  title: string;
  date?: string;
  time?: string;
  venue?: string;
  participants?: string;
  platform?: string;
  shortDescription?: string;
  description: string;
  coverImage: string | StaticImageData;
  gallery: (string | StaticImageData)[];
}
