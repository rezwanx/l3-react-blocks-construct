import { useCallback, useMemo, useState } from 'react';
import {
  Calendar,
  Views,
  DateLocalizer,
  View,
  EventPropGetter,
  Event,
  Formats,
  DayPropGetter,
  SlotPropGetter,
  SlotInfo,
} from 'react-big-calendar';
import { AgendaContent } from '../agenda-content/agenda-content';
import { CalendarToolbar } from '../calendar-toolbar/calendar-toolbar';
import { EventsContent } from '../events-content/events-content';
import { YearContent } from '../year-content/year-content';
import { calendarLocalizer, calendarTimeFormat } from '../../utils/locales';
import { ShowMorePopup } from '../show-more-popup/show-more-popup';
import { CalendarEvent } from '../../types/calendar-event.types';
import { getTextColorClassFromBg } from '../../utils/date-utils';
import { useCalendarSettings } from '../../contexts/calendar-settings.context';
import './big-calendar.css';

interface BigCalendarProps {
  eventList?: Event[];
  localizer?: DateLocalizer;
  onSelectSlot: ((slotInfo: SlotInfo) => void) | undefined;
  onSelectEvent?: ((event: Event, e: React.SyntheticEvent<HTMLElement>) => void) | undefined;
}

/**
 * BigCalendar Component
 *
 * A customizable calendar component built with `react-big-calendar`.
 * Supports multiple views including day, week, month, agenda, and custom year view.
 *
 * Features:
 * - Custom toolbars and event renderers
 * - Agenda and year views with custom components
 * - Dynamic date and view management
 * - Color-coded event styling
 * - Transparent day and slot backgrounds
 * - Localized format and culture settings
 *
 * Props:
 * - `eventList`: Array of calendar events to render
 * - `localizer`: Optional date localizer (defaults to predefined localizer)
 * - `onSelectSlot`: Function to handle slot selection
 * - `onSelectEvent`: Function to handle event selection
 *
 * @param {BigCalendarProps} props - Calendar setup and handlers
 * @returns {JSX.Element} The rendered calendar component
 *
 * @example
 * <BigCalendar
 *   eventList={myEvents}
 *   onSelectSlot={handleSlot}
 *   onSelectEvent={handleEvent}
 * />
 */

export function BigCalendar({
  eventList,
  localizer = calendarLocalizer,
  onSelectSlot,
  onSelectEvent,
}: Readonly<BigCalendarProps>) {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);
  const { settings } = useCalendarSettings();

  const onNavigate = useCallback((newDate: Date) => setDate(newDate), [setDate]);
  const onView = useCallback((newView: View) => setView(newView), [setView]);

  const { events, components, formats } = useMemo(
    () => ({
      components: {
        toolbar: CalendarToolbar,
        event: EventsContent,
      },
      formats: {
        ...calendarTimeFormat,
      },
      events: eventList ?? [],
    }),
    [eventList]
  );

  const eventPropGetter = useCallback<EventPropGetter<Event>>((event) => {
    const textColorClass = getTextColorClassFromBg(event?.resource?.color);
    const bgColorClass = `${event?.resource?.color}`;
    const style = {
      border: 'none',
      backgroundColor: `${bgColorClass}`,
      color: `${textColorClass}`,
    };

    return {
      style: style,
      className: '',
    };
  }, []);

  const dayPropGetter = useCallback<DayPropGetter>(() => {
    return {
      className: '!bg-transparent',
    };
  }, []);

  const slotPropGetter = useCallback<SlotPropGetter>(() => {
    return {
      className: '!bg-transparent',
    };
  }, []);

  return (
    <Calendar
      className="rounded-[8px] border-[1px] border-border bg-white"
      components={components}
      formats={formats as Formats}
      dayLayoutAlgorithm="overlap"
      date={date}
      events={events}
      dayPropGetter={dayPropGetter}
      eventPropGetter={eventPropGetter}
      localizer={localizer}
      style={{ height: 600, width: '100%' }}
      showMultiDayTimes
      slotPropGetter={slotPropGetter}
      timeslots={1}
      onNavigate={onNavigate}
      onView={onView}
      view={view}
      popup={false}
      onSelectEvent={onSelectEvent}
      doShowMoreDrillDown={false}
      selectable="ignoreEvents"
      onSelectSlot={onSelectSlot}
      culture={settings.firstDayOfWeek === 0 ? 'en-US' : 'en-GB'}
      step={settings.timeScale}
      defaultView={Views.WEEK}
      views={
        {
          week: true,
          month: true,
          day: true,
          agenda: AgendaContent,
          year: YearContent,
        } as any
      }
      messages={{
        noEventsInRange: 'No scheduled events for this time period.',
        showMore: (count: number, remainingEvents: object[]) => (
          <ShowMorePopup count={count} remainingEvents={remainingEvents as CalendarEvent[]} />
        ),
      }}
    />
  );
}
