import React, { useState } from 'react';
import { TEmail } from '../../types/email.types';
import empty_email from 'assets/images/empty_email.svg';
import {
  Bookmark,
  EllipsisVertical,
  Forward,
  MailOpen,
  Reply,
  ReplyAll,
  Star,
  Tag,
  Trash2,
  TriangleAlert,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import EmailViewResponseType from './email-view-response-type';
import { Button } from 'components/ui/button';
import EmailViewResponseMore from './email-view-response-more';
import { EmailCompose } from '../email-compose/email-compose';
import { parseISO, format } from 'date-fns';

interface EmailViewProps {
  selectedEmail: TEmail | null;
  isComposing: boolean;
  handleCloseCompose: () => void;
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

export function EmailView({ selectedEmail, isComposing, handleCloseCompose }: EmailViewProps) {
  const [isReply, setIsReply] = useState(false);

  const [viewState, setViewState] = useState<ViewState>({
    personal: false,
    work: false,
    payment: false,
    invoice: false,
  });

  const [content, setContent] = useState('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  function formatDateTime(dateString: string) {
    const formattedDate = format(parseISO(dateString), 'EEE, dd.MM.yyyy, HH:mm');
    return formattedDate;
  }

  return (
    <div className={`flex h-full w-full  flex-col overflow-auto ${!selectedEmail && 'bg-surface'}`}>
      {!selectedEmail && (
        <div className="flex h-full w-full flex-col gap-6 items-center justify-center p-8 text-center">
          <img src={empty_email} alt="emailSentIcon" />
          <h3 className="text-xl font-medium">Select a mail to read</h3>
        </div>
      )}
      {selectedEmail && (
        <React.Fragment>
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
            <div className="w-0.5 h-4 bg-low-emphasis" />
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

          {selectedEmail && (
            <div className="border-t">
              <div className="flex justify-between py-3 border-b px-4">
                <p className="text-high-emphasis font-semibold">{selectedEmail?.subject}</p>
                <div className="flex gap-2">
                  {Object?.entries(viewState)
                    ?.filter(([, value]) => value)
                    ?.map(([key]) => {
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
                <EmailViewResponseType
                  selectedEmail={selectedEmail}
                  isReply={isReply}
                  setIsReply={setIsReply}
                />
                <p className="text-sm text-muted-foreground">
                  {formatDateTime(selectedEmail?.date)}
                </p>
              </div>

              <div className="mb-6 text-sm px-4">
                <p>{selectedEmail?.content || selectedEmail?.preview}</p>
              </div>

              <div className="bg-low-emphasis h-px mx-4 mb-6" />
            </div>
          )}
          {!isReply && (
            <div className="flex gap-4 text-sm  px-4">
              <Button
                variant="outline"
                className="bg-white"
                size="sm"
                onClick={() => {
                  setIsReply(!isReply);
                }}
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
          )}

          {isReply && selectedEmail && (
            <>
              <div className="px-4 flex flex-col gap-6">
                <EmailViewResponseMore
                  isReply={isReply}
                  setIsReply={setIsReply}
                  selectedEmail={selectedEmail}
                />
                <div>
                  <CustomTextEditor
                    value={content}
                    onChange={handleContentChange}
                    submitName="Send"
                    cancelButton="Discard"
                    showIcons={true}
                  />
                </div>
              </div>
            </>
          )}
        </React.Fragment>
      )}
      {isComposing && <EmailCompose onClose={handleCloseCompose} />}
    </div>
  );
}
