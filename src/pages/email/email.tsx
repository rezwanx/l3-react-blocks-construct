import { EmailView } from 'features/email/component/email-view/email-view';
import { EmailList } from 'features/email/component/email-list/email-list';
import { EmailSidebar } from 'features/email/component/email-sidebar/email-sidebar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { emailData } from 'features/email/services/email-data';
import { TEmail } from 'features/email/types/email.types';
import { Search } from 'lucide-react';
import { Input } from 'components/ui/input';
import { SidebarTrigger } from 'components/ui/sidebar';

export function Email() {
  const { category, emailId } = useParams<{
    category: string;
    emailId?: string;
  }>();
  const [selectedEmail, setSelectedEmail] = useState<TEmail | null>(null);
  const [filteredEmails, setFilteredEmails] = useState<Array<TEmail>>([]);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    if (category && Object.prototype.hasOwnProperty.call(emailData, category)) {
      const emails = emailData[category as keyof typeof emailData];
      setFilteredEmails(Array.isArray(emails) ? emails : []);
    } else {
      setFilteredEmails([]);
    }
  }, [category]);

  useEffect(() => {
    if (emailId && filteredEmails.length > 0) {
      const foundEmail = filteredEmails.find((email) => email.id === emailId) || null;
      setSelectedEmail(foundEmail);
    } else {
      setSelectedEmail(null);
    }
  }, [emailId, filteredEmails]);

  const handleComposeEmail = () => setIsComposing(true);
  const handleCloseCompose = () => setIsComposing(false);

  return (
    <div className="flex w-full bg-background">
      <EmailSidebar
        setSelectedEmail={setSelectedEmail}
        isComposing={isComposing}
        handleComposeEmail={handleComposeEmail}
        handleCloseCompose={handleCloseCompose}
      />
      <div className="border-x w-full border-Low-Emphasis">
        <div className="flex justify-between px-4 py-3 border-b border-Low-Emphasis">
          <SidebarTrigger />
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-medium-emphasis bg-surface" />
            <Input placeholder="Search" className="pl-9 bg-surface w-80" />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <EmailList
              emails={filteredEmails}
              onSelectEmail={setSelectedEmail}
              selectedEmail={selectedEmail}
            />
          </div>
          <div className="hidden md:flex w-full border-x border-Low-Emphasis">
            <EmailView
              isComposing={isComposing}
              handleCloseCompose={handleCloseCompose}
              selectedEmail={selectedEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
