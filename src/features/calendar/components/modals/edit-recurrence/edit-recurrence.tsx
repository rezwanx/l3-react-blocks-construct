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

interface EditRecurrenceProps {
  event: CalendarEvent;
  onClose: () => void;
  onNext: () => void;
}

export function EditRecurrence({ event, onClose, onNext }: Readonly<EditRecurrenceProps>) {
  const [onDate, setOnDate] = useState<Date | undefined>(new Date());

  const selectValue = ['Day', 'Week', 'Month', 'Year'];
  const dayValue = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

  console.log('event', event);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Recurrence</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col gap-[6px]">
            <p className="font-normal text-sm text-high-emphasis">Repeat every</p>
            <div className="flex items-center gap-3 w-[60%]">
              <Input type="number" className="w-[40%]" />
              <Select>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectValue.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <p className="font-normal text-sm text-high-emphasis">Repeat on</p>
            <div className="flex items-center gap-3 w-full">
              <Input type="number" />
              <div className="flex items-center w-full gap-2">
                {dayValue.map((day) => (
                  <Button
                    key={day}
                    variant="outline"
                    size="sm"
                    className={`text-xs font-normal w-[100/${day.length}]`}
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-normal text-sm text-high-emphasis">Ends</p>
            <div className="flex items-center gap-3 w-full">
              <RadioGroup className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="never" id="status-never" />
                  <Label htmlFor="status-never" className="cursor-pointer">
                    Never
                  </Label>
                </div>
                <div className="flex items-center gap-2 w-[60%]">
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
                <div className="flex items-center gap-2 w-[60%]">
                  <div className="flex items-center gap-2 w-[40%]">
                    <RadioGroupItem value="after" id="status-after" />
                    <Label htmlFor="status-after" className="cursor-pointer">
                      After
                    </Label>
                  </div>
                  <Input type="number" className="w-[60%]" />
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <DialogFooter className="flex w-full !items-center !justify-between gap-4 !mt-6">
          <Button variant="outline" size="icon">
            <Trash className="!w-5 !h-4 text-destructive" />
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onNext}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
