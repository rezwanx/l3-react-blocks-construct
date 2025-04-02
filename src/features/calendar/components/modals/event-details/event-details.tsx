import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Trash, User } from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'components/ui/dialog';

export function EventDetails() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Finalize Q1 Budget</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-medium-emphasis" />
          <p className="font-semibold text-base text-high-emphasis">15.03.2025, 13:00 - 14:00</p>
        </div>
        <div className="flex gap-2">
          <User className="w-5 h-5 text-medium-emphasis" />
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-base text-high-emphasis">2 invited</p>
            <p className="font-normal text-xs text-medium-emphasis">Accepted 1, Didn`t respond 1</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <p className="font-semibold text-base text-high-emphasis">Description</p>
          <p
            className={`font-normal text-sm text-high-emphasis flex-1 ${
              !isExpanded && 'line-clamp-3'
            }`}
          >
            Review and finalize the budget allocations for Q1. Ensure all expenses, projections, and
            adjustments are accounted for before submission. Discuss any necessary revisions with
            key stakeholders.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="text-sm font-semibold text-high-emphasis"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-high-emphasis transition-transform duration-200" />
            ) : (
              <ChevronDown className="w-4 h-4 text-high-emphasis transition-transform duration-200" />
            )}
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </div>
      </div>
      <DialogFooter className="flex w-full !items-center !justify-between gap-4 !mt-6">
        <Button variant="outline" size="icon">
          <Trash className="!w-5 !h-4 text-destructive" />
        </Button>
        <div className="flex gap-4">
          <Button variant="outline" type="button">
            Edit
          </Button>
          <Button>Join</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
