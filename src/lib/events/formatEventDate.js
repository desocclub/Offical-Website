/**
 * Formats event dates conditionally and truthfully according to confirmed schedule data.
 * Timezone: Asia/Kolkata (IST / UTC+05:30)
 * 
 * Rules:
 * 1. If schedule.status === "tba" or no startDate -> "DATE TBA"
 * 2. If startDate exists and endDate exists:
 *    - Same day: "12 OCT · 5:30 PM — 7:00 PM"
 *    - Multi-day: "12 OCT, 5:30 PM — 14 OCT, 7:00 PM"
 * 3. If only startDate exists:
 *    - Date + Time: "12 OCT · 5:30 PM"
 *    - Date only (if time is not specified / zeroed): "12 OCT"
 * 4. Never manufacture an end time or placeholder date.
 * 
 * @param {import('../../data/events').Event} event
 * @returns {{ date: string, time?: string, fullSchedule: string }}
 */
export function formatEventDate(event) {
  if (!event || !event.schedule || event.schedule.status === 'tba' || !event.schedule.startDate) {
    return {
      date: 'DATE TBA',
      time: undefined,
      fullSchedule: 'DATE TBA',
    };
  }

  const start = new Date(event.schedule.startDate);
  if (isNaN(start.getTime())) {
    return {
      date: 'DATE TBA',
      time: undefined,
      fullSchedule: 'DATE TBA',
    };
  }

  const timeZone = 'Asia/Kolkata';

  // Format date parts in IST
  const dateOptions = { timeZone, day: 'numeric', month: 'short' };
  const startDateStr = start.toLocaleDateString('en-IN', dateOptions).toUpperCase();

  // Check if startDate string contains an explicit time component (not purely YYYY-MM-DD or 00:00:00)
  const isDateOnly = !event.schedule.startDate.includes('T') || event.schedule.startDate.includes('T00:00:00');

  const timeOptions = { timeZone, hour: 'numeric', minute: '2-digit', hour12: true };
  const startTimeStr = !isDateOnly ? start.toLocaleTimeString('en-IN', timeOptions).toUpperCase() : null;

  // If endDate is confirmed
  if (event.schedule.endDate) {
    const end = new Date(event.schedule.endDate);
    if (!isNaN(end.getTime())) {
      const endDateStr = end.toLocaleDateString('en-IN', dateOptions).toUpperCase();
      const endTimeStr = end.toLocaleTimeString('en-IN', timeOptions).toUpperCase();

      if (startDateStr === endDateStr) {
        // Same day event with start & end times
        const timeRange = startTimeStr ? `${startTimeStr} — ${endTimeStr}` : endTimeStr;
        return {
          date: startDateStr,
          time: timeRange,
          fullSchedule: `${startDateStr} · ${timeRange}`,
        };
      }

      // Multi-day event
      const fullRange = `${startDateStr}${startTimeStr ? `, ${startTimeStr}` : ''} — ${endDateStr}${endTimeStr ? `, ${endTimeStr}` : ''}`;
      return {
        date: `${startDateStr} — ${endDateStr}`,
        time: startTimeStr && endTimeStr ? `${startTimeStr} — ${endTimeStr}` : undefined,
        fullSchedule: fullRange,
      };
    }
  }

  // Only startDate exists (Rule: never manufacture an end time)
  if (startTimeStr) {
    return {
      date: startDateStr,
      time: startTimeStr,
      fullSchedule: `${startDateStr} · ${startTimeStr}`,
    };
  }

  return {
    date: startDateStr,
    time: undefined,
    fullSchedule: startDateStr,
  };
}

export default formatEventDate;
