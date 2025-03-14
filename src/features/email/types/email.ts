export interface Email {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  content?: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachment: boolean;
}
