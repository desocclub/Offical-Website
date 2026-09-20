import EventsSection from './events/EventsSection';

/**
 * Re-exporting EventsSection as the default export of Events.jsx
 * Preserves existing import references across the application while delegating
 * to the modular events system.
 */
export default EventsSection;
export { EventsSection };