import {
  format,
  startOfYear,
  eachDayOfInterval,
  getDay,
  isToday,
  addDays,
  subDays,
} from 'date-fns';
import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip';
import { CalendarEvent } from '../../types/calendar-event.types';
import { WEEK_DAYS } from '../../constants/calendar.constants';

interface YearContentProps {
  date: Date;
  events: CalendarEvent[];
  onSelectEvent: (eventOrDate: CalendarEvent | Date) => void;
}

export const YearContent = ({ date, events, onSelectEvent }: YearContentProps) => {
  const yearStart = startOfYear(date);
  const eventDates = new Set(events.map((event) => format(event.start, 'yyyy-MM-dd')));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 overflow-y-auto max-h-[80vh]">
      {Array.from({ length: 12 }, (_, i) => new Date(yearStart.getFullYear(), i)).map(
        (month, index) => (
          <div key={index} className="flex flex-col gap-2 sm:gap-3 items-center">
            <h2 className="text-base font-bold text-medium-emphasis">
              {format(month, 'MMMM yyyy')}
            </h2>
            <div className="grid grid-cols-7 gap-1 w-full">
              {WEEK_DAYS.map((day, ind) => (
                <div key={ind} className="flex items-center justify-center py-1">
                  <span className="font-semibold text-[10px] sm:text-xs uppercase text-high-emphasis">
                    {day[0]}
                  </span>
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
  onSelectEvent: (eventOrDate: CalendarEvent | Date) => void
) => {
  const getMonthDates = (month: Date) => {
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

    return [...prevDays, ...days, ...nextDays];
  };

  return getMonthDates(month).map((day, i) => {
    const dateString = format(day, 'yyyy-MM-dd');
    const hasEvent = eventDates.has(dateString);
    const dayEvents = events.filter((event) => format(event.start, 'yyyy-MM-dd') === dateString);

    const handleClick = () => {
      if (dayEvents.length > 0) {
        onSelectEvent(dayEvents[0]);
      } else {
        onSelectEvent(day);
      }
    };

    const isCurrentDay = isToday(day);
    const isFromOtherMonth = day.getMonth() !== month.getMonth();

    const dayElement = (
      <div
        key={i}
        role="button"
        onClick={handleClick}
        className={`
          relative flex flex-col items-center justify-center w-full aspect-square
          ${isCurrentDay ? 'bg-primary text-white rounded-full hover:bg-primary-600' : 'hover:bg-primary-50 hover:rounded-full'}
          ${isFromOtherMonth ? 'opacity-50' : ''}
        `}
      >
        {hasEvent && (
          <div
            className={`absolute top-1 w-[6px] h-[6px] bg-primary-300 rounded-full ${
              isCurrentDay ? 'bg-primary-50' : ''
            }`}
          />
        )}
        <span
          className={`text-xs sm:text-sm font-normal ${isCurrentDay ? 'text-white' : 'text-high-emphasis'}`}
        >
          {format(day, 'd')}
        </span>
      </div>
    );

    if (!hasEvent) return dayElement;

    return (
      <Tooltip key={day.toDateString()}>
        <TooltipTrigger asChild>{dayElement}</TooltipTrigger>
        <TooltipContent className="bg-surface p-2">
          {dayEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="text-[10px] sm:text-xs font-semibold text-medium-emphasis">
                {format(event.start, 'HH:mm')}
              </span>
              <span className="text-[10px] sm:text-xs font-normal text-medium-emphasis">
                {event.title}
              </span>
            </div>
          ))}
        </TooltipContent>
      </Tooltip>
    );
  });
};

YearContent.title = (date: Date) => format(date, 'MMMM yyyy');

YearContent.navigate = (date: Date, action: 'PREV' | 'NEXT') => {
  const newDate = new Date(date);
  newDate.setFullYear(action === 'PREV' ? date.getFullYear() - 1 : date.getFullYear() + 1);
  return newDate;
};
