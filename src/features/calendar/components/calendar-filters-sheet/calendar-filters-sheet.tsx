import { useState } from 'react';
import { CalendarIcon, Check } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from 'components/ui/sheet';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Calendar } from 'components/ui/calendar';
import { CalendarEventColor } from '../../enums/calendar.enum';

interface CalendarFiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CalendarFilterSheet = ({
  open,
  onOpenChange,
}: Readonly<CalendarFiltersSheetProps>) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({ from: new Date(), to: new Date() });

  const colors = Object.values(CalendarEventColor);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent className="flex flex-col h-screen sm:h-[calc(100dvh-48px)] justify-between w-full sm:min-w-[450px] md:min-w-[450px] lg:min-w-[450px] sm:fixed sm:top-[57px]">
        <div className="flex flex-col">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-6">
            <Popover open={openPopover} onOpenChange={setOpenPopover}>
              <PopoverTrigger asChild>
                <div className="relative w-full">
                  <Input
                    placeholder="Date range"
                    className="pl-8 cursor-pointer"
                    readOnly
                    value={
                      dateRange.from && dateRange.to
                        ? `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                        : ''
                    }
                    onClick={() => setOpenPopover(true)}
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-medium-emphasis pointer-events-none" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  numberOfMonths={2}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange(range);
                      setOpenPopover(false);
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-high-emphasis">Colors</p>
              <div className="flex items-center gap-4">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`cursor-pointer w-6 h-6 rounded-full bg-${color} flex items-center justify-center transition-all ${
                      selectedColor === color ? 'ring-2 ring-neutral-200' : ''
                    }`}
                  >
                    {selectedColor === color && <Check className="w-4 h-4 text-white" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-4">
          <Button
            variant="outline"
            className="w-full sm:w-1/2"
            onClick={() => {
              setSelectedColor(null);
              setDateRange({ from: new Date(), to: new Date() });
            }}
          >
            Reset
          </Button>
          <Button className="w-full sm:w-1/2">Apply</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
