import type { Event, EventLifecycleState } from '@/types/events';

/**
 * Derives the current lifecycle state of an event from facts in event.schedule.
 * 
 * Rules:
 * RULE A — TBA: If schedule.status === "tba" or no startDate -> "tba"
 * RULE B — LIVE: If schedule.status === "confirmed", startDate <= now, and (now <= endDate) -> "live"
 * RULE C — UPCOMING: If schedule.status === "confirmed" and startDate > now -> "upcoming"
 * RULE D — PAST: If schedule.status === "confirmed", endDate exists, and now > endDate -> "past"
 * RULE E — ONLY START DATE: If startDate exists but no endDate:
 *          startDate > now -> "upcoming"
 *          startDate <= now -> "live" (explicit handling without guessing end time)
 */
export function getEventState(event: Event, now: Date | string | number = new Date()): EventLifecycleState {
  if (!event || !event.schedule) {
    return 'tba';
  }

  const { status, startDate, endDate } = event.schedule;

  // RULE A — TBA
  // If schedule.status === "tba" or missing confirmed startDate, do NOT attempt date comparison.
  if (status === 'tba' || !startDate) {
    return 'tba';
  }

  // Parse ISO timestamps
  const start = new Date(startDate);
  if (isNaN(start.getTime())) {
    return 'tba';
  }

  const currentTime = (now instanceof Date ? now : new Date(now)).getTime();
  const startTime = start.getTime();

  // If endDate is provided, evaluate strict bounds
  if (endDate) {
    const end = new Date(endDate);
    if (!isNaN(end.getTime())) {
      const endTime = end.getTime();

      // RULE B — LIVE
      if (startTime <= currentTime && currentTime <= endTime) {
        return 'live';
      }

      // RULE C — UPCOMING
      if (startTime > currentTime) {
        return 'upcoming';
      }

      // RULE D — PAST
      if (currentTime > endTime) {
        return 'past';
      }
    }
  }

  // RULE E — EVENT WITH ONLY A START DATE (no valid endDate)
  if (startTime > currentTime) {
    return 'upcoming';
  }

  // Event has started but end time is unspecified: remain "live" rather than guessing past
  return 'live';
}

export default getEventState;
