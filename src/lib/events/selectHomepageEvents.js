import { getEventState } from './getEventState.js';

/**
 * Selects events for the homepage preview based on strict priority rules:
 * 
 * PRIORITY 1: Currently LIVE event(s)
 * PRIORITY 2: Confirmed upcoming events ordered by startDate (nearest first)
 * PRIORITY 3: TBA events (announced events awaiting date finalization)
 * NEVER: Past events (strictly excluded from homepage upcoming preview)
 * 
 * Caps output to a maximum of 2 events.
 * 
 * @param {import('../../data/events').Event[]} events
 * @param {Date} [now=new Date()]
 * @param {number} [limit=2]
 * @returns {import('../../data/events').Event[]}
 */
export function selectHomepageEvents(events, now = new Date(), limit = 2) {
  if (!Array.isArray(events) || events.length === 0) {
    return [];
  }

  const currentTime = now instanceof Date ? now : new Date(now);

  const liveEvents = [];
  const upcomingEvents = [];
  const tbaEvents = [];

  for (const event of events) {
    const state = getEventState(event, currentTime);

    if (state === 'live') {
      liveEvents.push(event);
    } else if (state === 'upcoming') {
      upcomingEvents.push(event);
    } else if (state === 'tba') {
      tbaEvents.push(event);
    }
    // Note: Past events are strictly excluded from the homepage preview
  }

  // Sort upcoming events chronologically by confirmed startDate (nearest first)
  upcomingEvents.sort((a, b) => {
    const timeA = new Date(a.schedule.startDate).getTime();
    const timeB = new Date(b.schedule.startDate).getTime();
    return timeA - timeB;
  });

  // Assemble candidates in order of priority: LIVE -> UPCOMING -> TBA
  const candidates = [...liveEvents, ...upcomingEvents, ...tbaEvents];

  // Strictly enforce maximum homepage limit
  return candidates.slice(0, Math.min(limit, 2));
}

/**
 * Groups all events by their derived lifecycle state for archive pages (e.g. /events).
 * 
 * @param {import('../../data/events').Event[]} events
 * @param {Date} [now=new Date()]
 * @returns {{ live: Event[], upcoming: Event[], tba: Event[], past: Event[] }}
 */
export function groupEventsByState(events, now = new Date()) {
  if (!Array.isArray(events)) {
    return { live: [], upcoming: [], tba: [], past: [] };
  }

  const currentTime = now instanceof Date ? now : new Date(now);

  const groups = {
    live: [],
    upcoming: [],
    tba: [],
    past: [],
  };

  for (const event of events) {
    const state = getEventState(event, currentTime);
    if (groups[state]) {
      groups[state].push(event);
    }
  }

  // Sort upcoming chronologically
  groups.upcoming.sort((a, b) => {
    const timeA = new Date(a.schedule.startDate).getTime();
    const timeB = new Date(b.schedule.startDate).getTime();
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
