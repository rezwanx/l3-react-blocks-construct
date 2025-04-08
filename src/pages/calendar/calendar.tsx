import { SetStateAction, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { NavigateAction, SlotInfo, View, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import {
  AgendaContent,
  BigCalendar,
  BigCalendarHeader,
  CALENDAR_VIEWS,
  CalendarModalState,
  CalendarToolbar,
  CustomView,
  EditEvent,
  EditRecurrence,
  EventDetails,
  EventsContent,
  YearContent,
} from 'features/calendar';
import { localizer } from 'features/calendar/utils/locales';
import { myEventsList } from 'features/calendar/services/calendar-services';
import { CalendarEvent } from 'features/calendar/types/calendar-event.types';
import { addTime, subtractTime } from 'features/calendar/utils/date-utils';

const DnDBigCalendar = withDragAndDrop(BigCalendar);

export function CalendarPage() {
  const [view, setView] = useState<View>(Views.DAY);
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(
    myEventsList.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
  );
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [filters, setFilters] = useState<{ dateRange: DateRange; color: string | null } | null>(
    null
  );
  const [searchEvent, setSearchEvent] = useState('');
  const [currentDialog, setCurrentDialog] = useState<CalendarModalState>(CalendarModalState.NONE);

  const closeAllModals = () => setCurrentDialog(CalendarModalState.NONE);

  const handleViewChange = (newView: SetStateAction<any>) => {
    setView(newView);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEvent(e.target.value);
  };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedSlot(slotInfo);
  };

  const addEvent = (data: { title: string; start: string; end: string }) => {
    const newEvent: CalendarEvent = {
      title: data.title,
      start: new Date(data.start),
      end: new Date(data.end),
    };
    setEvents([...events, newEvent]);
    setSelectedSlot(null);
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    setEvents(
      events.map((existingEvent) =>
        existingEvent === event ? { ...existingEvent, start, end } : existingEvent
      )
    );
  };

  const handleEventResize = ({ event, start, end }: any) => {
    setEvents(
      events.map((existingEvent) =>
        existingEvent === event ? { ...existingEvent, start, end } : existingEvent
      )
    );
  };

  const handleOnNavigation = (_date: Date, viewFromProps: CustomView, action: NavigateAction) => {
    const handlers: Record<NavigateAction, () => Date> = {
      TODAY: () => new Date(),
      PREV: () => subtractTime(date, viewFromProps),
      NEXT: () => addTime(date, viewFromProps),
      DATE: () => date,
    };

    setDate(handlers[action]?.() || date);
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchEvent.toLowerCase());
    if (!filters) return matchesSearch;
    const { dateRange, color } = filters;
    const inRange =
      (!dateRange?.from || event.start >= dateRange.from) &&
      (!dateRange?.to || event.end <= dateRange.to);
    const matchesColor = color ? event.color === color : true;

    return matchesSearch && inRange && matchesColor;
  });

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents((prev) => prev.map((e) => (e.eventId === updatedEvent.eventId ? updatedEvent : e)));
  };

  return (
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
        onApplyFilters={(appliedFilters) => setFilters(appliedFilters)}
        onSearchChange={handleSearchChange}
      />
      <DnDBigCalendar
        localizer={localizer}
        className="rounded-[8px] border-[1px] border-border"
        style={{ height: 600, width: '100%' }}
        selectable
        date={date}
        view={view}
        onView={handleViewChange}
        onNavigate={handleOnNavigation as any}
        resizable
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        events={filteredEvents}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
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
        views={
          {
            week: true,
            month: true,
            day: true,
            agenda: AgendaContent,
            year: YearContent,
          } as any
        }
        components={{
          toolbar: (toolbarProps) => (
            <CalendarToolbar
              currentView={toolbarProps.view}
              currentDate={date}
              onViewChange={setView}
              onNavigate={(action) => handleOnNavigation(date, toolbarProps.view as any, action)}
              views={CALENDAR_VIEWS}
            />
          ),
          event: EventsContent as any,
        }}
      />
      {currentDialog === CalendarModalState.EVENT_DETAIL && selectedEvent && (
        <EventDetails
          onClose={closeAllModals}
          event={selectedEvent}
          onNext={() => setCurrentDialog(CalendarModalState.EDIT_EVENT)}
        />
      )}

      {currentDialog === CalendarModalState.EDIT_EVENT && selectedEvent && (
        <EditEvent
          event={selectedEvent}
          onClose={closeAllModals}
          onUpdate={handleEventUpdate}
          onNext={() => setCurrentDialog(CalendarModalState.EVENT_RECURRENCE)}
        />
      )}
      {currentDialog === CalendarModalState.EVENT_RECURRENCE && selectedEvent && (
        <EditRecurrence
          event={selectedEvent}
          onClose={closeAllModals}
          onNext={() => setCurrentDialog(CalendarModalState.NONE)}
        />
      )}
    </div>
  );
}
