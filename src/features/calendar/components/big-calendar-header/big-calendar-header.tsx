import { useEffect, useState } from 'react';
import { Search, ListFilter, Plus } from 'lucide-react';
import { SlotInfo } from 'react-big-calendar';
import { Button } from 'components/ui/button';
import { Dialog } from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { AddEvent } from '../modals/add-event/add-event';
import { CalendarFilterSheet } from '../calendar-filters-sheet/calendar-filters-sheet';

interface BigCalendarHeaderProps {
  title?: string;
  onAddEvent: () => void;
  selectedSlot: SlotInfo | null;
  onEventSubmit: (data: { title: string; start: string; end: string }) => void;
  onDialogClose: () => void;
  searchPlaceholder?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BigCalendarHeader = ({
  title = 'Calendar',
  onAddEvent,
  selectedSlot,
  onEventSubmit,
  onDialogClose,
  searchPlaceholder = 'Search',
  onSearchChange,
}: Readonly<BigCalendarHeaderProps>) => {
  const [openSheet, setOpenSheet] = useState(false);

  const handleFilters = () => {
    setOpenSheet(true);
  };

  useEffect(() => {
    if (openSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openSheet]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold leading-9">{title}</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 bg-background" />
            <Input
              placeholder={searchPlaceholder}
              className="h-8 w-full rounded-lg bg-background pl-8"
              onChange={onSearchChange}
            />
          </div>
          <Button variant="outline" size="sm" className="text-sm font-bold" onClick={handleFilters}>
            <ListFilter className="w-5 h-5" />
            Filters
          </Button>
          <Button size="sm" onClick={onAddEvent} className="text-sm font-bold">
            <Plus className="w-5 h-5" />
            Add Event
          </Button>
        </div>
      </div>
      <Dialog open={!!selectedSlot} onOpenChange={onDialogClose}>
        {selectedSlot && (
          <AddEvent
            start={selectedSlot.start}
            end={selectedSlot.end}
            onSubmit={onEventSubmit}
            onCancel={onDialogClose}
          />
        )}
      </Dialog>
      <CalendarFilterSheet open={openSheet} onOpenChange={setOpenSheet} />
    </>
  );
};
