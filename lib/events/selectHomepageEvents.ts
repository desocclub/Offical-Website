import type { Event, EventLifecycleState } from '@/types/events';
import { getEventState } from './getEventState';

export interface GroupedEvents {
  live: Event[];
  upcoming: Event[];
  tba: Event[];
  past: Event[];
}

/**
 * Selects events for the homepage preview based on strict priority rules:
 * 
 * PRIORITY 1: Currently LIVE event(s)
 * PRIORITY 2: Confirmed upcoming events ordered by startDate (nearest first)
 * PRIORITY 3: TBA events (announced events awaiting date finalization)
 * NEVER: Past events (strictly excluded from homepage upcoming preview)
 * 
 * Caps output to a maximum of 2 events.
 */
export function selectHomepageEvents(events: Event[], now: Date | string | number = new Date(), limit = 2): Event[] {
  if (!Array.isArray(events) || events.length === 0) {
    return [];
  }

  const currentTime = now instanceof Date ? now : new Date(now);

  const liveEvents: Event[] = [];
  const upcomingEvents: Event[] = [];
  const tbaEvents: Event[] = [];

  for (const event of events) {
    const state = getEventState(event, currentTime);

    if (state === 'live') {
      liveEvents.push(event);
    } else if (state === 'upcoming') {
      upcomingEvents.push(event);
    } else if (state === 'tba') {
      tbaEvents.push(event);
    }
  }

  // Sort upcoming events chronologically by confirmed startDate (nearest first)
  upcomingEvents.sort((a, b) => {
    const timeA = new Date(a.schedule.startDate || 0).getTime();
    const timeB = new Date(b.schedule.startDate || 0).getTime();
    return timeA - timeB;
  });

  // Assemble candidates in order of priority: LIVE -> UPCOMING -> TBA
  const candidates = [...liveEvents, ...upcomingEvents, ...tbaEvents];

  // Strictly enforce maximum homepage limit
  return candidates.slice(0, Math.min(limit, 2));
}

/**
 * Groups all events by their derived lifecycle state for archive pages (e.g. /events).
 */
export function groupEventsByState(events: Event[], now: Date | string | number = new Date()): GroupedEvents {
  if (!Array.isArray(events)) {
    return { live: [], upcoming: [], tba: [], past: [] };
  }

  const currentTime = now instanceof Date ? now : new Date(now);

  const groups: GroupedEvents = {
    live: [],
    upcoming: [],
    tba: [],
    past: [],
  };

  for (const event of events) {
    const state = getEventState(event, currentTime);
    if (state in groups) {
      groups[state as keyof GroupedEvents].push(event);
    }
  }

  // Sort upcoming chronologically
  groups.upcoming.sort((a, b) => {
    const timeA = new Date(a.schedule.startDate || 0).getTime();
    const timeB = new Date(b.schedule.startDate || 0).getTime();
    return timeA - timeB;
  });

  // Sort past reverse chronologically (most recent first)
  groups.past.sort((a, b) => {
    const timeA = new Date(a.schedule?.startDate || 0).getTime();
    const timeB = new Date(b.schedule?.startDate || 0).getTime();
    return timeB - timeA;
  });

  return groups;
}

export default selectHomepageEvents;
