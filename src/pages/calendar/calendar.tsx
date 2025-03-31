import { SetStateAction, useState } from 'react';
import { ListFilter, Plus, Search } from 'lucide-react';
import { SlotInfo, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import { Button } from 'components/ui/button';
import { Dialog } from 'components/ui/dialog';
import { BigCalendar, AddEvent } from 'features/calendar';
import { localizer } from 'features/calendar/utils/locales';
import { myEventsList } from 'features/calendar/services/calendar-services';
import { CalendarEvent } from 'features/calendar/types/calendar-event.types';
import { Input } from 'components/ui/input';

const DnDBigCalendar = withDragAndDrop(BigCalendar);

export function CalendarPage() {
  const [view, setView] = useState(Views.WEEK);
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

  const handleCreateEvent = (data: { title: string; start: string; end: string }) => {
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold leading-9">Calendar</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 bg-background" />
            <Input placeholder="Search" className="h-8 w-full rounded-lg bg-background pl-8" />
          </div>
          <Button variant="outline" size="sm" className="ml-auto h-8 text-sm font-bold">
            <ListFilter className="size-5 mr-2" />
            Filters
          </Button>
          <Button
            size="sm"
            onClick={() =>
              setSelectedSlot({ start: new Date(), end: new Date(), slots: [], action: 'click' })
            }
          >
            <Plus className="size-5 mr-2" />
            Add Event
          </Button>
        </div>
      </div>
      <Dialog open={selectedSlot !== null} onOpenChange={() => setSelectedSlot(null)}>
        {selectedSlot && (
          <AddEvent
            start={selectedSlot.start}
            end={selectedSlot.end}
            onSubmit={handleCreateEvent}
            onCancel={() => setSelectedSlot(null)}
          />
        )}
      </Dialog>
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
      />
    </div>
  );
}
