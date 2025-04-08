import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import { SquarePen } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { TEmail, TEmailData } from '../../types/email.types';
import EmailTextEditor from '../email-ui/email-text-editor';
import { getNavItems } from '../../constants/nav-items';
import { getLabelItems } from '../../constants/label-items';

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
    () => getNavItems(emails, location, navigate, setSelectedEmail),
    [emails, location, navigate, setSelectedEmail]
  );

  const labelItems = useMemo(() => getLabelItems(location, navigate), [location, navigate]);

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

          <h2 className="px-4 py-2 text-[10px] font-semibold uppercase text-medium-emphasis">
            Labels
          </h2>
          {labelItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>
      </div>

      {isEditModalOpen && (
        <EmailTextEditor
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
