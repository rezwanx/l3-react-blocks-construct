import { useState } from 'react';
import { SlotInfo, Event } from 'react-big-calendar';
import {
  BigCalendar,
  BigCalendarHeader,
  CalendarEvent,
  CalendarModalState,
  EditEvent,
  EditRecurrence,
  EventDetails,
  myEventsList,
} from 'features/big-calendar';
import { CalendarSettingsProvider } from 'features/big-calendar/contexts/calendar-settings.context';
import { EventInteractionArgs } from 'react-big-calendar/lib/addons/dragAndDrop';

/**
 * CalendarPage Component
 *
 * A page component that integrates a calendar interface with event management functionality.
 * It provides features for adding, editing, deleting, and filtering events, as well as viewing event details.
 * The component uses the `react-big-calendar` library for the calendar view and supports modals for managing events.
 *
 * Features:
 * - Displays a calendar with events (`BigCalendar`).
 * - Provides a header (`BigCalendarHeader`) for search, filtering, and adding events.
 * - Supports modal dialogs for event details, editing, and recurrence configuration.
 * - Allows adding new events, updating existing ones, and deleting events.
 * - Filters events based on date range and color.
 * - Supports drag and drop for event resizing and moving.
 *
 * State:
 * - `events`: `{CalendarEvent[]}` – The list of events displayed on the calendar.
 * - `selectedSlot`: `{SlotInfo | null}` – The currently selected calendar slot (used for adding events).
 * - `currentDialog`: `{CalendarModalState}` – The currently open modal dialog (e.g., event details, edit event, recurrence).
 * - `selectedEvent`: `{CalendarEvent | null}` – The currently selected event for viewing or editing.
 *
 * Functions:
 * - `handleSearchChange`: `{Function}` – Filters events based on a search query.
 * - `addEvent`: `{Function}` – Adds a new event to the calendar.
 * - `onSelectSlot`: `{Function}` – Handles selecting a calendar slot for adding events.
 * - `handleDelete`: `{Function}` – Deletes an event from the calendar.
 * - `handleEventUpdate`: `{Function}` – Updates an existing event in the calendar.
 * - `onFilterEvents`: `{Function}` – Filters events based on date range and color.
 * - `handleEventDrop`: `{Function}` – Handles the event drop action.
 * - `handleEventResize`: `{Function}` – Handles the event resize action.
 *
 * @returns {JSX.Element} The rendered JSX element for the calendar page.
 *
 * @example
 * <CalendarPage />
 */
export function CalendarPage() {
  const [events, setEvents] = useState(myEventsList);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [currentDialog, setCurrentDialog] = useState<CalendarModalState>(CalendarModalState.NONE);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  const closeAllModals = () => setCurrentDialog(CalendarModalState.NONE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEvents(() => {
      const searchFilter = [...myEventsList].filter((res) =>
        res.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      return searchFilter;
    });
  };

  const addEvent = (data: any) => {
    const newEvent: CalendarEvent = {
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
      allDay: data.allDay,
      resource: {
        color: data?.color,
        description: data?.description,
        meetingLink: data?.meetingLink,
        recurring: data?.recurring,
        members: data?.members,
      },
    };
    setEvents([...events, newEvent]);
    setSelectedSlot(null);
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleDelete = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.eventId !== eventId));
    closeAllModals();
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.eventId === updatedEvent.eventId ? updatedEvent : event))
    );
    closeAllModals();
  };

  const onFilterEvents = (filters: { dateRange: any; color: string | null }) => {
    setEvents(() => {
      const filteredEvents = [...myEventsList].filter((event) => {
        const eventDate = new Date(event.start);
        const startDate = filters.dateRange?.from;
        const endDate = filters.dateRange?.to;
        const colorMatch = !filters.color || event.resource?.color === filters.color;

        if (startDate && endDate) {
          return eventDate >= startDate && eventDate <= endDate && colorMatch;
        }

        return colorMatch;
      });
      return filteredEvents;
    });
  };
  const handleEventDrop = (args: EventInteractionArgs<Event>) => {
    const { event, start, end, isAllDay } = args;
    const calendarEvent = event as unknown as CalendarEvent;
    const startDate = start instanceof Date ? start : new Date(start);
    const endDate = end instanceof Date ? end : new Date(end);
    const updated = { ...calendarEvent, start: startDate, end: endDate, allDay: isAllDay };
    setEvents((prev) => prev.map((ev) => (ev.eventId === calendarEvent.eventId ? updated : ev)));
  };

  const handleEventResize = (args: EventInteractionArgs<Event>) => {
    const { event, start, end, isAllDay } = args;
    const calendarEvent = event as unknown as CalendarEvent;
    const startDate = start instanceof Date ? start : new Date(start);
    const endDate = end instanceof Date ? end : new Date(end);
    const updated = { ...calendarEvent, start: startDate, end: endDate, allDay: isAllDay };
    setEvents((prev) => prev.map((ev) => (ev.eventId === calendarEvent.eventId ? updated : ev)));
  };

  return (
    <CalendarSettingsProvider>
      <div className="flex w-full flex-col gap-5">
        <BigCalendarHeader
          title="Calendar"
          onAddEvent={() =>
            setSelectedSlot({
              start: new Date(),
              end: new Date(),
              slots: [],
              action: 'click',
            })
          }
          selectedSlot={selectedSlot}
          onEventSubmit={addEvent}
          onDialogClose={() => setSelectedSlot(null)}
          onApplyFilters={onFilterEvents}
          onSearchChange={handleSearchChange}
        />
        <BigCalendar
          eventList={events}
          onSelectSlot={onSelectSlot}
          onSelectEvent={(value) => {
            if (value instanceof Date) {
              setSelectedSlot({
                start: value,
                end: value,
                slots: [],
                action: 'click',
              });
            } else {
              setSelectedEvent(value as CalendarEvent);
              setCurrentDialog(CalendarModalState.EVENT_DETAIL);
            }
          }}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
        />
        {currentDialog === CalendarModalState.EVENT_DETAIL && selectedEvent && (
          <EventDetails
            onClose={closeAllModals}
            onDelete={handleDelete}
            event={selectedEvent}
            onNext={() => setCurrentDialog(CalendarModalState.EDIT_EVENT)}
          />
        )}

        {currentDialog === CalendarModalState.EDIT_EVENT && selectedEvent && (
          <EditEvent
            event={selectedEvent}
            onDelete={handleDelete}
            onClose={closeAllModals}
            onUpdate={handleEventUpdate}
            onNext={() => setCurrentDialog(CalendarModalState.EVENT_RECURRENCE)}
          />
        )}

        {currentDialog === CalendarModalState.EVENT_RECURRENCE && selectedEvent && (
          <EditRecurrence event={selectedEvent} onNext={closeAllModals} setEvents={setEvents} />
        )}
      </div>
    </CalendarSettingsProvider>
  );
}
