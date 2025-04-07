import { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Trash, Users } from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'components/ui/dialog';
import { CalendarEvent } from '../../../types/calendar-event.types';
import { MEMBER_STATUS } from '../../../enums/calendar.enum';

interface EventDetailsProps {
  event: CalendarEvent;
  onClose: () => void;
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const members = event.resource?.members || [];

  const acceptedCount = members.filter((m) => m.status === MEMBER_STATUS.ACCEPTED).length;
  const declinedCount = members.filter((m) => m.status === MEMBER_STATUS.DECLINED).length;
  const noResponseCount = members.filter((m) => m.status === MEMBER_STATUS.NORESPONSE).length;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <div className="flex flex-col w-full gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-medium-emphasis" />
          <p className="font-semibold text-base text-high-emphasis">
            {event.start.toLocaleDateString()}, {event.start.toLocaleTimeString()} -{' '}
            {event.end.toLocaleTimeString()}
          </p>
        </div>
        {members.length > 0 && (
          <div className="flex gap-2">
            <Users className="w-5 h-5 text-medium-emphasis" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-high-emphasis">{members.length} invited</p>
              <p className="font-normal text-xs text-medium-emphasis">
                Accepted {acceptedCount}, Didn’t respond {noResponseCount}, & Declined{' '}
                {`${declinedCount}`}
              </p>
            </div>
          </div>
        )}
        {event.description && (
          <div className="flex flex-col items-start gap-3">
            <p className="font-semibold text-base text-high-emphasis">Description</p>
            <div className="flex-1">
              <p
                className={`font-normal text-sm text-high-emphasis ${
                  !isExpanded && 'line-clamp-3'
                }`}
              >
                {event.description}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-semibold text-high-emphasis"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 mr-1" />
                )}
                {isExpanded ? 'Show less' : 'Show more'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <DialogFooter className="flex w-full !justify-between items-center mt-6">
        <Button variant="outline" size="icon">
          <Trash className="w-5 h-4 text-destructive" />
        </Button>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onClose}>
            Edit
          </Button>
          <Button>Join</Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
}
