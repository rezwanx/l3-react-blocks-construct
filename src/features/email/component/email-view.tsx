import { Email } from '../types/email';

interface EmailViewProps {
  selectedEmail: Email | null;
}

export function EmailView({ selectedEmail }: EmailViewProps) {
  if (!selectedEmail) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center">
        <div className="mb-4">
          {/* <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mails-aenhK9EuFDOM7PhcQk2w4DDIjD3NRF.png"
            alt="Empty state"
            width={120}
            height={120}
            className="mx-auto"
          /> */}
        </div>
        <h3 className="text-xl font-medium">Select a mail to read</h3>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-auto p-6">
      <h2 className="text-2xl font-bold">{selectedEmail.subject}</h2>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {selectedEmail.sender.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{selectedEmail.sender}</p>
            <p className="text-sm text-muted-foreground">to me</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{selectedEmail.date}</p>
      </div>
      <div className="mt-6 text-sm">
        <p>{selectedEmail.content || selectedEmail.preview}</p>
      </div>
    </div>
  );
}
