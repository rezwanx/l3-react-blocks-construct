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
import ConfirmationModal from 'components/blocks/confirmation-modal/confirmation-modal';
import { CalendarEvent } from '../../../types/calendar-event.types';
import { MEMBER_STATUS } from '../../../enums/calendar.enum';

interface EventDetailsProps {
  event: CalendarEvent;
  onClose: () => void;
  onNext: () => void;
  onDelete: (eventId: string) => void;
}

export function EventDetails({ event, onClose, onNext, onDelete }: Readonly<EventDetailsProps>) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [showToggleButton, setShowToggleButton] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  

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
  }, [event.resource?.description]);

  const members = event.resource?.members || [];

  const acceptedCount = members.filter((m) => m.status === MEMBER_STATUS.ACCEPTED).length;
  const declinedCount = members.filter((m) => m.status === MEMBER_STATUS.DECLINED).length;
  const noResponseCount = members.filter((m) => m.status === MEMBER_STATUS.NORESPONSE).length;

  const formattedStart = format(event.start, 'dd.MM.yyyy, HH:mm');
  const formattedEnd = format(event.end, 'HH:mm');

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(event.eventId ?? '');
    setShowDeleteDialog(false);
    onClose();
    toast({
      variant: 'success',
      title: 'Event Deleted Successfully',
      description: `The event titled "${event.title}" has been successfully deleted.`,
    });
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-medium-emphasis" />
              <p className="font-semibold text-base text-high-emphasis">
                {event?.allDay ? 'Whole Day' : `${formattedStart} - ${formattedEnd}`}
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
                {event.resource?.meetingLink}
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
            {event.resource?.description && (
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
                    dangerouslySetInnerHTML={{ __html: event.resource?.description }}
                  />
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
            <Button variant="outline" size="icon" onClick={handleDeleteClick}>
              <Trash className="w-5 h-4 text-destructive" />
            </Button>
            <Button variant="outline" onClick={onNext}>
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmationModal
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Delete Event"
        description={`Are you sure you want to delete the event: "${event.title}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
