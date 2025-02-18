import { useState } from 'react';
import { Input } from 'components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { Calendar } from 'lucide-react';

export function LastUpdatedFilterDropdown() {
  const [openLastUpdatedDropdown, setOpenLastUpdatedDropdown] = useState(false);

  return (
    <DropdownMenu open={openLastUpdatedDropdown} onOpenChange={setOpenLastUpdatedDropdown}>
      <div className="relative">
        <div className="relative w-full">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-medium-emphasis w-4 h-4" />
          <Input
            placeholder="Date"
            className="rounded-[6px] h-10 pl-10"
            onFocus={() => setOpenLastUpdatedDropdown(true)}
          />
        </div>
        <DropdownMenuTrigger asChild>
          <button className="absolute inset-0" aria-label="Open dropdown" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="p-4 space-y-3 z-50 bg-white border rounded-lg shadow-lg"
        >
          <RadioGroup>
            {[
              { value: 'today', label: 'Today' },
              { value: 'date', label: 'Date' },
              { value: 'date_range', label: 'Date range' },
              { value: 'after', label: 'After' },
              { value: 'before', label: 'before' },
              { value: 'no_entry', label: 'No entry' },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <label htmlFor={option.value} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
          <div>
            <Label className="text-sm font-normal">Date</Label>
            <div className="relative w-full">
              <Input />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-medium-emphasis w-4 h-4" />
            </div>
          </div>
          <Button variant="ghost" className="w-full" size="sm">
            Clear filter
          </Button>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
