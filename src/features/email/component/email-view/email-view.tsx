import { useState } from 'react';
import { TEmail } from '../../types/email';
import empty_email from 'assets/images/empty_email.svg';
import {
  Bookmark,
  EllipsisVertical,
  Forward,
  Image,
  MailOpen,
  Paperclip,
  Reply,
  ReplyAll,
  Smile,
  Star,
  Tag,
  Trash2,
  TriangleAlert,
  X,
} from 'lucide-react';
import { Button } from 'components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';
import { Textarea } from 'components/ui/textarea';

interface EmailViewProps {
  selectedEmail: TEmail | null;
}

interface ViewState {
  personal: boolean;
  work: boolean;
  payment: boolean;
  invoice: boolean;
}

const statusLabels: Record<keyof ViewState, { label: string; border: string; text: string }> = {
  personal: { label: 'Personal', border: 'border-purple-500', text: 'text-purple-500' },
  work: { label: 'Work', border: 'border-secondary-400', text: 'text-secondary-400' },
  payment: { label: 'Payments', border: 'border-green-500', text: 'text-green-500' },
  invoice: { label: 'Invoices', border: 'border-blue-500', text: 'text-blue-500' },
};

export function EmailView({ selectedEmail }: EmailViewProps) {
  const [isReply, setIsReply] = useState(false);

  const [viewState, setViewState] = useState<ViewState>({
    personal: false,
    work: false,
    payment: false,
    invoice: false,
  });

  if (!selectedEmail) {
    return (
      <div className="flex h-full w-full flex-col gap-6 items-center justify-center p-8 text-center">
        <img src={empty_email} alt="emailSentIcon" />
        <h3 className="text-xl font-medium">Select a mail to read</h3>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-auto">
      <div className="flex justify-end items-center my-4 px-4 gap-4 min-h-[32px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Tag className="h-5 w-5 text-medium-emphasis cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {Object.entries(statusLabels).map(([key, { label }]) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={viewState[key as keyof ViewState]}
                onCheckedChange={(checked) =>
                  setViewState((prev) => ({
                    ...prev,
                    [key]: checked,
                  }))
                }
              >
                {label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Bookmark className="h-5 w-5 text-secondary-400" />
        <Star className="h-5 w-5 text-warning" />
        <div className="w-0.5 h-4 bg-low-emphasis"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <EllipsisVertical className="h-5 w-5 text-medium-emphasis cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <MailOpen className="h-4 w-4" />
              Mark as unread
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TriangleAlert className="h-4 w-4" />
              Mark as spam
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2 className="h-4 w-4" />
              Move to trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border-t">
        <div className="flex justify-between py-3 border-b px-4">
          <p className="text-high-emphasis font-semibold">{selectedEmail.subject}</p>
          <div className="flex gap-2">
            {Object.entries(viewState)
              .filter(([, value]) => value)
              .map(([key]) => {
                const { label, border, text } = statusLabels[key as keyof ViewState];
                return (
                  <div
                    key={key}
                    className={`flex justify-center items-center gap-1 px-2 py-0.5 border ${border} rounded`}
                  >
                    <p className={`font-semibold text-xs ${text}`}>{label}</p>
                    <X
                      className="h-3 w-3 text-medium-emphasis cursor-pointer"
                      onClick={() =>
                        setViewState((prev) => ({
                          ...prev,
                          [key]: false,
                        }))
                      }
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="my-6 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-primary">
              {selectedEmail.sender.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{selectedEmail.sender}</p>
              <p className="text-sm text-muted-foreground">to me</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{selectedEmail.date}</p>
        </div>

        <div className="mb-6 text-sm px-4">
          <p>{selectedEmail.content || selectedEmail.preview}</p>
        </div>

        <div className="flex gap-4 text-sm text-black px-4">
          <Button
            variant="outline"
            className="bg-white"
            size="sm"
            onClick={() => setIsReply(!isReply)}
          >
            <Reply className="h-4 w-4" />
            Reply
          </Button>
          <Button variant="outline" size="sm">
            <ReplyAll className="h-4 w-4" />
            Reply All
          </Button>
          <Button variant="outline" size="sm">
            <Forward className="h-4 w-4" />
            Forward
          </Button>
        </div>
      </div>

      {isReply && (
        <div className="flex flex-col gap-6 px-4 py-6">
          <Textarea placeholder={`Reply to ${selectedEmail.sender}`} height={'154px'} />
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image className="h-5 w-5 text-medium-emphasis" />
              <Paperclip className="h-5 w-5 text-medium-emphasis" />
              <Smile className="h-5 w-5 text-medium-emphasis" />
            </div>
            <div className="flex gap-4">
              <Button variant="outline">Discard</Button>
              <Button>Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
