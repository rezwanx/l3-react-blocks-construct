import { EmailView } from 'features/email/component/email-view';
import { EmailList } from 'features/email/component/email-list';
import { EmailSidebar } from 'features/email/component/email-sidebar';

export function Email() {
  // const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <EmailSidebar />
      <div className="flex flex-1 flex-col border-x border-Low-Emphasis">
        {/* <MailsList onSelectEmail={setSelectedEmail} selectedEmail={selectedEmail} /> */}
        <EmailList />
        {/* <div>div 2</div> */}
      </div>
      {/* <div className="hidden  md:flex md:w-1/2 lg:w-3/5">
          <EmailView />
        </div> */}
      <div className="hidden md:flex w-full">
        <EmailView />
      </div>
    </div>
  );
}
