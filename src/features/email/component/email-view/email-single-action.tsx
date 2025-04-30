import { Star, Reply, EllipsisVertical, ReplyAll, Forward, Trash2 } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from 'components/ui/tooltip';
import { TEmail, TIsReplySingleActionState, TReply } from '../../types/email.types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

interface EmailSingleActionsProps {
  selectedEmail: TEmail | TReply | null;
  reply?: TReply;
  formatDateTime: (date: string) => string;
  onToggleStar?: (emailId: string, replyId?: string) => void;
  onReplyClick?: () => void; // Keep this for the in-place reply
  onPopOutReplyClick?: (email: TEmail | TReply | null) => void; // New prop for pop-out
  onMoreOptionsClick?: () => void;
  handleSetActiveReply: (action: 'reply' | 'replyAll' | 'forward') => void;
  isReplySingleAction?: TIsReplySingleActionState;
  setIsReplySingleAction?: React.Dispatch<
    React.SetStateAction<{ isReplyEditor: boolean; replyId: string }>
  >;
  handleComposeEmailForward: () => void;
  activeActionReply: { reply: boolean; replyAll: boolean; forward: boolean };
  handleSetActive: (action: 'reply' | 'replyAll' | 'forward') => void;
}

const EmailSingleActions = ({
  selectedEmail,
  formatDateTime,
  onToggleStar,
  onMoreOptionsClick,
  handleSetActiveReply,
  reply,
  setIsReplySingleAction,
  handleComposeEmailForward,
}: EmailSingleActionsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-end items-end line-clamp-1 gap-3 w-68 ">
      <p className="text-xs md:text-sm text-medium-emphasis">
        {formatDateTime(selectedEmail?.date || '')}
      </p>

      <div className="flex gap-3 justify-center items-center">
        <div className="hidden md:block w-px h-4 bg-low-emphasis" />
        <Tooltip>
          <TooltipTrigger asChild>
            <Star
              className={`h-5 w-5 ${selectedEmail?.isStarred && 'text-warning'} ${reply?.isStarred && 'text-warning'} cursor-pointer text-medium-emphasis`}
              onClick={() => {
                if (selectedEmail && onToggleStar) {
                  if (reply) {
                    onToggleStar(selectedEmail.id, reply.id);
                  } else {
                    onToggleStar(selectedEmail.id);
                  }
                }
              }}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-surface text-medium-emphasis" side="top" align="center">
            <p>{selectedEmail?.isStarred ? 'Not starred' : 'Starred'}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Reply
              className="h-5 w-5 text-medium-emphasis cursor-pointer"
              onClick={() => {
                if (setIsReplySingleAction) {
                  if (reply) {
                    setIsReplySingleAction((prev) => ({
                      ...prev,
                      replyId: reply.id,
                    }));
                  } else {
                    setIsReplySingleAction((prev) => ({
                      ...prev,
                      isReplyEditor: !prev.isReplyEditor,
                    }));
                  }
                  handleSetActiveReply('reply');
                }
              }}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-surface text-medium-emphasis" side="top" align="center">
            <p>Reply</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical
              className="h-5 w-5 text-medium-emphasis cursor-pointer"
              onClick={() => {
                if (onMoreOptionsClick) {
                  onMoreOptionsClick();
                }
              }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-52">
            <DropdownMenuItem
              className="flex p-3 gap-2 hover:bg-surface"
              onClick={() => {
                // handleSetActiveReply('reply');

                if (setIsReplySingleAction) {
                  if (reply) {
                    setIsReplySingleAction((prev) => ({
                      ...prev,
                      replyId: reply.id,
                    }));
                  } else {
                    setIsReplySingleAction((prev) => ({
                      ...prev,
                      isReplyEditor: !prev.isReplyEditor,
                    }));
                  }
                  handleSetActiveReply('reply');
                }
              }}
            >
              <Reply className="h-5 w-5 text-medium-emphasis" />
              <p className="text-high-emphasis font-normal">Reply</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex p-3 gap-2 hover:bg-surface"
              onClick={() => {
                if (setIsReplySingleAction) {
                  if (reply) {
                    setIsReplySingleAction((prev) => ({
                      ...prev,
                      replyId: reply.id,
                    }));
                  } else {
                    setIsReplySingleAction((prev) => ({
                      ...prev,
                      isReplyEditor: !prev.isReplyEditor,
                    }));
                  }
                  handleSetActiveReply('replyAll');
                }
              }}
            >
              <ReplyAll className="h-5 w-5 text-medium-emphasis" />
              <p className="text-high-emphasis font-normal">Reply All</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex p-3 gap-2 hover:bg-surface "
              onClick={handleComposeEmailForward}
            >
              <Forward className="h-5 w-5 text-medium-emphasis" />
              <p className="text-high-emphasis font-normal">Forward</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex p-3 gap-2 hover:bg-surface "
              onClick={handleComposeEmailForward}
            >
              <Trash2 className="h-5 w-5 text-medium-emphasis" />
              <p className="text-high-emphasis font-normal">Pop out reply</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EmailSingleActions;
