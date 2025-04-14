import { useState } from 'react';
import { CalendarIcon, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from 'components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { Label } from 'components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Calendar } from 'components/ui/calendar';
import { CalendarEvent } from '../../../types/calendar-event.types';
import { CALENDER_PERIOD, WEEK_DAYS_RRULE } from '../../../constants/calendar.constants';
import { RRule } from 'rrule';

interface EditRecurrenceProps {
  event: CalendarEvent;
  onNext: () => void;
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

// Map our period names to RRule frequencies
const FREQUENCY_MAP: Record<string, string> = {
  Day: 'DAILY',
  Week: 'WEEKLY',
  Month: 'MONTHLY',
  Year: 'YEARLY',
};

export function EditRecurrence({ event, onNext, setEvents }: Readonly<EditRecurrenceProps>) {
  const [onDate, setOnDate] = useState<Date | undefined>(new Date());
  const [interval, setInterval] = useState<number>(1);
  const [period, setPeriod] = useState<string>('Week');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [endType, setEndType] = useState<'never' | 'on' | 'after'>('never');
  const [occurrenceCount, setOccurrenceCount] = useState<number>(1);

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const generateRecurringEvents = (): CalendarEvent[] => {
    // Build the rule string based on user selections
    let ruleString = `FREQ=${FREQUENCY_MAP[period]};INTERVAL=${interval}`;

    // Add weekdays if selected
    if (selectedDays.length > 0) {
      ruleString += `;BYDAY=${selectedDays.join(',')}`;
    }

    // Add end conditions based on user selection
    if (endType === 'on' && onDate) {
      ruleString += `;UNTIL=${format(onDate, 'yyyyMMdd')}T${format(onDate, 'HHmmss')}Z`;
    } else if (endType === 'after') {
      ruleString += `;COUNT=${occurrenceCount}`;
    }

    const rule = RRule.fromString(ruleString);

    // Generate occurrences within the specified range
    const eventOccurrences = rule.between(
      event.start,
      endType === 'on' && onDate
        ? onDate
        : new Date(new Date(event.start).getTime() + 365 * 24 * 60 * 60 * 1000)
    );

    // Calculate the original event duration in milliseconds
    const eventDuration = event.end.getTime() - event.start.getTime();

    // Get the original event's hours, minutes, seconds, milliseconds
    const originalStartHours = event.start.getHours();
    const originalStartMinutes = event.start.getMinutes();
    const originalStartSeconds = event.start.getSeconds();
    const originalStartMs = event.start.getMilliseconds();

    return eventOccurrences.map((date) => {
      // Create a new start date with the same time as the original event
      const newStart = new Date(date);
      newStart.setHours(
        originalStartHours,
        originalStartMinutes,
        originalStartSeconds,
        originalStartMs
      );

      // Create end date by adding the original duration to the new start date
      const newEnd = new Date(newStart.getTime() + eventDuration);

      return {
        ...event,
        eventId: crypto.randomUUID(),
        start: newStart,
        end: newEnd,
      };
    });
  };

  const handleSave = () => {
    const recurringEvents = generateRecurringEvents();
    if (recurringEvents.length > 0) {
      setEvents((prev) => [...prev, ...recurringEvents]);
      onNext();
    } else {
      console.error('No recurring events were generated');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onNext}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit Recurrence</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-[6px]">
            <p className="font-normal text-sm text-high-emphasis">Repeat every</p>
            <div className="flex items-center gap-3 w-[60%]">
              <Input
                type="number"
                className="w-[40%]"
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                min={1}
              />
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CALENDER_PERIOD.map((period) => (
                    <SelectItem key={period} value={period}>
                      {period}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="font-normal text-sm text-high-emphasis">Repeat on</p>
            <div className="flex items-center w-full gap-2">
              {WEEK_DAYS_RRULE.map((day) => (
                <Button
                  key={day}
                  variant={selectedDays.includes(day) ? 'default' : 'outline'}
                  size="sm"
                  className="text-xs font-normal flex-1"
                  onClick={() => handleDayToggle(day)}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-normal text-sm text-high-emphasis">Ends</p>
            <div className="flex items-center gap-3 w-full">
              <RadioGroup
                value={endType}
                onValueChange={(value: 'never' | 'on' | 'after') => setEndType(value)}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="never" id="status-never" />
                  <Label htmlFor="status-never" className="cursor-pointer">
                    Never
                  </Label>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center gap-2 w-[40%]">
                    <RadioGroupItem value="on" id="status-on" />
                    <Label htmlFor="status-on" className="cursor-pointer">
                      On
                    </Label>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="relative w-[60%]">
                        <Input
                          readOnly
                          value={onDate ? format(onDate, 'dd.MM.yyyy') : ''}
                          className="cursor-pointer"
                        />
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-emphasis" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={onDate} onSelect={setOnDate} />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="flex items-center gap-2 w-[40%]">
                    <RadioGroupItem value="after" id="status-after" />
                    <Label htmlFor="status-after" className="cursor-pointer">
                      After
                    </Label>
                  </div>
                  <Input
                    type="number"
                    className="w-[60%]"
                    value={occurrenceCount}
                    onChange={(e) => setOccurrenceCount(Number(e.target.value))}
                    min={1}
                  />
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter className="flex w-full !flex-row !items-center !justify-between gap-4 !mt-6">
          <Button variant="outline" size="icon">
            <Trash className="!w-5 !h-4 text-destructive" />
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onNext}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
