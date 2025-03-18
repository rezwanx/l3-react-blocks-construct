import { EmailView } from 'features/email/component/email-view/email-view';
import { EmailList } from 'features/email/component/email-list/email-list';
import { EmailSidebar } from 'features/email/component/email-sidebar/email-sidebar';
import { useState } from 'react';

export function Email() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div className="flex  w-full bg-background">
      <EmailSidebar />
      <div className="flex flex-1 flex-col border-x border-Low-Emphasis">
        <EmailList onSelectEmail={setSelectedEmail} selectedEmail={selectedEmail} />
      </div>
      <div className="hidden md:flex w-full">
        <EmailView selectedEmail={selectedEmail} />
      </div>
    </div>
  );
}
