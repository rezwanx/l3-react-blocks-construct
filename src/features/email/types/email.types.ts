export interface TEmail {
  id: string;
  sender?: string;
  subject: string;
  preview: string;
  content?: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  isImportant: boolean;
  hasAttachment: boolean;
  email?: string;
  recipient?: string;
  tags?: TTags;
  bookmarked: boolean;
  trash: boolean;
  spam: boolean;
  cc?: string;
  bcc?: string;
}

interface TTags {
  personal?: boolean;
  work?: boolean;
  payments?: boolean;
  invoices?: boolean;
}

export interface TEmailData {
  inbox: TEmail[];
  sent: TEmail[];
  drafts: TEmail[];
  starred: TEmail[];
  important: TEmail[];
  trash: TEmail[];
  spam: TEmail[];
  personal?: TEmail[];
  work?: TEmail[];
  payments?: TEmail[];
  invoices?: TEmail[];
  tags?: TTags;
}
