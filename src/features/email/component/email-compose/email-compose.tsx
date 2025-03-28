import { useRef, useState } from 'react';
import { EmailComposeHeader } from './email-compose-header';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import { EmailInput } from '../email-ui/email-input';

interface EmailComposeProps {
  onClose: () => void;
}

export function EmailCompose({ onClose }: EmailComposeProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [content, setContent] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const toRef = useRef<HTMLInputElement | null>(null);
  const ccRef = useRef<HTMLInputElement | null>(null);
  const bccRef = useRef<HTMLInputElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsMaximized(false);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    setIsMaximized(!isMaximized);
  };

  const handleSendEmail = () => {
    const emailData = {
      to: toRef.current?.value.trim() || '',
      cc: ccRef.current?.value.trim() || '',
      bcc: bccRef.current?.value.trim() || '',
      subject: subjectRef.current?.value.trim() || '',
      content: content.trim(),
    };

    if (!emailData.to) {
      alert('Recipient (To) field is required.');
      return;
    }

    onClose();
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-0 right-4 w-80 shadow-lg border border-low-emphasis rounded-t overflow-hidden z-50">
        <EmailComposeHeader
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={onClose}
        />
      </div>
    );
  }

  return (
    <div
      className={`fixed  ${
        isMaximized
          ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[80vh] overflow-y-auto'
          : 'bottom-0 right-4 w-[560px] h-[65vh]'
      } border shadow-md rounded-t overflow-hidden z-50 flex flex-col bg-white`}
    >
      <EmailComposeHeader
        onMinimize={handleMinimize}
        onMaximize={handleMaximize}
        onClose={onClose}
      />
      <div className="flex flex-col p-4 gap-4 flex-1 overflow-auto">
        <div className="relative">
          <EmailInput ref={toRef} placeholder="To" />
          <p
            className="absolute right-12 top-1/2 -translate-y-1/2   cursor-pointer text-primary-400 hover:underline "
            onClick={() => setShowCc(!showCc)}
          >
            Cc
          </p>
          <p
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-400 hover:underline cursor-pointer"
            onClick={() => setShowBcc(!showBcc)}
          >
            Bcc
          </p>
        </div>

        {showCc && <EmailInput ref={ccRef} placeholder="Cc" />}
        {showBcc && <EmailInput ref={bccRef} placeholder="Bcc" />}
        <EmailInput ref={subjectRef} type="text" placeholder="Subject" />

        <div className="flex flex-col flex-1">
          <CustomTextEditor
            value={content}
            onChange={handleContentChange}
            onSubmit={handleSendEmail}
            onCancel={onClose}
            submitName="Send"
            cancelButton="Discard"
          />
        </div>
      </div>
    </div>
  );
}
