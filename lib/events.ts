/**
 * Event Logic & Derived State Utilities
 * Re-exports pure functions from modular events library and provides backward compatibility facade.
 */
import type { Event, EventStatusBadge, FormattedEventSchedule } from '@/types/events';
import { getEventState } from './events/getEventState';
import { formatEventDate } from './events/formatEventDate';
import { selectHomepageEvents } from './events/selectHomepageEvents';

export { getEventState } from './events/getEventState';
export { formatEventDate } from './events/formatEventDate';
export { selectHomepageEvents, groupEventsByState } from './events/selectHomepageEvents';

export function getEventStatus(event: Event, now: Date | string | number = new Date()): EventStatusBadge {
  const state = getEventState(event, now);
  const isLive = state === 'live';
  const labelMap: Record<string, string> = {
    live: 'LIVE NOW',
    upcoming: 'UPCOMING',
    tba: 'UPCOMING',
    past: 'PAST EVENT',
  };
  return {
    state: state.toUpperCase(),
    label: labelMap[state] || 'UPCOMING',
    isLive,
  };
}

export function formatEventSchedule(event: Event): FormattedEventSchedule {
  return formatEventDate(event);
}

export function getHomepageEvents(eventList: Event[], limit = 2, now: Date | string | number = new Date()): Event[] {
  return selectHomepageEvents(eventList, now, limit);
}
