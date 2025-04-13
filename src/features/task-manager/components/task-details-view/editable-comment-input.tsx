import { useState, useEffect } from 'react';

interface EditableCommentInputProps {
  initialContent: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  submitName?: string;
  cancelButton?: string;
}

export function EditableCommentInput({
  initialContent,
  onSubmit,
  onCancel,
  submitName = 'Save',
  cancelButton = 'Cancel',
}: EditableCommentInputProps) {
  const [content, setContent] = useState(initialContent);
  const [isMounted, setIsMounted] = useState(false);
  const [EditorComponent, setEditorComponent] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);

    import('../../../../components/blocks/custom-text-editor/custom-text-editor')
      .then((module) => {
        setEditorComponent(() => module.default);
      })
      .catch((error) => {
        console.error('Error loading editor:', error);
      });
  }, []);

  const handleSave = () => {
    if (content.trim()) {
      onSubmit(content);
    }
  };

  const handleCancel = () => {
    setContent(initialContent);
    if (onCancel) onCancel();
  };

  return (
    <div>
      {isMounted && EditorComponent ? (
        <EditorComponent
          value={content}
          onChange={setContent}
          submitName={submitName}
          cancelButton={cancelButton}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="border rounded-md p-4">Loading editor...</div>
      )}
    </div>
  );
}