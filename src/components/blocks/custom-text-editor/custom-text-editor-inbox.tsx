import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Image, Paperclip, Smile } from 'lucide-react';
import 'quill/dist/quill.snow.css';

interface CustomTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  submitName: string;
  cancelButton: string;
  showIcons?: boolean;
  isEditModalOpen: boolean;
  setIsEditModalOpen?: (open: boolean) => void;
}

const CustomTextEditorInbox = ({
  value,
  onChange,
  submitName,
  cancelButton,
  showIcons = true,
  isEditModalOpen,
  setIsEditModalOpen,
}: CustomTextEditorProps) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  useEffect(() => {
    if (isEditModalOpen) {
      setIsMounted(true);
    }
  }, [isEditModalOpen]);

  useEffect(() => {
    if (isMounted && quillRef.current && !editorRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        placeholder: 'Compose email...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ font: [] }],
            [{ align: [] }],
            ['link'],
            ['clean'],
          ],
        },
      });

      editorRef.current.on('text-change', () => {
        if (onChange) {
          if (editorRef.current) {
            onChange(editorRef.current.root.innerHTML);
          }
        }
      });
    }

    if (value && editorRef.current && editorRef.current.root.innerHTML !== value) {
      editorRef.current.root.innerHTML = value;
    }
  }, [isMounted, value, onChange]);

  const handleSubmit = () => {
    console.log('Submit:', value);
    setIsEditModalOpen?.(false);
  };

  const toggleCc = () => {
    setShowCc(!showCc);
  };
  const toggleBcc = () => {
    setShowBcc(!showBcc);
  };

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogContent className="fixed bottom-4 right-4 sm:max-w-full md:max-w-3xl min-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New message</DialogTitle>
          <div className="flex flex-col gap-4 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="To"
                className="flex h-11 w-full rounded-md border-b border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />

              <p
                className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
                onClick={toggleCc}
              >
                Cc
              </p>
              <p
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
                onClick={toggleBcc}
              >
                BcC
              </p>
            </div>

            {showCc && (
              <input
                type="text"
                placeholder="Cc"
                className="flex h-11 w-full rounded-md border-b border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            )}
            {showBcc && (
              <input
                type="text"
                placeholder="Bcc"
                className="flex h-11 w-full rounded-md border-b border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            )}
            <input
              type="text"
              placeholder="Subject"
              className={`flex h-11 w-full rounded-md border-b border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
            />

            <div className="quill-container">
              <div ref={quillRef} className="" />
              <div
                className={`flex flex-row gap-4 mt-4 ${showIcons ? 'justify-between' : 'justify-end'}`}
              >
                {showIcons && (
                  <div className="flex gap-4">
                    <Image className="h-4 w-4 cursor-pointer" />
                    <Paperclip className="h-4 w-4 cursor-pointer" />
                    <Smile className="h-4 w-4 cursor-pointer" />
                  </div>
                )}
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setIsEditModalOpen?.(false)}>
                    {cancelButton}
                  </Button>
                  <Button onClick={handleSubmit}>{submitName}</Button>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomTextEditorInbox;
