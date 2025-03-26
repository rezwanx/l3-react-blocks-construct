import Quill from 'quill';
import { useEffect, useRef } from 'react';
import { Button } from 'components/ui/button';
import { Paperclip, Smile, Image } from 'lucide-react';
import 'quill/dist/quill.snow.css';

interface CustomTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  submitName: string;
  cancelButton: string;
  showIcons?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const CustomTextEditor = ({
  value,
  onChange,
  submitName,
  onSubmit,
  onCancel,
  cancelButton,
  showIcons = true,
}: CustomTextEditorProps) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !editorRef.current) {
      editorRef.current = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
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
  }, [value, onChange]);

  return (
    <>
      <div ref={quillRef} />
      <div className={`flex flex-row gap-4 mt-4 ${showIcons ? 'justify-between' : 'justify-end'}`}>
        {showIcons && (
          <div className="flex gap-4">
            <Image className="h-4 w-4" />
            <Paperclip className="h-4 w-4" />
            <Smile className="h-4 w-4" />
          </div>
        )}
        <div className="flex gap-4">
          <Button onClick={onCancel} variant={'outline'}>
            {cancelButton}
          </Button>
          <Button onClick={onSubmit}>{submitName}</Button>
        </div>
      </div>
    </>
  );
};

export default CustomTextEditor;
