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
    if (data.events && Array.isArray(data.events) && data.events.length > 0) {
      setEvents([...events, ...data.events]);
    } else {
      const newEvent: CalendarEvent = {
        eventId: crypto.randomUUID(),
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
    }
    setSelectedSlot(null);
  };

  const onSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const handleDelete = (eventId: string, deleteOption?: 'this' | 'thisAndFollowing' | 'all') => {
    const eventToDelete = events.find((event) => event.eventId === eventId);
    if (!eventToDelete) return;

    // If it's not a recurring event or only this instance should be deleted
    if (!eventToDelete.resource?.recurring || deleteOption === 'this') {
      // Simple deletion of a single event
      setEvents((prevEvents) => prevEvents.filter((event) => event.eventId !== eventId));
    } else if (deleteOption === 'thisAndFollowing') {
      // Delete this event and all future events in the series
      const eventDate = new Date(eventToDelete.start);
      setEvents((prevEvents) => {
        // Find all events from the same recurring series
        const originalTitle = eventToDelete.title;
        const originalColor = eventToDelete.resource?.color;

        return prevEvents.filter((event) => {
          // Keep events from different series
          if (event.title !== originalTitle) return true;
          if (event.resource?.color !== originalColor) return true;

          // For recurring events from this series, only keep ones before the current event
          const isSameRecurringSeries =
            event.resource?.recurring &&
            event.title === originalTitle &&
            event.resource?.color === originalColor;

          if (!isSameRecurringSeries) return true;

          // Keep events that occur before the selected event
          return new Date(event.start) < eventDate;
        });
      });
    } else if (deleteOption === 'all') {
      // Delete all events in the recurring series
      setEvents((prevEvents) => {
        const originalTitle = eventToDelete.title;
        const originalColor = eventToDelete.resource?.color;

        return prevEvents.filter((event) => {
          // Keep events from different series
          if (event.title !== originalTitle) return true;
          if (event.resource?.color !== originalColor) return true;

          // Filter out all events from this recurring series
          const isSameRecurringSeries =
            event.resource?.recurring &&
            event.title === originalTitle &&
            event.resource?.color === originalColor;

          return !isSameRecurringSeries;
        });
      });
    }

    closeAllModals();
  };
  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    // For recurring series updates (pattern changed or not), replace all recurring events
    if (updatedEvent.resource?.recurring && Array.isArray(updatedEvent.events) && updatedEvent.events.length > 0) {
      const seriesEvents = updatedEvent.events;
      setEvents((prev) => {
        // Keep only non-recurring events
        const nonRecurring = prev.filter((ev) => !ev.resource?.recurring);
        // Append all series instances
        return [...nonRecurring, ...seriesEvents];
      });
    } else if (updatedEvent.resource?.recurring) {
      // This branch handles updates to a recurring event's properties
      // (title, description, etc.) without changing the recurrence pattern
      setEvents((prevEvents) => {
        const eventToEdit = prevEvents.find((event) => event.eventId === updatedEvent.eventId);

        if (!eventToEdit) {
          // If we can't find the event, just update the provided event
          return prevEvents.map((event) =>
            event.eventId === updatedEvent.eventId ? updatedEvent : event
          );
        }

        // Identify properties to be updated in all events in the series
        const originalTitle = eventToEdit.title;
        const originalColor = eventToEdit.resource?.color;

        return prevEvents.map((event) => {
          // Check if this event is part of the same recurring series
          const isSameRecurringSeries =
            event.resource?.recurring &&
            event.title === originalTitle &&
            event.resource?.color === originalColor;

          if (!isSameRecurringSeries) {
            // If not part of the same series, return unchanged
            return event;
          }

          // For events in the same series, update the properties while preserving
          // the original start and end dates
          return {
            ...event, // Keep original properties like eventId
            title: updatedEvent.title, // Update the title
            allDay: updatedEvent.allDay, // Update all-day setting
            // Keep original start and end dates
            start: event.start,
            end: event.end,
            resource: {
              // Update resource properties
              meetingLink: updatedEvent.resource?.meetingLink || event.resource?.meetingLink,
              description: updatedEvent.resource?.description || event.resource?.description,
              color: updatedEvent.resource?.color || event.resource?.color,
              members: updatedEvent.resource?.members || event.resource?.members,
              recurring: true, // Ensure it remains a recurring event
            },
          };
        });
      });
    } else {
      // Handle non-recurring event updates (unchanged)
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.eventId === updatedEvent.eventId ? updatedEvent : event))
      );
    }
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
          <EditRecurrence
            event={selectedEvent}
            onNext={() => {
              if (selectedEvent) {
                setSelectedEvent({
                  ...selectedEvent,
                  resource: {
                    ...selectedEvent.resource,
                    recurring: true,
                  },
                });
              }
              setCurrentDialog(CalendarModalState.EDIT_EVENT);
            }}
            setEvents={(recurringEvents) => {
              if (Array.isArray(recurringEvents) && recurringEvents.length > 0) {
                const processedRecurringEvents = recurringEvents.map((event) => ({
                  ...event,
                  start: event.start instanceof Date ? event.start : new Date(event.start),
                  end: event.end instanceof Date ? event.end : new Date(event.end),
                  resource: {
                    ...event.resource,
                    color:
                      selectedEvent.resource?.color ||
                      event.resource?.color ||
                      'hsl(var(--primary-500))',
                  },
                }));

                const updatedEvent: CalendarEvent = {
                  ...selectedEvent,
                  events: processedRecurringEvents,
                  resource: {
                    ...selectedEvent.resource,
                    recurring: true,
                  },
                };
                setSelectedEvent(updatedEvent);
              }
            }}
          />
        )}
      </div>
    </CalendarSettingsProvider>
  );
}
