import { SetStateAction, useState } from 'react';
import { SlotInfo, View, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { BigCalendar, BigCalendarHeader, CalendarToolbar } from 'features/calendar';
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

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: SetStateAction<any>) => {
    setView(newView);
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
      />
      <DnDBigCalendar
        localizer={localizer}
        className="border-border border-rounded-md border-solid border-2 rounded-lg"
        style={{ height: 600, width: '100%' }}
        selectable
        date={date}
        onNavigate={handleNavigate}
        view={view}
        onView={handleViewChange}
        resizable
        draggableAccessor={() => true}
        resizableAccessor={() => true}
        events={events}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        components={{
          toolbar: (toolbarProps) => (
            <CalendarToolbar
              currentView={toolbarProps.view}
              currentDate={date}
              onViewChange={setView}
              onNavigate={(action) => {
                let newDate = date;
                switch (action) {
                  case 'TODAY':
                    newDate = new Date();
                    break;
                  case 'PREV':
                    newDate = subtractTime(date, view);
                    break;
                  case 'NEXT':
                    newDate = addTime(date, view);
                    break;
                }
                setDate(newDate);
              }}
              views={['agenda', 'day', 'week', 'month']}
            />
          ),
        }}
      />
    </div>
  );
}
