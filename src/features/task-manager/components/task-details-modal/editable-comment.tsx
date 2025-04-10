import { useState, useRef, useEffect } from 'react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import CommentAvatar from './comment-avatar';

interface EditableCommentProps {
  author: string;
  timestamp: string;
  initialComment: string;
  onEdit?: (newComment: string) => void;
  onDelete?: () => void;
}

export function EditableComment({
  author,
  timestamp,
  initialComment,
  onEdit,
  onDelete,
}: EditableCommentProps) {
  const [comment, setComment] = useState(initialComment);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveChanges();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const saveChanges = () => {
    setIsEditing(false);
    if (onEdit) {
      onEdit(comment);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setComment(initialComment);
  };

  const handleBlur = () => {
    saveChanges();
  };

  return (
    <div className="flex gap-2">
      <CommentAvatar
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg"
        alt="Profile avatar"
        height={48}
        width={48}
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">{author}</p>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>

        {isEditing ? (
          <Input
            ref={inputRef}
            value={comment}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-full mt-1 p-2 text-sm border rounded-md "
            data-testid="editable-comment-input"
          />
        ) : (
          <p className="text-sm">{comment}</p>
        )}

        <div className="flex gap-2 mt-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 p-0 text-xs text-blue-500"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 p-0 text-xs text-red-500"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
