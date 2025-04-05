import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import {
  AlertCircle,
  AlertTriangle,
  FileText,
  Mail,
  Send,
  SquarePen,
  Star,
  Tag,
  Trash2,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import { TEmail, TEmailData } from '../../types/email.types';

interface NavItemProps {
  icon: JSX.Element;
  label: string;
  count?: number;
  isActive?: boolean;
  href: string;
  onClick: () => void;
}

interface EmailSidebarProps {
  isComposing: boolean;
  handleComposeEmail: () => void;
  handleCloseCompose: () => void;
  setSelectedEmail: (email: TEmail | null) => void;
  emails: Partial<TEmailData>;
}

function NavItem({ icon, label, count, isActive, onClick }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'flex w-full justify-start gap-2 h-10 text-high-emphasis',
        isActive && 'bg-surface text-primary-600'
      )}
    >
      {icon}
      <span className="flex-1 text-left text-base">{label}</span>
      {count !== undefined && (
        <span className={`text-sm ${isActive && 'text-primary-600'}`}>{count}</span>
      )}
    </Button>
  );
}

export function EmailSidebar({ handleComposeEmail, setSelectedEmail, emails }: EmailSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditModalOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const navItems = useMemo(
    () =>
      [
        {
          icon: <Mail className="h-4 w-4" />,
          label: 'Inbox',
          href: '/mail/inbox',
          count: emails['inbox']?.length ?? 0,
        },
        {
          icon: <Star className="h-4 w-4" />,
          label: 'Starred',
          href: '/mail/starred',
          count: emails['starred']?.length ?? 0,
        },
        {
          icon: <AlertCircle className="h-4 w-4" />,
          label: 'Important',
          href: '/mail/important',
          count: emails['important']?.length ?? 0,
        },
        {
          icon: <Send className="h-4 w-4" />,
          label: 'Sent',
          href: '/mail/sent',
          count: emails['sent']?.length ?? 0,
        },
        {
          icon: <FileText className="h-4 w-4" />,
          label: 'Draft',
          href: '/mail/drafts',
          count: emails['drafts']?.length ?? 0,
        },
        {
          icon: <AlertTriangle className="h-4 w-4" />,
          label: 'Spam',
          href: '/mail/spam',
          count: emails['spam']?.length ?? 0,
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: 'Trash',
          href: '/mail/trash',
          count: emails['trash']?.length ?? 0,
        },
      ].map((item) => ({
        ...item,
        isActive: location.pathname === item.href,
        onClick: () => {
          setSelectedEmail(null);
          navigate(item.href);
        },
      })),
    [emails, location, navigate, setSelectedEmail]
  );

  const labelItems = [
    {
      icon: <Tag className="h-4 w-4 text-purple-500" />,
      label: 'Personal',
      href: '/mail/labels/personal',
      count: emails['personal']?.length ?? 0,
    },
    {
      icon: <Tag className="h-4 w-4 text-secondary-400" />,
      label: 'Work',
      href: '/mail/labels/work',
      count: emails['work']?.length ?? 0,
    },
    {
      icon: <Tag className="h-4 w-4 text-emerald-500" />,
      label: 'Payments',
      href: '/mail/labels/payments',
      count: emails['payments']?.length ?? 0,
    },
    {
      icon: <Tag className="h-4 w-4 text-rose-500" />,
      label: 'Invoices',
      href: '/mail/labels/invoices',
      count: emails['invoices']?.length ?? 0,
    },
  ].map((item) => ({
    ...item,
    isActive: location.pathname === item.href,
    onClick: () => navigate(item.href),
  }));

  return (
    <>
      <div className="flex min-w-[280px] flex-col">
        <div className="p-4">
          <h2 className="text-2xl font-bold tracking-tight">Mail</h2>
        </div>
        <div className="py-4 px-2">
          <Button className="flex items-center w-full" onClick={handleComposeEmail}>
            <SquarePen size={20} />
            Compose
          </Button>
        </div>
        <div className="flex-1 px-2">
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}

          <h2 className="px-4 py-2 text-[10px] font-semibold uppercase text-muted-foreground">
            Labels
          </h2>
          {labelItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
      </div>

      {isEditModalOpen && (
        <CustomTextEditor
          value={content}
          onChange={handleContentChange}
          submitName="Send"
          cancelButton="Discard"
          showIcons={true}
        />
      )}
    </>
  );
}
