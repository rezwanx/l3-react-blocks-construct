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
import { useState } from 'react';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';

interface NavItemProps {
  icon: JSX.Element;
  label: string;
  count?: number;
  isActive?: boolean;
}

interface EmailSidebarProps {
  isComposing: boolean;
  handleComposeEmail: () => void;
  handleCloseCompose: () => void;
}

function NavItem({ icon, label, count, isActive }: NavItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'flex w-full justify-start gap-2 h-10 text-high-emphasis ',
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

export function EmailSidebar({ handleComposeEmail }: EmailSidebarProps) {
  const [isEditModalOpen] = useState(false);
  const [content, setContent] = useState('');

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const navItems = [
    { icon: <Mail className="h-4 w-4" />, label: 'Inbox', count: 50, isActive: true },
    { icon: <Star className="h-4 w-4" />, label: 'Starred' },
    { icon: <AlertCircle className="h-4 w-4" />, label: 'Important' },
    { icon: <Send className="h-4 w-4" />, label: 'Sent' },
    { icon: <FileText className="h-4 w-4" />, label: 'Draft', count: 8 },
    { icon: <AlertTriangle className="h-4 w-4" />, label: 'Spam', count: 14 },
    { icon: <Trash2 className="h-4 w-4" />, label: 'Trash' },
  ];

  const labelItems = [
    { icon: <Tag className="h-4 w-4 text-purple-500" />, label: 'Personal' },
    { icon: <Tag className="h-4 w-4 text-secondary-400" />, label: 'Work' },
    { icon: <Tag className="h-4 w-4 text-emerald-500" />, label: 'Payments' },
    { icon: <Tag className="h-4 w-4 text-rose-500" />, label: 'Invoices' },
  ];

  return (
    <>
      <div className="flex min-w-[280px] flex-col ">
        <div className=" p-4">
          <h2 className="text-2xl font-bold tracking-tight">Mail</h2>
        </div>
        <div className="py-4 px-2">
          <Button
            variant="default"
            className="flex items-center w-full"
            onClick={handleComposeEmail}
          >
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
        <div>
          <CustomTextEditor
            value={content}
            onChange={handleContentChange}
            submitName="Send"
            cancelButton="Discard"
            showIcons={true}
          />
        </div>
      )}
    </>
  );
}
