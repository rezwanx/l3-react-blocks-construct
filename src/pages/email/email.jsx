import { EmailView } from 'features/email/component/email-view';
import { EmailList } from 'features/email/component/email-list';
import { EmailSidebar } from 'features/email/component/email-sidebar';

export function Email() {
  // const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  return (
    <div>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <EmailSidebar />
        <div className="flex flex-1 flex-col border-l">
          {/* <MailsList onSelectEmail={setSelectedEmail} selectedEmail={selectedEmail} /> */}
          <EmailList />
          <div>div 2</div>
        </div>
        <div className="hidden border-l md:flex md:w-1/2 lg:w-3/5">
          <EmailView />
          {/* <EmailView selectedEmail={selectedEmail} /> */}
          {/* <div>div 3</div> */}
        </div>
      </div>

      {/* <div>
        <MailsSidebar />
      </div> */}
    </div>
  );
}
