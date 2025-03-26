export interface TEmail {
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
  email?: string;
}
