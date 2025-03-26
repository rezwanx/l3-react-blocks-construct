import { ChevronDown, Forward, Reply, ReplyAll, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { TEmail } from '../../types/email.types';
import { Button } from 'components/ui/button';
import EmailAvatar from '../email-ui/email-avatar';

interface EmailViewResponseTypeProps {
  selectedEmail?: TEmail;
  isReply: boolean;
  setIsReply: (isReply: boolean) => void;
}

const EmailViewResponseMore = ({
  isReply,
  setIsReply,
  selectedEmail,
}: EmailViewResponseTypeProps) => {
  const onReplyClick = () => {
    setIsReply(!isReply);
  };

  return (
    <div className="border-b border-low-emphasis py-1">
      <div className="flex gap-2 items-center ">
        <div className="flex  gap-2 text-medium-emphasis ">
          <Reply className="h-5 w-5 " />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ChevronDown className="h-5 w-5 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-52">
              <DropdownMenuItem className="flex p-3 gap-2 hover:bg-surface" onClick={onReplyClick}>
                <Reply className="h-5 w-5 text-medium-emphasis" />
                <p className="text-high-emphasis font-normal">Reply</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex p-3 gap-2 hover:bg-surface ">
                <ReplyAll className="h-5 w-5 text-medium-emphasis" />
                <p className="text-high-emphasis font-normal">Reply All</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex p-3 gap-2 hover:bg-surface ">
                <Forward className="h-5 w-5 text-medium-emphasis" />
                <p className="text-high-emphasis font-normal">Forward</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex p-3 gap-2 hover:bg-surface ">
                <Trash2 className="h-5 w-5 text-medium-emphasis" />
                <p className="text-high-emphasis font-normal">Pop out reply</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="">
          <Button variant={'outline'}>
            <EmailAvatar
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg"
              alt="Profile avatar"
              height={24}
              width={24}
            />
            {selectedEmail?.sender}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailViewResponseMore;
