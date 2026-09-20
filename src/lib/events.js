/**
 * Event Logic & Derived State Utilities
 * Re-exports pure functions from modular events library.
 */
export { getEventState } from './events/getEventState';
export { formatEventDate } from './events/formatEventDate';
export { selectHomepageEvents, groupEventsByState } from './events/selectHomepageEvents';

// Backward compatibility alias helpers
import { getEventState } from './events/getEventState';
import { formatEventDate } from './events/formatEventDate';
import { selectHomepageEvents } from './events/selectHomepageEvents';

export function getEventStatus(event, now = new Date()) {
  const state = getEventState(event, now);
  const isLive = state === 'live';
  const labelMap = {
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

export function formatEventSchedule(event) {
  return formatEventDate(event);
}

export function getHomepageEvents(eventList, limit = 2, now = new Date()) {
  return selectHomepageEvents(eventList, now, limit);
}
