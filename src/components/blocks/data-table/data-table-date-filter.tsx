// import React from 'react';
// import { Column } from '@tanstack/react-table';
// import { CalendarIcon } from 'lucide-react';
// import { formatDate } from 'utils/custom-date';
// import { useIsMobile } from 'hooks/use-mobile';
// import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
// import { Button } from 'components/ui/button';
// import { Separator } from 'components/ui/separator';
// import usePopoverWidth from 'hooks/use-popover-width';
// import { Calendar } from 'components/ui/calendar';
// import { DateRange } from 'react-day-picker';

// interface DateRangeFilterProps<TData, TValue> {
//   column?: Column<TData, TValue>;
//   title: string;
//   date: DateRange | undefined;
//   onDateChange: (date: DateRange | undefined) => void;
// }

// export function DateRangeFilter<TData, TValue>({
//   column,
//   title,
//   date,
//   onDateChange,
// }: DateRangeFilterProps<TData, TValue>) {
//   const isMobile = useIsMobile();
//   const [buttonRef, popoverWidth] = usePopoverWidth();
//   const [open, setOpen] = React.useState(false);

//   const handleDateSelect = (selectedDateRange: DateRange | undefined) => {
//     onDateChange(selectedDateRange);
//     if (selectedDateRange?.from && selectedDateRange?.to) {
//       column?.setFilterValue(selectedDateRange);
//     } else {
//       column?.setFilterValue(undefined);
//     }
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button ref={buttonRef} variant="outline" size="sm" className="h-8 border-dashed w-full">
//           <div className="flex w-full items-center justify-between">
//             <div className="flex items-center">
//               <CalendarIcon className="mr-2 h-4 w-4" />
//               <span>{title}</span>
//             </div>
//             {date?.from && (
//               <>
//                 <Separator orientation="vertical" className="hidden h-4 sm:mx-2 sm:block" />
//                 <span className="truncate ml-2">
//                   {formatDate(date.from, true)}
//                   {date.to && (
//                     <>
//                       {' - '}
//                       {formatDate(date.to, true)}
//                     </>
//                   )}
//                 </span>
//               </>
//             )}
//           </div>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent
//         className="p-0"
//         align="start"
//         sideOffset={8}
//         style={{
//           width: isMobile ? (popoverWidth ? `${popoverWidth}px` : '100%') : 'auto',
//           maxWidth: '100vw',
//         }}
//       >
//         <Calendar
//           initialFocus
//           mode="range"
//           defaultMonth={date?.from}
//           selected={date}
//           onSelect={(newDate) => {
//             handleDateSelect(newDate);
//             if (newDate?.from && newDate?.to) {
//               setOpen(false);
//             }
//           }}
//           numberOfMonths={isMobile ? 1 : 2}
//           className="rounded-md border"
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }

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
}: DateRangeFilterProps<TData, TValue>) {
  const isMobile = useIsMobile();
  const [buttonRef, popoverWidth] = usePopoverWidth();
  const [open, setOpen] = React.useState(false);
  const [localDateRange, setLocalDateRange] = React.useState<DateRange | undefined>(date);

  // Update local state when props change
  React.useEffect(() => {
    setLocalDateRange(date);
  }, [date]);

  const handleDateSelect = (selectedDateRange: DateRange | undefined) => {
    setLocalDateRange(selectedDateRange);

    // Update the parent component via onDateChange
    onDateChange(selectedDateRange);

    // Only set the filter value when both from and to dates are selected
    if (selectedDateRange?.from && selectedDateRange?.to) {
      column?.setFilterValue(selectedDateRange);
      // Intentionally not closing the popover here to allow further adjustments
    } else if (!selectedDateRange?.from) {
      // If completely cleared within the calendar
      column?.setFilterValue(undefined);
    }

    // Prevent popover from closing by not calling setOpen(false)
  };

  const clearFilter = (e: React.MouseEvent) => {
    // Prevent event from bubbling up to parent elements
    e.stopPropagation();

    setLocalDateRange(undefined);
    onDateChange(undefined);
    column?.setFilterValue(undefined);
    setOpen(false); // Explicitly close popover when clearing filter
  };

  const hasActiveFilter = localDateRange?.from != null;

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
          width: isMobile ? (popoverWidth ? `${popoverWidth}px` : '100%') : 'auto',
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
