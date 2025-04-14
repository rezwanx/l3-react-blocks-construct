import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from 'components/ui/sheet';
import { Button } from 'components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { Label } from 'components/ui/label';
import { useState } from 'react';

interface CalendarSettingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const weekDays = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
];

const timeScales = [
  { value: '15', label: '15 mins' },
  { value: '30', label: '30 mins' },
  { value: '60', label: '60 mins' },
];

const eventDurations = [
  { value: '15', label: '15 mins' },
  { value: '30', label: '30 mins' },
  { value: '45', label: '45 mins' },
  { value: '60', label: '60 mins' },
];

export const CalendarSettingSheet = ({
  open,
  onOpenChange,
}: Readonly<CalendarSettingSheetProps>) => {
  const [firstDayOfWeek, setFirstDayOfWeek] = useState('monday');
  const [timeScale, setTimeScale] = useState('30');
  const [defaultDuration, setDefaultDuration] = useState('30');

  const handleReset = () => {
    setFirstDayOfWeek('monday');
    setTimeScale('30');
    setDefaultDuration('30');
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent className="flex flex-col h-screen sm:h-[calc(100dvh-48px)] justify-between w-full sm:min-w-[450px] md:min-w-[450px] lg:min-w-[450px] sm:fixed sm:top-[57px]">
        <div className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Calendar settings</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-high-emphasis font-normal">
                Show the first day of the week as
              </Label>
              <Select value={firstDayOfWeek} onValueChange={setFirstDayOfWeek}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first day" />
                </SelectTrigger>
                <SelectContent>
                  {weekDays.map((day) => (
                    <SelectItem key={day.value} value={day.value}>
                      {day.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-high-emphasis font-normal">Time scale</Label>
              <Select value={timeScale} onValueChange={setTimeScale}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time scale" />
                </SelectTrigger>
                <SelectContent>
                  {timeScales.map((scale) => (
                    <SelectItem key={scale.value} value={scale.value}>
                      {scale.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-high-emphasis font-normal">
                Default event duration
              </Label>
              <Select value={defaultDuration} onValueChange={setDefaultDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select default duration" />
                </SelectTrigger>
                <SelectContent>
                  {eventDurations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <Button variant="outline" className="w-full sm:w-1/2" onClick={handleReset}>
            Reset To Default
          </Button>
          <Button className="w-full sm:w-1/2" onClick={handleSave}>
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
