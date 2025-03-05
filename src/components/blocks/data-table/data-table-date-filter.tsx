import React from 'react';
import { Column } from '@tanstack/react-table';
import { CalendarIcon } from 'lucide-react';
import { formatDate } from 'utils/custom-date';
import { useIsMobile } from 'hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import usePopoverWidth from 'hooks/use-popover-width';
import { Calendar } from 'components/ui/calendar';
import { DateRange } from 'react-day-picker';

interface DateRangeFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title: string;
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DateRangeFilter<TData, TValue>({
  column,
  title,
  date,
  onDateChange,
}: Readonly<DateRangeFilterProps<TData, TValue>>) {
  const isMobile = useIsMobile();
  const [buttonRef, popoverWidth] = usePopoverWidth();
  const [open, setOpen] = React.useState(false);
  const [localDateRange, setLocalDateRange] = React.useState<DateRange | undefined>(date);

  React.useEffect(() => {
    setLocalDateRange(date);
  }, [date]);

  const handleDateSelect = (selectedDateRange: DateRange | undefined) => {
    setLocalDateRange(selectedDateRange);

    onDateChange(selectedDateRange);

    if (selectedDateRange?.from && selectedDateRange?.to) {
      column?.setFilterValue(selectedDateRange);
      setOpen(true);
    } else if (!selectedDateRange?.from) {
      column?.setFilterValue(undefined);
      setOpen(true);
    }
  };

  const clearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();

    setLocalDateRange(undefined);
    onDateChange(undefined);
    column?.setFilterValue(undefined);
    setOpen(false);
  };

  const hasActiveFilter = localDateRange?.from != null;
  let width;

  if (popoverWidth) {
    width = `${popoverWidth}px`;
  } else {
    width = '100%';
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={buttonRef}
          variant={hasActiveFilter ? 'default' : 'outline'}
          size="sm"
          className={`h-8 ${!hasActiveFilter && 'border-dashed'} w-full`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{title}</span>
            </div>
            {localDateRange?.from && (
              <>
                <Separator orientation="vertical" className="hidden h-4 sm:mx-2 sm:block" />
                <span className="truncate ml-2">
                  {formatDate(localDateRange.from, true)}
                  {localDateRange.to && (
                    <>
                      {' - '}
                      {formatDate(localDateRange.to, true)}
                    </>
                  )}
                </span>
              </>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        align="start"
        sideOffset={8}
        style={{
          width: isMobile ? width : 'auto',
          maxWidth: '100vw',
        }}
      >
        <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={localDateRange?.from || new Date()}
            selected={localDateRange || { from: new Date(), to: undefined }}
            onSelect={handleDateSelect}
            numberOfMonths={isMobile ? 1 : 2}
            className="rounded-md border"
          />
          <div className="p-2 border-t">
            <Button variant="ghost" onClick={clearFilter} className="w-full" size="sm">
              Clear filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
