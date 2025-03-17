import { Search, Paperclip, Star, Bookmark } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Input } from 'components/ui/input';
import { TEmail } from '../../types/email';
import { emailData } from '../../services/emailData';
import { useState } from 'react';
import { SidebarTrigger } from 'components/ui/sidebar';
import Pagination from 'components/blocks/custom/pagination';
import { cn } from 'lib/utils';
import { Checkbox } from 'components/ui/checkbox';

interface EmailListProps {
  onSelectEmail: (email: TEmail | null) => void;
  selectedEmail: TEmail | null;
}

export function EmailList({ onSelectEmail, selectedEmail }: EmailListProps) {
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getPaginatedData = () => {
    const filteredEmails =
      filter === 'unread' ? emailData.filter((email) => !email.isRead) : emailData;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmails.slice(startIndex, endIndex);
  };

  const paginatedEmails = getPaginatedData();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Tabs defaultValue="all" className="flex min-w-[307px] h-[calc(102vh-80px)] flex-col gap-3 ">
      <div className="flex items-center justify-between px-4 py-3 gap-4 border-b">
        <div className="flex items-center min-w-[124px] gap-2">
          <div className="flex items-center gap-4">
            <div className="cursor-pointer">
              <SidebarTrigger />
            </div>
            <h2 className="text-xl font-semibold text-high-emphasis">Inbox</h2>
          </div>
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

      <div className="relative px-4">
        <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground bg-surface" />
        <Input placeholder="Search" className="pl-9 bg-surface" />
      </div>

      <TabsContent
        value={filter && 'all'}
        className="flex-1 overflow-auto p-0 data-[state=active]:flex-1"
      >
        <div className="flex flex-col ">
          {paginatedEmails.map((email: TEmail) => (
            <div
              key={email.id}
              className={cn(
                'cursor-pointer  p-4 transition-colors hover:bg-surface flex flex-col gap-1',
                selectedEmail?.id === email.id ? 'bg-muted/50' : ''
              )}
              onClick={() => onSelectEmail(email)}
            >
              <div className="flex flex-row gap-2">
                <div className="p-1">
                  <Checkbox checked={false} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={cn(
                        'text-high-emphasis',
                        email.isRead ? 'font-normal' : 'font-bold'
                      )}
                    >
                      {email.sender}
                    </h3>
                    <span className="text-xs text-muted-foreground">{email.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={cn('text-sm', email.isRead ? 'font-normal' : 'font-bold')}>
                      {email.subject}
                    </p>
                    <div className="flex gap-2 items-center ">
                      {email.hasAttachment && (
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                      )}
                      {email.isImportant && <Bookmark className="h-4 w-4 text-secondary-400" />}
                      {email.isStarred && <Star className="h-4 w-4 text-warning" />}
                    </div>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{email.preview}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent
        value={filter && 'unread'}
        className="flex-1 overflow-auto p-0 data-[state=active]:flex-1"
      >
        <div className="divide-y">
          {paginatedEmails.map((email: TEmail) => (
            <div
              key={email.id}
              className={cn(
                'cursor-pointer p-4 transition-colors hover:bg-neutral-25 flex flex-col gap-1',
                selectedEmail?.id === email.id ? 'bg-muted/50' : ''
              )}
              onClick={() => onSelectEmail(email)}
            >
              <div className="flex items-center justify-between ">
                <h3
                  className={cn('text-high-emphasis', email.isRead ? 'font-normal' : 'font-bold')}
                >
                  {email.sender}
                </h3>
                <span className="text-xs text-muted-foreground">{email.date}</span>
              </div>
              <div className="flex items-center justify-between ">
                <p className={cn('text-sm', email.isRead ? 'font-normal' : 'font-bold')}>
                  {email.subject}
                </p>
                <div className="flex gap-2 items-center ">
                  {email.hasAttachment && <Paperclip className="h-4 w-4 text-muted-foreground" />}
                  {email.isImportant && <Bookmark className="h-4 w-4 text-secondary-400" />}
                  {email.isStarred && <Star className="h-5 w-5 text-warning" />}
                </div>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{email.preview}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      <div className="flex justify-center border-t p-2 ">
        <Pagination
          totalItems={
            filter === 'unread'
              ? emailData.filter((email) => !email.isRead).length
              : emailData.length
          }
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Tabs>
  );
}
