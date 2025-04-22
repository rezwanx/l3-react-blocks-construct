import { CalendarIcon } from 'lucide-react';
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
import { useRecurrenceState } from '../../../hooks/use-recurrence-state';
import { useRecurrenceEvents } from '../../../hooks/use-recurrence-events';
import { useRecurrenceStorage } from '../../../hooks/use-recurrence-storage';

interface EditRecurrenceProps {
  event: CalendarEvent;
  onNext: () => void;
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
}

/**
 * EditRecurrence Component
 *
 * A dialog-based component for configuring recurrence rules for calendar events.
 * It allows users to define how often an event repeats, on which days, and when the repetition ends.
 * The component uses the `rrule` library to generate recurring events based on user-defined rules.
 *
 * Features:
 * - Configures recurrence frequency (daily, weekly, monthly, yearly).
 * - Selects specific days of the week for weekly recurrences.
 * - Defines end conditions for the recurrence (never, on a specific date, or after a certain number of occurrences).
 * - Generates a list of recurring events based on the configured rules.
 *
 * Props:
 * - `event`: `{CalendarEvent}` – The original event object for which recurrence is being configured.
 * - `onNext`: `{Function}` – Callback triggered when the dialog is closed or canceled.
 * - `setEvents`: `{React.Dispatch<React.SetStateAction<CalendarEvent[]>>}` – Function to update the state with the generated recurring events.
 *
 * @param {EditRecurrenceProps} props - The props for configuring the recurrence editor.
 * @returns {JSX.Element} The rendered JSX element for the recurrence editor dialog.
 *
 * @example
 * <EditRecurrence
 *   event={{
 *     eventId: '1',
 *     title: 'Team Meeting',
 *     start: new Date('2023-10-01T09:00:00'),
 *     end: new Date('2023-10-01T10:00:00'),
 *     allDay: false,
 *     resource: { color: '#FF5733' },
 *   }}
 *   onNext={() => console.log('Dialog closed')}
 *   setEvents={(events) => console.log('Generated events:', events)}
 * />
 */

export function EditRecurrence({ event, onNext, setEvents }: Readonly<EditRecurrenceProps>) {
  const {
    initialRecurrenceEvent,
    onDate,
    setOnDate,
    interval,
    setInterval,
    period,
    setPeriod,
    selectedDays,
    endType,
    setEndType,
    occurrenceCount,
    setOccurrenceCount,
    handleDayToggle,
  } = useRecurrenceState(event);

  const { generateRecurringEvents } = useRecurrenceEvents();
  const { saveRecurrenceData } = useRecurrenceStorage();

  const handleSave = () => {
    const recurringEvents = generateRecurringEvents(initialRecurrenceEvent, {
      period,
      interval,
      selectedDays,
      endType,
      onDate,
      occurrenceCount,
    });

    if (recurringEvents.length > 0) {
      const tempEvent = window.localStorage.getItem('tempEditEvent');
      if (tempEvent) {
        const saved = saveRecurrenceData(recurringEvents, {
          period,
          interval,
          selectedDays,
          endType,
          occurrenceCount,
          onDate,
        });

        if (saved) {
          onNext();
        } else {
          setEvents(recurringEvents);
          onNext();
        }
      } else {
        setEvents(recurringEvents);
        onNext();
      }
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
                          disabled={endType === 'never'}
                          value={onDate ? format(onDate, 'dd.MM.yyyy') : ''}
                          className={`cursor-pointer ${endType === 'never' ? 'opacity-50' : ''}`}
                        />
                        <CalendarIcon className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${endType === 'never' ? 'text-muted-foreground' : 'text-medium-emphasis'}`} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={onDate} onSelect={setOnDate} disabled={endType === 'never'} />
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
                    className={`w-[60%] ${endType === 'never' ? 'opacity-50' : ''}`}
                    value={occurrenceCount}
                    onChange={(e) => setOccurrenceCount(Number(e.target.value))}
                    min={1}
                    disabled={endType === 'never'}
                  />
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter className="flex w-full !flex-row !items-center gap-4 !mt-6">
          <Button variant="outline" onClick={onNext}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
