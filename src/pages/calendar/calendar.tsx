import { useState } from 'react';
import { SlotInfo } from 'react-big-calendar';
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
