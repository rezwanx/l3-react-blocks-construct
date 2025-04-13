import { useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import { PenLine } from 'lucide-react';
import { cn } from 'lib/utils';
import { Label } from 'components/ui/label';

interface EditableDescriptionProps {
  initialContent: string;
  onContentChange?: (content: string) => void;
}

export function EditableDescription({ initialContent, onContentChange }: EditableDescriptionProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [EditorComponent, setEditorComponent] = useState<any>(null);

  const [forceRender, setForceRender] = useState(0);

  useEffect(() => {
    setIsMounted(true);

    if (isEditing) {
      import('../../../../components/blocks/custom-text-editor/custom-text-editor')
        .then((module) => {
          setEditorComponent(() => module.default);
        })
        .catch((error) => {
          console.error('Error loading editor:', error);
        });
    }
  }, [isEditing]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    if (onContentChange) {
      onContentChange(content);
    }

    setEditorComponent(null);

    setIsEditing(false);

    setForceRender((prev) => prev + 1);
  };

  const handleCancel = () => {
    setContent(initialContent);

    setEditorComponent(null);

    setIsEditing(false);

    setForceRender((prev) => prev + 1);
  };

  const renderContent = () => {
    if (!content) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const paragraphs = Array.from(doc.querySelectorAll('p'));
    const listItems = Array.from(doc.querySelectorAll('li'));

    return (
      <>
        {paragraphs.map((p, index) => (
          <p key={index} className="text-sm">
            {p.textContent}
          </p>
        ))}
        {listItems.length > 0 && (
          <ul className="list-disc pl-5 mt-1 space-y-1">
            {listItems.map((item, index) => {
              // Only show a limited number of items unless showMore is true
              if (index >= 4 && !showMore) return null;
              return (
                <li key={index} className="text-sm">
                  {item.textContent}
                </li>
              );
            })}
          </ul>
        )}
        {listItems.length > 4 && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-1 h-6 p-0 text-xs flex items-center"
            onClick={() => setShowMore(!showMore)}
          >
            <span className={cn('transform transition-transform', showMore ? 'rotate-180' : '')}>
              ▼
            </span>
            <span className="ml-1">Show {showMore ? 'Less' : 'More'}</span>
          </Button>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!isEditing) {
      const styleTag = document.createElement('style');
      styleTag.id = 'hide-quill-toolbar';
      styleTag.innerHTML = `
        .ql-toolbar {
          display: none !important;
        }
      `;
      document.head.appendChild(styleTag);

      return () => {
        const existingStyle = document.getElementById('hide-quill-toolbar');
        if (existingStyle) {
          document.head.removeChild(existingStyle);
        }
      };
    }
  }, [isEditing, forceRender]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      key={`editor-container-${forceRender}`} // Force re-render when needed
    >
      <div className="flex items-center gap-1 mb-2">
        <Label className='text-high-emphasis text-base font-semibold'>Description</Label>
        {isHovering && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="ghost"
            aria-label="Edit description"
          >
            <PenLine className="h-4 w-4 text-primary" />
          </Button>
        )}
      </div>

      {isEditing ? (
        isMounted && EditorComponent ? (
          <EditorComponent
            key={`editor-instance-${forceRender}`} // Force new instance when needed
            value={content}
            onChange={handleContentChange}
            submitName="Save"
            cancelButton="Cancel"
            onSubmit={handleSave}
            onCancel={handleCancel}
            showIcons={false}
          />
        ) : (
          <div className="border rounded-md p-4">Loading editor...</div>
        )
      ) : (
        <div className="text-sm">{renderContent()}</div>
      )}
    </div>
  );
}
