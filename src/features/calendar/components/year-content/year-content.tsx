import {
  format,
  startOfYear,
  eachDayOfInterval,
  getDay,
  isToday,
  addDays,
  subDays,
} from 'date-fns';
import { WEEK_DAYS } from '../../enums/calendar.enum';
import { CalendarEvent } from '../../types/calendar-event.types';

interface YearContentProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

export const YearContent = ({ date, events, onSelectEvent }: YearContentProps) => {
  const yearStart = startOfYear(date);
  const eventDates = new Set(events.map((event) => format(event.start, 'yyyy-MM-dd')));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 overflow-y-auto max-h-[80vh]">
      {Array.from({ length: 12 }, (_, i) => new Date(yearStart.getFullYear(), i)).map(
        (month, index) => (
          <div key={index} className="flex flex-col gap-3 items-center">
            <h2 className="text-base font-bold text-medium-emphasis">
              {format(month, 'MMMM yyyy')}
            </h2>
            <div className="grid grid-cols-7 gap-1">
              {WEEK_DAYS.map((day) => (
                <div key={day} className="flex items-center justify-center py-1 px-3">
                  <span className="font-semibold text-xs uppercase text-high-emphasis">{day}</span>
                </div>
              ))}
              {renderMonthDays(month, eventDates, events, onSelectEvent)}
            </div>
          </div>
        )
      )}
    </div>
  );
};

const renderMonthDays = (
  month: Date,
  eventDates: Set<string>,
  events: CalendarEvent[],
  onSelectEvent: (event: CalendarEvent) => void
) => {
  // Current month's days
  const startOfMonthDate = new Date(month.getFullYear(), month.getMonth(), 1);
  const endOfMonthDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const days = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

  const firstDayIndex = getDay(startOfMonthDate);

  const lastDayPrevMonth = new Date(month.getFullYear(), month.getMonth(), 0);
  const prevDays =
    firstDayIndex > 0
      ? eachDayOfInterval({
          start: subDays(lastDayPrevMonth, firstDayIndex - 1),
          end: lastDayPrevMonth,
        })
      : [];

  const totalDaysBeforeNext = firstDayIndex + days.length;
  const nextDaysCount = totalDaysBeforeNext % 7 === 0 ? 0 : 7 - (totalDaysBeforeNext % 7);
  const firstDayNextMonth = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  const nextDays =
    nextDaysCount > 0
      ? eachDayOfInterval({
          start: firstDayNextMonth,
          end: addDays(firstDayNextMonth, nextDaysCount - 1),
        })
      : [];

  return (
    <>
      {prevDays.map((day) => {
        const dateString = format(day, 'yyyy-MM-dd');
        const hasEvent = eventDates.has(dateString);
        return (
          <div
            role="button"
            key={day.toDateString()}
            className="flex flex-col items-center justify-center px-3 py-1 h-[54px] sm:h-[42px] lg:h-[44px] hover:bg-primary-50 hover:rounded-full"
          >
            {hasEvent && <div className="w-[6px] h-[6px] bg-primary-300 rounded-full" />}
            <span className="text-sm text-low-emphasis font-normal">{format(day, 'd')}</span>
          </div>
        );
      })}
      {days.map((day) => {
        const dateString = format(day, 'yyyy-MM-dd');
        const hasEvent = eventDates.has(dateString);
        const dayEvents = events.filter(
          (event) => format(event.start, 'yyyy-MM-dd') === dateString
        );
        return (
          <div
            role="button"
            key={day.toDateString()}
            onClick={() => {
              if (hasEvent && dayEvents.length > 0) {
                // For simplicity, open the first event of that day.
                onSelectEvent(dayEvents[0]);
              }
            }}
            className={`
              flex flex-col items-center justify-center px-3 py-1 h-[54px] sm:h-[42px] lg:h-[44px]
              ${isToday(day) ? 'bg-primary rounded-full hover:bg-primary-600' : 'hover:bg-primary-50 hover:rounded-full'}
            `}
          >
            {hasEvent && (
              <div
                className={`w-[6px] h-[6px] bg-primary-300 rounded-full ${
                  isToday(day) ? 'bg-primary-50' : ''
                }`}
              />
            )}
            <span
              className={`text-sm text-high-emphasis font-normal ${
                isToday(day) ? 'text-white' : ''
              }`}
            >
              {format(day, 'd')}
            </span>
          </div>
        );
      })}
      {nextDays.map((day) => {
        const dateString = format(day, 'yyyy-MM-dd');
        const hasEvent = eventDates.has(dateString);
        return (
          <div
            role="button"
            key={day.toDateString()}
            className="flex flex-col items-center justify-center px-3 py-1 h-[54px] sm:h-[42px] lg:h-[44px] hover:bg-primary-50 hover:rounded-full"
          >
            {hasEvent && <div className="w-[6px] h-[6px] bg-primary-300 rounded-full" />}
            <span className="text-sm text-low-emphasis font-normal">{format(day, 'd')}</span>
          </div>
        );
      })}
    </>
  );
};

YearContent.title = (date: Date) => format(date, 'MMMM yyyy');

YearContent.navigate = (date: Date, action: 'PREV' | 'NEXT') => {
  const newDate = new Date(date);
  newDate.setFullYear(action === 'PREV' ? date.getFullYear() - 1 : date.getFullYear() + 1);
  return newDate;
};
