import React, { useState, useEffect } from 'react';
import { TActiveAction, TEmail, TEmailData, TIsComposing } from '../../types/email.types';
import empty_email from 'assets/images/empty_email.svg';
import {
  ArrowLeft,
  Bookmark,
  ChevronUp,
  Download,
  FileText,
  Forward,
  Image,
  MailOpen,
  Paperclip,
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
import EmailViewResponseType from './email-view-response-type';
import { Button } from 'components/ui/button';
import { EmailCompose } from '../email-compose/email-compose';
import { parseISO, format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';
import { Checkbox } from 'components/ui/checkbox';
import EmailTextEditor from '../email-ui/email-text-editor';
import { Label } from 'components/ui/label';
import EmailAvatar from '../email-ui/email-avatar';
import EmailActionsPanel from './email-actions-panel';
import { useNavigate } from 'react-router-dom';

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
  isComposing: TIsComposing;
  handleCloseCompose: () => void;
  updateEmail: (emailId: string, updates: Partial<TEmail>) => void;
  moveEmailToCategory: (emailId: string, destination: 'spam' | 'trash') => void;
  setSelectedEmail: (email: TEmail | null) => void;
  isAllSelected: boolean;
  addOrUpdateEmailInSent: (email: TEmail) => void;
  checkedEmailIds: string[];
  emails: Partial<TEmailData>;
  setEmails: React.Dispatch<React.SetStateAction<Record<string, TEmail[]>>>;
  handleComposeEmailForward: () => void;
  toggleEmailAttribute: (emailId: string, destination: 'isStarred' | 'isImportant') => void;
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
  emails,
  setEmails,
  handleComposeEmailForward,
  toggleEmailAttribute,
}: Readonly<EmailViewProps>) {
  const [activeAction, setActiveAction] = useState<TActiveAction>({
    reply: false,
    replyAll: false,
    forward: false,
  });
  const navigate = useNavigate();
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

  const handleSetActive = (actionType: keyof TActiveAction) => {
    setActiveAction((prevState) => {
      const newState: TActiveAction = {
        reply: false,
        replyAll: false,
        forward: false,
      };
      newState[actionType] = !prevState[actionType];
      return newState;
    });
  };

  const handleSendEmail = (emailId: string) => {
    if (activeAction.reply || activeAction.replyAll) {
      const email = (emails.inbox ?? []).find((email) => email.id === emailId);

      if (!email) {
        console.warn(`Email with id '${emailId}' not found.`);
        return;
      }

      const updatedReply = [...(email.reply ?? []), content];

      const updatedInbox = (emails.inbox ?? []).map((email) => {
        if (email.id === emailId) {
          return {
            ...email,
            reply: updatedReply,
          };
        }
        return email;
      });

      setEmails((prev) => ({
        ...prev,
        inbox: updatedInbox,
      }));

      setSelectedEmail({
        ...email,
        reply: updatedReply,
      });
      setContent('');

      setActiveAction({ reply: false, replyAll: false, forward: false });
    }
  };

  const onGoBack = () => {
    setSelectedEmail(null);
    navigate(-1);
  };

  return (
    <>
      {/* Grid View */}
      <div
        className={`hidden md:flex h-[calc(100vh-130px)] w-full flex-col overflow-y-auto ${!selectedEmail && 'bg-surface'}`}
      >
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
                        <Label
                          htmlFor="select-all"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {statusLabels[key].label}
                        </Label>
                      </div>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Bookmark
                    className={`h-5 w-5 ${selectedEmail.isImportant && 'text-secondary-400'} cursor-pointer`}
                    onClick={() => {
                      if (selectedEmail) {
                        toggleEmailAttribute(selectedEmail.id, 'isImportant');
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent
                  className="bg-surface text-medium-emphasis"
                  side="top"
                  align="center"
                >
                  <p>{selectedEmail.isImportant ? 'not important' : 'Important'}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Star
                    className={`h-5 w-5 ${selectedEmail?.isStarred && 'text-warning'} cursor-pointer`}
                    onClick={() => {
                      if (selectedEmail) {
                        toggleEmailAttribute(selectedEmail.id, 'isStarred');
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent
                  className="bg-surface text-medium-emphasis"
                  side="top"
                  align="center"
                >
                  <p>{selectedEmail.isStarred ? 'Not starred' : 'Starred'}</p>
                </TooltipContent>
              </Tooltip>
              {checkedEmailIds.length === 0 && (
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
                <div>
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
                    <EmailViewResponseType selectedEmail={selectedEmail} />
                    <p className="text-sm text-medium-emphasis">
                      {formatDateTime(selectedEmail?.date)}
                    </p>
                  </div>

                  <div className=" mb-6 text-sm px-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedEmail?.content || selectedEmail?.preview,
                      }}
                    />
                  </div>
                  {((selectedEmail?.images?.length ?? 0) > 0 ||
                    (selectedEmail?.attachments?.length ?? 0) > 0) && (
                    <div className="px-4">
                      <div className="p-2 flex flex-col gap-3  bg-surface rounded">
                        <div className="flex justify-between">
                          <div className="flex gap-2 items-center text-medium-emphasis text-sm">
                            <Paperclip className="w-4 h-4" />
                            <p>{`${(selectedEmail?.images?.length ?? 0) + (selectedEmail?.attachments?.length ?? 0)} attachments`}</p>
                            <ChevronUp className="h-4 w-4" />
                          </div>
                          <div>
                            <Button variant={'link'}>
                              <Download className="h-4 w-4" />
                              Download All
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {(selectedEmail?.attachments?.length ?? 0) > 0 &&
                            (selectedEmail?.attachments ?? []).map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="bg-white p-2 rounded">
                                  <FileText className="w-10 h-10 text-secondary-400" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm  text-high-emphasis">{attachment}</p>
                                  <p className="text-[10px] text-medium-emphasis">{`600.00 KB`}</p>
                                </div>
                              </div>
                            ))}
                          {(selectedEmail?.images?.length ?? 0) > 0 &&
                            (selectedEmail?.images ?? []).map((image, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="bg-white p-2 rounded">
                                  <Image className="w-10 h-10 text-secondary-400" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm  text-high-emphasis">{image}</p>
                                  <p className="text-[10px] text-medium-emphasis">{`600.00 KB`}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-low-emphasis h-px mx-4 my-6" />
                </div>

                {selectedEmail &&
                  selectedEmail.reply &&
                  selectedEmail.reply.map((reply, index) => (
                    <div key={index} className="px-4">
                      <div className="flex justify-start items-center gap-4">
                        <EmailAvatar
                          name={selectedEmail.sender}
                          alt="Profile avatar"
                          height={48}
                          width={48}
                        />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: reply,
                          }}
                        />
                      </div>

                      <div className="bg-low-emphasis h-px my-6" />
                    </div>
                  ))}
              </div>
            )}
            {!(activeAction.reply || activeAction.replyAll || activeAction.forward) && (
              <div className="flex gap-4 text-sm  px-4 pb-8">
                <Button
                  variant="outline"
                  className="bg-white"
                  size="sm"
                  onClick={() => {
                    handleSetActive('reply');
                  }}
                >
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleSetActive('replyAll');
                  }}
                >
                  <ReplyAll className="h-4 w-4" />
                  Reply All
                </Button>
                <Button variant="outline" size="sm" onClick={handleComposeEmailForward}>
                  <Forward className="h-4 w-4" />
                  Forward
                </Button>
              </div>
            )}

            {selectedEmail &&
              (activeAction.reply || activeAction.replyAll || activeAction.forward) && (
                <>
                  <div className="px-4 flex flex-col gap-6">
                    <EmailActionsPanel
                      handleComposeEmailForward={handleComposeEmailForward}
                      selectedEmail={selectedEmail}
                      setActiveAction={setActiveAction}
                      activeAction={activeAction}
                      handleSetActive={handleSetActive}
                    />

                    <div>
                      <EmailTextEditor
                        value={content}
                        onChange={handleContentChange}
                        submitName="Send"
                        cancelButton="Discard"
                        showIcons={true}
                        onSubmit={() => handleSendEmail(selectedEmail.id)}
                      />
                    </div>
                  </div>
                </>
              )}
          </React.Fragment>
        )}
        {(isComposing.isCompose || isComposing.isForward) && (
          <EmailCompose
            addOrUpdateEmailInSent={addOrUpdateEmailInSent}
            onClose={handleCloseCompose}
            selectedEmail={selectedEmail}
            isComposing={isComposing}
          />
        )}
      </div>

      {/* Mobile Viw */}
      <div
        className={`flex md:hidden h-[calc(100vh-130px)] w-full flex-col overflow-y-auto ${!selectedEmail && 'bg-surface'}`}
      >
        {!selectedEmail && (
          <div className="flex h-full w-full flex-col gap-6 items-center justify-center p-8 text-center">
            <img src={empty_email} alt="emailSentIcon" />
            <h3 className="text-xl font-medium">Select a mail to read</h3>
          </div>
        )}
        {selectedEmail && (
          <React.Fragment>
            <div className="flex justify-between items-center px-4 mb-4">
              <ArrowLeft className="h-5 w-5 text-medium-emphasis" onClick={onGoBack} />
              <div className="flex justify-end items-center   gap-4 min-h-[32px]">
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
                          <Label
                            htmlFor="select-all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {statusLabels[key].label}
                          </Label>
                        </div>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Bookmark
                      className={`h-5 w-5 ${selectedEmail.isImportant && 'text-secondary-400'} cursor-pointer`}
                      onClick={() => {
                        if (selectedEmail) {
                          toggleEmailAttribute(selectedEmail.id, 'isImportant');
                        }
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>{selectedEmail.isImportant ? 'not important' : 'Important'}</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Star
                      className={`h-5 w-5 ${selectedEmail?.isStarred && 'text-warning'} cursor-pointer`}
                      onClick={() => {
                        if (selectedEmail) {
                          toggleEmailAttribute(selectedEmail.id, 'isStarred');
                        }
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>{selectedEmail.isStarred ? 'Not starred' : 'Starred'}</p>
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
            </div>

            {selectedEmail && (
              <div className="border-t">
                <div>
                  <div className="flex flex-col gap-2 justify-between py-3 border-b px-4">
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

                  <div className="my-6 px-4 flex flex-col items-start ">
                    <EmailViewResponseType selectedEmail={selectedEmail} />
                    <p className="text-sm text-end  w-full text-medium-emphasis">
                      {formatDateTime(selectedEmail?.date)}
                    </p>
                  </div>

                  <div className=" mb-6 text-sm px-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedEmail?.content || selectedEmail?.preview,
                      }}
                    />
                  </div>
                  {((selectedEmail?.images?.length ?? 0) > 0 ||
                    (selectedEmail?.attachments?.length ?? 0) > 0) && (
                    <div className="px-4">
                      <div className="p-2 flex flex-col gap-3  bg-surface rounded">
                        <div className="flex justify-between">
                          <div className="flex gap-2 items-center text-medium-emphasis text-sm">
                            <Paperclip className="w-4 h-4" />
                            <p>{`${(selectedEmail?.images?.length ?? 0) + (selectedEmail?.attachments?.length ?? 0)} attachments`}</p>
                            <ChevronUp className="h-4 w-4" />
                          </div>
                          <div>
                            <Button variant={'link'}>
                              <Download className="h-4 w-4" />
                              Download All
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(selectedEmail?.attachments?.length ?? 0) > 0 &&
                            (selectedEmail?.attachments ?? []).map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="bg-white p-2 rounded">
                                  <FileText className="w-10 h-10 text-secondary-400" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm  text-high-emphasis">{attachment}</p>
                                  <p className="text-[10px] text-medium-emphasis">{`600.00 KB`}</p>
                                </div>
                              </div>
                            ))}
                          {(selectedEmail?.images?.length ?? 0) > 0 &&
                            (selectedEmail?.images ?? []).map((image, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="bg-white p-2 rounded">
                                  <Image className="w-10 h-10 text-secondary-400" />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <p className="text-sm  text-high-emphasis">{image}</p>
                                  <p className="text-[10px] text-medium-emphasis">{`600.00 KB`}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-low-emphasis h-px mx-4 my-6" />
                </div>

                {selectedEmail &&
                  selectedEmail.reply &&
                  selectedEmail.reply.map((reply, index) => (
                    <div key={index} className="px-4">
                      <div className="flex justify-start items-center gap-4">
                        <EmailAvatar
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg"
                          alt="Profile avatar"
                          height={48}
                          width={48}
                        />
                        <div
                          dangerouslySetInnerHTML={{
                            __html: reply,
                          }}
                        />
                      </div>
                      <div className="bg-low-emphasis h-px my-6" />
                    </div>
                  ))}
              </div>
            )}
            {!(activeAction.reply || activeAction.replyAll || activeAction.forward) && (
              <div className="flex gap-4 text-sm  px-4 pb-8">
                <Button
                  variant="outline"
                  className=" w-full"
                  size="sm"
                  onClick={() => {
                    handleSetActive('reply');
                  }}
                >
                  <Reply className="h-4 w-4" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    handleSetActive('replyAll');
                  }}
                >
                  <ReplyAll className="h-4 w-4" />
                  Reply All
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                  size="sm"
                  onClick={handleComposeEmailForward}
                >
                  <Forward className="h-4 w-4" />
                  Forward
                </Button>
              </div>
            )}

            {selectedEmail &&
              (activeAction.reply || activeAction.replyAll || activeAction.forward) && (
                <>
                  <div className="px-4 flex flex-col gap-6">
                    <EmailActionsPanel
                      handleComposeEmailForward={handleComposeEmailForward}
                      selectedEmail={selectedEmail}
                      setActiveAction={setActiveAction}
                      activeAction={activeAction}
                      handleSetActive={handleSetActive}
                    />

                    <div>
                      <EmailTextEditor
                        value={content}
                        onChange={handleContentChange}
                        submitName="Send"
                        cancelButton="Discard"
                        showIcons={true}
                        onSubmit={() => handleSendEmail(selectedEmail.id)}
                      />
                    </div>
                  </div>
                </>
              )}
          </React.Fragment>
        )}
        {(isComposing.isCompose || isComposing.isForward) && (
          <EmailCompose
            addOrUpdateEmailInSent={addOrUpdateEmailInSent}
            onClose={handleCloseCompose}
            selectedEmail={selectedEmail}
            isComposing={isComposing}
          />
        )}
      </div>
    </>
  );
}
