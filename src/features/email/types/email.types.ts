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
  email?: string;
  recipient?: string;
  reply?: string[];
  tags?: TTags;
  images: string[];
  attachments: string[];

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

export interface TFormProps {
  images: string[];
  attachments: string[];
}

export interface TActiveAction {
  reply: boolean;
  replyAll: boolean;
  forward: boolean;
}

export type TDestination = 'spam' | 'trash' | 'draft' | 'important' | 'starred';

export interface TIsComposing {
  isCompose: boolean;
  isForward: boolean;
}
