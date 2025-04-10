import React, { useState, useEffect } from 'react';
import { TEmail } from '../../types/email.types';
import empty_email from 'assets/images/empty_email.svg';
import {
  Bookmark,
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
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import EmailViewResponseType from './email-view-response-type';
import { Button } from 'components/ui/button';
import EmailViewResponseMore from './email-view-response-more';
import { EmailCompose } from '../email-compose/email-compose';
import { parseISO, format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { Checkbox } from 'components/ui/checkbox';

/**
 * EmailView component displays the content of a selected email, allows for viewing and replying to emails,
 * and provides options for email status, such as marking as unread, spam, or moving to trash.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {TEmail | null} props.selectedEmail - The selected email object that contains email details like subject, content, date, etc.
 * @param {boolean} props.isComposing - A flag indicating whether the user is composing a new email.
 * @param {Function} props.handleCloseCompose - A function to close the email composition window.
 *
 * @returns {JSX.Element} - The EmailView component displaying the selected email, its content, and options for replying or composing.
 *
 * @example
 * return (
 *   <EmailView
 *     selectedEmail={selectedEmail}
 *     isComposing={isComposing}
 *     handleCloseCompose={handleCloseCompose}
 *   />
 * )
 */

interface EmailViewProps {
  selectedEmail: TEmail | null;
  isComposing: boolean;
  handleCloseCompose: () => void;
  updateEmail: (emailId: string, updates: Partial<TEmail>) => void;
  moveEmailToCategory: (emailId: string, destination: 'spam' | 'trash') => void;
  setSelectedEmail: (email: TEmail | null) => void;
  isAllSelected: boolean;
  addOrUpdateEmailInSent: (email: TEmail) => void;
  checkedEmailIds: string[];
}

interface ViewState {
  [key: string]: boolean;
}

const statusLabels: Record<string, { label: string; border: string; text: string }> = {
  personal: { label: 'Personal', border: 'border-purple-500', text: 'text-purple-500' },
  work: { label: 'Work', border: 'border-secondary-400', text: 'text-secondary-400' },
  payments: { label: 'Payments', border: 'border-green-500', text: 'text-green-500' },
  invoices: { label: 'Invoices', border: 'border-blue-500', text: 'text-blue-500' },
};

export function EmailView({
  selectedEmail,
  isComposing,
  handleCloseCompose,
  updateEmail,
  moveEmailToCategory,
  setSelectedEmail,
  isAllSelected,
  addOrUpdateEmailInSent,
  checkedEmailIds,
}: EmailViewProps) {
  const [isReply, setIsReply] = useState(false);

  const [viewState, setViewState] = useState<ViewState>({});

  const [content, setContent] = useState('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  function formatDateTime(dateString: string) {
    const formattedDate = format(parseISO(dateString), 'EEE, dd.MM.yyyy, HH:mm');
    return formattedDate;
  }

  useEffect(() => {
    if (selectedEmail && selectedEmail?.tags) {
      setViewState((selectedEmail.tags as ViewState) || {});
    } else {
      setViewState({});
    }
  }, [selectedEmail]);

  const handleTagChange = (tag: string, checked: boolean) => {
    setViewState((prev) => ({
      ...prev,
      [tag]: checked,
    }));

    if (selectedEmail) {
      updateEmail(selectedEmail.id, {
        tags: { ...selectedEmail.tags, [tag]: checked },
      });
    }
  };

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
                {selectedEmail.tags &&
                  Object.keys(statusLabels).map((key) => (
                    <div key={key} className="flex items-center gap-2 px-4 py-2">
                      <Checkbox
                        id="select-all"
                        checked={viewState[key] || false}
                        onCheckedChange={(checked) => handleTagChange(key, !!checked)}
                      />
                      <label
                        htmlFor="select-all"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {statusLabels[key].label}
                      </label>
                    </div>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Tooltip>
              <TooltipTrigger asChild>
                <Bookmark
                  className={`h-5 w-5 ${selectedEmail.bookmarked && 'text-secondary-400'} cursor-pointer`}
                  onClick={() => {
                    if (selectedEmail) {
                      updateEmail(selectedEmail.id, { bookmarked: !selectedEmail.bookmarked });
                    }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-surface text-medium-emphasis" side="top" align="center">
                <p>{selectedEmail.bookmarked ? 'Unbookmark' : 'Bookmark'}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Star
                  className={`h-5 w-5 ${selectedEmail?.isStarred && 'text-warning'} cursor-pointer`}
                  onClick={() => {
                    if (selectedEmail) {
                      updateEmail(selectedEmail.id, {
                        isStarred: !selectedEmail.isStarred,
                      });
                    }
                  }}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-surface text-medium-emphasis" side="top" align="center">
                <p>{selectedEmail.isStarred ? 'Unstarred' : 'Starred'}</p>
              </TooltipContent>
            </Tooltip>
            {!isAllSelected && checkedEmailIds.length === 0 && (
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MailOpen
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => setSelectedEmail(null)}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>Close Mail</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TriangleAlert
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => {
                        if (selectedEmail) {
                          moveEmailToCategory(selectedEmail.id, 'spam');
                        }
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>Spam</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Trash2
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => {
                        if (selectedEmail) {
                          moveEmailToCategory(selectedEmail.id, 'trash');
                        }
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>Trash</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {selectedEmail && (
            <div className="border-t">
              <div className="flex justify-between py-3 border-b px-4">
                <p className="text-high-emphasis font-semibold">{selectedEmail?.subject}</p>
                <div className="flex gap-2">
                  {Object.keys(viewState)
                    .filter((key) => viewState[key] && statusLabels[key])
                    .map((key) => {
                      const { label, border, text } = statusLabels[key];
                      return (
                        <div
                          key={key}
                          className={`flex justify-center items-center gap-1 px-2 py-0.5 border ${border} rounded`}
                        >
                          <p className={`font-semibold text-xs ${text}`}>{label}</p>
                          <X
                            className="h-3 w-3 text-medium-emphasis cursor-pointer"
                            onClick={() => handleTagChange(key, false)}
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedEmail?.content || selectedEmail?.preview,
                  }}
                />
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
      {isComposing && (
        <EmailCompose
          addOrUpdateEmailInSent={addOrUpdateEmailInSent}
          onClose={handleCloseCompose}
        />
      )}
    </div>
  );
}
