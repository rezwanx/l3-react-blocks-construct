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
import { useState } from 'react';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import { TEmail } from '../../types/email.types';

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

export function EmailSidebar({ handleComposeEmail, setSelectedEmail }: EmailSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEditModalOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };


  const navItems = [
    { icon: <Mail className="h-4 w-4" />, label: 'Inbox', count: 50, href: '/mail/inbox' },
    { icon: <Star className="h-4 w-4" />, label: 'Starred', href: '/mail/starred' },
    { icon: <AlertCircle className="h-4 w-4" />, label: 'Important', href: '/mail/important' },
    { icon: <Send className="h-4 w-4" />, label: 'Sent', href: '/mail/sent' },
    { icon: <FileText className="h-4 w-4" />, label: 'Draft', count: 8, href: '/mail/drafts' },
    { icon: <AlertTriangle className="h-4 w-4" />, label: 'Spam', count: 14, href: '/mail/spam' },
    { icon: <Trash2 className="h-4 w-4" />, label: 'Trash', href: '/mail/trash' },
  ].map((item) => ({
    ...item,
    isActive: location.pathname === item.href,
    onClick: () => {
      setSelectedEmail(null);
      navigate(item.href);
    },
  }));

  const labelItems = [
    {
      icon: <Tag className="h-4 w-4 text-purple-500" />,
      label: 'Personal',
      href: '/mail/labels/personal',
    },
    {
      icon: <Tag className="h-4 w-4 text-secondary-400" />,
      label: 'Work',
      href: '/mail/labels/work',
    },
    {
      icon: <Tag className="h-4 w-4 text-emerald-500" />,
      label: 'Payments',
      href: '/mail/labels/payments',
    },
    {
      icon: <Tag className="h-4 w-4 text-rose-500" />,
      label: 'Invoices',
      href: '/mail/labels/invoices',
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
