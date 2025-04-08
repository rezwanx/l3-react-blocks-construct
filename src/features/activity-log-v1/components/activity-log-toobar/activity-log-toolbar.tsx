import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Calendar } from 'components/ui/calendar';

interface ActivityLogToolbarProps {
  onSearchChange?: (query: string) => void;
  onDateRangeChange?: (dateRange: DateRange | undefined) => void;
}

export function ActivityLogToolbar({ onSearchChange, onDateRangeChange }: ActivityLogToolbarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const debouncedSearch = debounce((value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchValue);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchValue, debouncedSearch]);

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    if (onDateRangeChange) {
      onDateRangeChange(newDateRange);
    }
  };

  const clearDateRange = () => {
    setDateRange(undefined);
    setIsPopoverOpen(false);
    if (onDateRangeChange) {
      onDateRangeChange(undefined);
    }
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 bg-background" />
        <Input
          placeholder="Search by description..."
          className="h-8 w-full rounded-lg bg-background pl-8"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircle />
            Date
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={handleDateRangeChange}
            numberOfMonths={2}
            className="rounded-md border"
            defaultMonth={dateRange?.from || new Date()}
          />
          <div className="p-2 border-t">
            <Button variant="ghost" onClick={clearDateRange} className="w-full" size="sm">
              Clear filter
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="sm" className="h-8 border-dashed">
        <PlusCircle />
        Module
      </Button>
    </div>
  );
}

export default ActivityLogToolbar;
