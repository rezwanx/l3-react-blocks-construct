import { Paperclip, Star, Bookmark } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { TEmail } from '../../types/email.types';
import { emailData } from '../../services/email-data';
import { useState } from 'react';
import { cn } from 'lib/utils';
import { Checkbox } from 'components/ui/checkbox';
import Pagination from 'components/blocks/custom-pagination-email/custom-pagination-email';
import { parseISO, format } from 'date-fns';
import { useLocation } from 'react-router-dom';

/**
 * EmailList component displays a list of emails with pagination, filtering options (All and Unread),
 * and allows users to select an email. It renders email data with additional information such as sender,
 * subject, preview, and metadata like attachments or starred status.
 *
 * @component
 *
 * @param {Object} props - The props for the component.
 * @param {function} props.onSelectEmail - A callback function that is triggered when an email is selected.
 * @param {TEmail | null} props.selectedEmail - The currently selected email, if any.
 *
 * @returns {JSX.Element} - The EmailList component displaying a list of emails with filtering and pagination.
 *
 * @example
 * const onSelectEmail = (email) => { console.log(email); };
 * <EmailList onSelectEmail={onSelectEmail} selectedEmail={null} />
 */

interface EmailListProps {
  onSelectEmail: (email: TEmail | null) => void;
  selectedEmail: TEmail | null;
  emails: TEmail[];
}

export function EmailList({ onSelectEmail, selectedEmail }: EmailListProps) {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const location = useLocation();
  const { pathname } = location;
  const lastSegment = pathname.substring(pathname.lastIndexOf('/') + 1) as keyof typeof emailData;
  const mailData = emailData[lastSegment];

  const getPaginatedData = () => {
    const filteredEmails = Array.isArray(mailData)
      ? filter === 'unread'
        ? mailData.filter((email: any) => !email.isRead)
        : mailData
      : [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmails.slice(startIndex, endIndex);
  };

  const paginatedEmails = getPaginatedData();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  function formatReceivedDate(dateString: string) {
    const formattedDate = format(parseISO(dateString), 'dd.MM.yy');
    return formattedDate;
  }

  const handleEmailSelection = (email: TEmail) => {
    onSelectEmail(email);
  };

  return (
    <Tabs defaultValue="all" className="flex min-w-[307px] h-[calc(102vh-80px)] flex-col gap-3 ">
      <div className="flex items-center justify-between px-4 py-3 gap-4 border-b">
        <div className="flex items-center min-w-[124px] gap-4">
          <div className="cursor-pointer">Select All</div>
        </div>
        <TabsList className="grid grid-cols-2 min-w-[124px] p-1 bg-surface">
          <TabsTrigger value="all" className="bg-white" onClick={() => setFilter('all')}>
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="bg-white" onClick={() => setFilter('unread')}>
            Unread
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value={filter && 'all'}
        className="flex-1 overflow-auto p-0 data-[state=active]:flex-1"
      >
        {paginatedEmails.length > 0 && (
          <div className="flex flex-col ">
            {paginatedEmails.map((email: TEmail) => (
              <div
                key={email.id}
                className={cn(
                  'cursor-pointer  p-4 transition-colors hover:bg-surface flex flex-col gap-1',
                  selectedEmail?.id === email.id && 'bg-muted/50'
                )}
                onClick={() => handleEmailSelection(email)}
              >
                <div className="flex flex-row gap-2">
                  <div className="p-1">
                    <Checkbox checked={false} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-high-emphasis  ${email.isRead ? 'font-normal' : 'font-bold'}`}
                      >
                        {email?.sender ?? email.recipient}
                      </h3>
                      <span className="text-xs text-medium-emphasis">
                        {formatReceivedDate(email.date)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className={cn('text-sm', email.isRead ? 'font-normal' : 'font-bold')}>
                        {email.subject}
                      </p>
                      <div className="flex gap-2 items-center ">
                        {email.hasAttachment && (
                          <Paperclip className="h-4 w-4 text-medium-emphasis" />
                        )}
                        {email.isImportant && <Bookmark className="h-4 w-4 text-secondary-400" />}
                        {email.isStarred && <Star className="h-4 w-4 text-warning" />}
                      </div>
                    </div>
                    <p className="line-clamp-2 text-sm text-medium-emphasis">{email.preview}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {paginatedEmails.length === 0 && (
          <div className="flex items-center justify-center h-full text-medium-emphasis">
            No data found
          </div>
        )}
      </TabsContent>

      <TabsContent
        value={filter && 'unread'}
        className="flex-1 overflow-auto p-0 data-[state=active]:flex-1"
      >
        {paginatedEmails.length > 0 && (
          <div className="divide-y">
            {paginatedEmails.map((email: TEmail) => (
              <div
                key={email.id}
                className={cn(
                  'cursor-pointer p-4 transition-colors hover:bg-neutral-25 flex flex-col gap-1',
                  selectedEmail?.id === email.id ? 'bg-muted/50' : ''
                )}
                onClick={() => handleEmailSelection(email)}
              >
                <div className="flex items-center justify-between ">
                  <h3
                    className={`text-high-emphasis  ${email.isRead ? 'font-normal' : 'font-bold'}`}
                  >
                    {email?.sender ?? email?.recipient}
                  </h3>
                  <span className="text-xs text-medium-emphasis">{email.date}</span>
                </div>
                <div className="flex items-center justify-between ">
                  <p className={cn('text-sm', email.isRead ? 'font-normal' : 'font-bold')}>
                    {email.subject}
                  </p>
                  <div className="flex gap-2 items-center ">
                    {email.hasAttachment && <Paperclip className="h-4 w-4 text-medium-emphasis" />}
                    {email.isImportant && <Bookmark className="h-4 w-4 text-secondary-400" />}
                    {email.isStarred && <Star className="h-5 w-5 text-warning" />}
                  </div>
                </div>
                <p className="line-clamp-2 text-sm text-medium-emphasis">{email.preview}</p>
              </div>
            ))}
          </div>
        )}
        {paginatedEmails.length === 0 && (
          <div className="flex items-center justify-center h-full text-medium-emphasis">
            No data found
          </div>
        )}
      </TabsContent>

      {paginatedEmails.length > 0 && (
        <div className="flex justify-center border-t p-2 ">
          <Pagination
            totalItems={
              filter === 'unread' && Array.isArray(mailData)
                ? mailData.filter((email) => !email.isRead).length
                : Array.isArray(mailData)
                  ? mailData.length
                  : 0
            }
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </Tabs>
  );
}
