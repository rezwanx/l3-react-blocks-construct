import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { Calendar, ChevronDown, ChevronUp, Link, Trash, Users } from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
} from 'components/ui/dialog';
import { useToast } from 'hooks/use-toast';
import { CalendarEvent } from '../../../types/calendar-event.types';
import { MEMBER_STATUS } from '../../../enums/calendar.enum';

interface EventDetailsProps {
  event: CalendarEvent;
  onClose: () => void;
  onNext: () => void;
}

export function EventDetails({ event, onClose, onNext }: EventDetailsProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showToggleButton, setShowToggleButton] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      const el = descriptionRef.current;
      if (el) {
        const isTruncated = el.scrollHeight > el.clientHeight;
        setShowToggleButton(isTruncated);
      }
    };

    const timeout = setTimeout(checkTruncation, 0);

    return () => clearTimeout(timeout);
  }, [event.description]);

  const members = event.resource?.members || [];

  const acceptedCount = members.filter((m) => m.status === MEMBER_STATUS.ACCEPTED).length;
  const declinedCount = members.filter((m) => m.status === MEMBER_STATUS.DECLINED).length;
  const noResponseCount = members.filter((m) => m.status === MEMBER_STATUS.NORESPONSE).length;

  const formattedStart = format(event.start, 'dd.MM.yyyy, HH:mm');
  const formattedEnd = format(event.end, 'HH:mm');

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="flex flex-col w-full gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-medium-emphasis" />
            <p className="font-semibold text-base text-high-emphasis">
              {formattedStart} - {formattedEnd}
            </p>
          </div>
          <div className="flex gap-2">
            <Link className="w-5 h-5 text-medium-emphasis mt-1" />
            <a
              onClick={() => {
                toast({
                  variant: 'success',
                  title: 'Zoom link clicked',
                  description: 'Opening Zoom. Please note this is a placeholder link.',
                });
              }}
              className="text-base font-normal underline text-primary leading-6 hover:text-primary-800 cursor-pointer w-[90%]"
            >
              {event.meetingLink}
            </a>
          </div>
          {members.length > 0 && (
            <div className="flex gap-2">
              <Users className="w-5 h-5 text-medium-emphasis" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-base text-high-emphasis">
                  {members.length} invited
                </p>
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
              <div className="flex-1" style={{ minHeight: '60px' }}>
                <p
                  ref={descriptionRef}
                  className={`font-normal text-sm text-high-emphasis transition-all ${
                    !isExpanded && 'line-clamp-3'
                  }`}
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: isExpanded ? 'unset' : 3,
                    overflow: 'hidden',
                  }}
                >
                  {event.description}
                </p>
                {showToggleButton && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-semibold text-high-emphasis mt-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    )}
                    {isExpanded ? 'Show less' : 'Show more'}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="flex w-full !justify-between items-center mt-6">
          <Button variant="outline" size="icon">
            <Trash className="w-5 h-4 text-destructive" />
          </Button>
          <Button variant="outline" onClick={onNext}>
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
