import { EmailView } from 'features/email/component/email-view/email-view';
import { EmailList } from 'features/email/component/email-list/email-list';
import { EmailSidebar } from 'features/email/component/email-sidebar/email-sidebar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { emailData } from 'features/email/services/email-data';
import { TEmail } from 'features/email/types/email.types';
import { MailOpen, Search, Trash2, TriangleAlert } from 'lucide-react';
import { Input } from 'components/ui/input';
import { SidebarTrigger } from 'components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

export function Email() {
  const { category, emailId } = useParams<{
    category: string;
    emailId?: string;
  }>();
  const [emails, setEmails] = useState<Record<string, TEmail[]>>(
    Object.fromEntries(
      Object.entries(emailData).filter(([, value]) => Array.isArray(value))
    ) as Record<string, TEmail[]>
  );
  const [selectedEmail, setSelectedEmail] = useState<TEmail | null>(null);
  const [filteredEmails, setFilteredEmails] = useState<Array<TEmail>>([]);
  const [isComposing, setIsComposing] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  const [checkedEmailIds, setCheckedEmailIds] = useState<string[]>([]);

  useEffect(() => {
    if (category) {
      if (category === 'labels' && emailId) {
        const emailData = emails[emailId as keyof typeof emails];
        setFilteredEmails(Array.isArray(emailData) ? emailData : []);
      } else if (Object.prototype.hasOwnProperty.call(emails, category)) {
        const emailData = emails[category as keyof typeof emails];
        setFilteredEmails(Array.isArray(emailData) ? emailData : []);
      } else {
        setFilteredEmails([]);
      }
    }
  }, [category, emailId, emails]);

  useEffect(() => {
    if (emailId && filteredEmails.length > 0) {
      const foundEmail = filteredEmails.find((email) => email.id === emailId) || null;
      setSelectedEmail(foundEmail);
    }
  }, [emailId, filteredEmails]);

  const handleComposeEmail = () => setIsComposing(true);
  const handleCloseCompose = () => setIsComposing(false);

  const updateEmail = (emailId: string, updates: Partial<TEmail>) => {
    setEmails((prevEmails) => {
      const updatedEmails = { ...prevEmails };

      if (category === 'labels') {
        for (const cat in updatedEmails) {
          updatedEmails[cat] = updatedEmails[cat]?.map((email) =>
            email.id === emailId ? { ...email, ...updates } : email
          );
        }
      } else if (category && updatedEmails[category]) {
        updatedEmails[category] = updatedEmails[category]?.map((email) =>
          email.id === emailId ? { ...email, ...updates } : email
        );
      }

      return updatedEmails;
    });

    if (selectedEmail?.id === emailId) {
      setSelectedEmail((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const moveEmailToCategory = (emailIds: string | string[], destination: 'spam' | 'trash') => {
    const idsToMove = Array.isArray(emailIds) ? emailIds : [emailIds];

    setEmails((prevEmails) => {
      const updatedEmails: { [key: string]: TEmail[] } = {};
      const movedEmailMap: { [id: string]: TEmail } = {};

      for (const category in prevEmails) {
        const emailsInCategory = prevEmails[category] || [];
        const remainingEmails = emailsInCategory.filter((email) => {
          if (idsToMove.includes(email.id)) {
            if (!movedEmailMap[email.id]) {
              movedEmailMap[email.id] = { ...email, [destination]: true };
            }
            return false;
          }
          return true;
        });
        updatedEmails[category] = remainingEmails;
      }

      updatedEmails[destination] = [
        ...(updatedEmails[destination] || []),
        ...Object.values(movedEmailMap),
      ];

      setCheckedEmailIds([]);
      return updatedEmails;
    });

    if (selectedEmail && idsToMove.includes(selectedEmail.id)) {
      setSelectedEmail(null);
    }
  };

  const addOrUpdateEmailInSent = (newEmail: TEmail) => {
    setEmails((prevEmails) => {
      const updatedEmails = { ...prevEmails };
      const sentEmails = updatedEmails.sent || [];

      const existingIndex = sentEmails.findIndex((email) => email.id === newEmail.id);

      if (existingIndex !== -1) {
        sentEmails[existingIndex] = { ...sentEmails[existingIndex], ...newEmail };
      } else {
        sentEmails.unshift(newEmail);
      }

      updatedEmails.sent = sentEmails;
      return updatedEmails;
    });
  };

  const updateEmailsByTags = () => {
    setEmails((prevEmails) => {
      const inbox = prevEmails.inbox || [];
      return {
        ...prevEmails,
        personal: inbox.filter((email: TEmail) => email?.tags?.personal),
        work: inbox.filter((email: TEmail) => email?.tags?.work),
        payments: inbox.filter((email: TEmail) => email?.tags?.payments),
        invoices: inbox.filter((email: TEmail) => email?.tags?.invoices),
      };
    });
  };

  useEffect(() => {
    updateEmailsByTags();
  }, [emails.inbox]);

  return (
    <div className="flex w-full bg-background">
      <EmailSidebar
        emails={emails}
        setSelectedEmail={setSelectedEmail}
        isComposing={isComposing}
        handleComposeEmail={handleComposeEmail}
        handleCloseCompose={handleCloseCompose}
      />
      <div className="border-x w-full border-Low-Emphasis">
        <div className="flex justify-between px-4 py-3 border-b border-Low-Emphasis">
          <SidebarTrigger />
          <div className="flex items-center gap-4 ">
            {(isAllSelected || checkedEmailIds.length > 0) && (
              <div className="flex gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MailOpen className="h-4 w-4 cursor-pointer text-medium-emphasis" />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>Open Mail</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TriangleAlert
                      className="h-4 w-4 cursor-pointer text-medium-emphasis"
                      onClick={() => {
                        moveEmailToCategory(checkedEmailIds, 'spam');
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>Spam All</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Trash2
                      className="h-4 w-4 cursor-pointer text-medium-emphasis"
                      onClick={() => {
                        moveEmailToCategory(checkedEmailIds, 'trash');
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    className="bg-surface text-medium-emphasis"
                    side="top"
                    align="center"
                  >
                    <p>Trash All</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-medium-emphasis bg-surface" />
              <Input placeholder="Search" className="pl-9 bg-surface w-80" />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <EmailList
              emails={
                category === 'labels' ? filteredEmails : category ? emails[category] || [] : []
              }
              setEmails={setEmails}
              onSelectEmail={setSelectedEmail}
              selectedEmail={selectedEmail}
              category={category || ''}
              setIsAllSelected={setIsAllSelected}
              setCheckedEmailIds={setCheckedEmailIds}
              checkedEmailIds={checkedEmailIds}
            />
          </div>
          <div className="hidden md:flex w-full border-x border-Low-Emphasis">
            <EmailView
              isComposing={isComposing}
              handleCloseCompose={handleCloseCompose}
              selectedEmail={selectedEmail}
              setSelectedEmail={setSelectedEmail}
              updateEmail={updateEmail}
              moveEmailToCategory={moveEmailToCategory}
              isAllSelected={isAllSelected}
              addOrUpdateEmailInSent={addOrUpdateEmailInSent}
              checkedEmailIds={checkedEmailIds}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
