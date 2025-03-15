'use client';

import { Search, Paperclip, Star, AlertCircle, Menu } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { Input } from 'components/ui/input';
// import { Button } from 'components/ui/button';
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
    <Tabs defaultValue="all" className="flex min-w-[307px] flex-col ">
      {/* Header with Menu, Inbox, and Tabs */}
      <div className="flex items-center justify-between px-4 py-3 gap-4 border-b">
        <div className="flex items-center min-w-[124px]  gap-2">
          <div className="flex items-center gap-4">
            <div className="cursor-pointer">
              <Menu className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-high-emphasis">Inbox</h2>
          </div>
        </div>
        {/* TabsList inside Tabs but positioned in the header */}
        <TabsList className="grid  grid-cols-2 min-w-[124px] p-1 bg-surface">
          <TabsTrigger value="all" className="bg-white" onClick={() => setFilter('all')}>
            All
          </TabsTrigger>
          <TabsTrigger value="unread" className="bg-white" onClick={() => setFilter('unread')}>
            Unread
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Search Bar */}
      <div className="my-3">
        <div className="relative px-4">
          <Search className="absolute left-6 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground bg-surface" />
          <Input placeholder="Search" className="pl-9 bg-surface" />
        </div>
      </div>

      {/* All Emails List */}
      <TabsContent value="all" className="flex-1 overflow-auto p-0 data-[state=active]:flex-1">
        <div className="">
          {emailData.map((email: any) => (
            <div
              key={email.id}
              className={`cursor-pointer p-4 transition-colors hover:bg-neutral-25 flex flex-col gap-1 ${
                selectedEmail?.id === email.id ? 'bg-muted/50' : ''
              }`}
              onClick={() => onSelectEmail(email)}
            >
              <div className="flex items-center justify-between ">
                <h3 className="font-medium">{email.sender}</h3>
                <span className="text-xs text-muted-foreground">{email.date}</span>
              </div>
              <div className="flex items-center justify-between ">
                <p className="text-sm font-medium">{email.subject}</p>
                <div className="flex items-center ">
                  {email.hasAttachment && <Paperclip className="h-4 w-4 text-muted-foreground" />}
                  {email.isStarred && (
                    <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
                  )}
                  {email.isImportant && <AlertCircle className="h-4 w-4 text-sky-500" />}
                </div>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{email.preview}</p>
            </div>
          ))}
        </div>
      </TabsContent>

      {/* Unread Emails List */}
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

      {/* Footer */}
      <div className="border-t p-2 text-center text-sm text-muted-foreground">1-10 of 50</div>
    </Tabs>
  );
}
