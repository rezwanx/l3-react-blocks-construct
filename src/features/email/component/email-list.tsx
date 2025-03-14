'use client';

import { Search, Paperclip, Star, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Email } from '../types/email';
import { emailData } from '../services/emailData';
import { useState } from 'react';

interface EmailListProps {
  onSelectEmail: (email: Email | null) => void;
  selectedEmail: Email | null;
}

export function EmailList({ onSelectEmail, selectedEmail }: EmailListProps) {
  const [filter, setFilter] = useState('all');
  console.log(filter);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <Button variant="ghost" size="icon">
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
        <h2 className="text-lg font-semibold">Inbox</h2>
      </div>
      <Tabs defaultValue="all" className="flex-1">
        <div className="border-b px-4">
          <TabsList className="grid w-[200px] grid-cols-2">
            <TabsTrigger value="all" onClick={() => setFilter('all')}>
              All
            </TabsTrigger>
            <TabsTrigger value="unread" onClick={() => setFilter('unread')}>
              Unread
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="pl-9" />
          </div>
        </div>
        <TabsContent value="all" className="flex-1 overflow-auto p-0 data-[state=active]:flex-1">
          <div className="divide-y">
            {emailData.map((email: any) => (
              <div
                key={email.id}
                className={`cursor-pointer p-4 transition-colors hover:bg-muted/50 ${
                  selectedEmail?.id === email.id ? 'bg-muted/50' : ''
                }`}
                onClick={() => onSelectEmail(email)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{email.sender}</h3>
                  <span className="text-xs text-muted-foreground">{email.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{email.subject}</p>
                  <div className="flex items-center gap-1">
                    {email.hasAttachment && <Paperclip className="h-4 w-4 text-muted-foreground" />}
                    {email.isStarred && (
                      <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                    )}
                    {email.isImportant && <AlertCircle className="h-4 w-4 text-sky-500" />}
                  </div>
                </div>
                <p className="line-clamp-1 text-sm text-muted-foreground">{email.preview}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="unread" className="flex-1 overflow-auto p-0 data-[state=active]:flex-1">
          <div className="divide-y">
            {emailData
              .filter((email: any) => !email.isRead)
              .map((email: any) => (
                <div
                  key={email.id}
                  className={`cursor-pointer p-4 transition-colors hover:bg-muted/50 ${
                    selectedEmail?.id === email.id ? 'bg-muted/50' : ''
                  }`}
                  onClick={() => onSelectEmail(email)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{email.sender}</h3>
                    <span className="text-xs text-muted-foreground">{email.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{email.subject}</p>
                    <div className="flex items-center gap-1">
                      {email.hasAttachment && (
                        <Paperclip className="h-4 w-4 text-muted-foreground" />
                      )}
                      {email.isStarred && (
                        <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                      )}
                      {email.isImportant && <AlertCircle className="h-4 w-4 text-sky-500" />}
                    </div>
                  </div>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{email.preview}</p>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
      <div className="border-t p-2 text-center text-sm text-muted-foreground">1-10 of 50</div>
    </div>
  );
}
