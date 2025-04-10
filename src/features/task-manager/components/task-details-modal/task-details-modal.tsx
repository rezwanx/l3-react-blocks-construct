import { useState } from 'react';
import { Calendar } from 'components/ui/calendar';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select';
import { CalendarIcon, CircleDashed, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from 'components/ui/badge';
import { Label } from 'components/ui/label';
import { EditableHeading } from './editable-heading';
import { EditableComment } from './editable-comment';
import { DialogContent } from 'components/ui/dialog';
import { EditableDescription } from './editable-description';
import CustomTextEditor from 'components/blocks/custom-text-editor/custom-text-editor';
import { AttachmentsSection } from './attachment-section';
import { Separator } from 'components/ui/separator';
import { Tags } from './tag-selector';
import CommentAvatar from './comment-avatar';

type TaskDetailsModalProps = {
  onClose: () => void;
};

export default function TaskDetailsModal({ onClose }: TaskDetailsModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-03-18'));
  const [showCalendar, setShowCalendar] = useState(false);
  const [priority, setPriority] = useState('Medium');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>(['calendar', 'ui-ux']);
  const [description, setDescription] = useState(`
    <p>Revamp the calendar interface to improve usability and readability. Key updates include:</p>
    <ul>
      <li>Enhancing event visibility with better color contrast and typography.</li>
      <li>Improving the day, week, and month views for smoother navigation.</li>
      <li>Adding hover tooltips to display event details without clicking.</li>
      <li>Ensuring mobile responsiveness for seamless use across devices.</li>
      <li>Optimizing drag-and-drop interactions for rescheduling events.</li>
    </ul>
  `);
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'Block Smith',
      timestamp: '20.03.2025, 12:00',
      text: 'Please check, review & verify.',
    },
    {
      id: '2',
      author: 'Jane Doe',
      timestamp: '20.03.2025, 13:15',
      text: 'Looks good to me. Ready for deployment.',
    },
  ]);

  interface Tag {
    id: string;
    label: string;
  }

  const tags: Tag[] = [
    { id: 'calendar', label: 'Calendar' },
    { id: 'ui-ux', label: 'UI/UX' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'design', label: 'Design' },
    { id: 'accessibility', label: 'Accessibility' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'responsive', label: 'Responsive' },
    { id: 'performance', label: 'Performance' },
    { id: 'usability', label: 'Usability' },
  ];

  const handleEditComment = (id: string, newText: string) => {
    setComments(
      comments.map((comment) => (comment.id === id ? { ...comment, text: newText } : comment))
    );
  };

  const handleDeleteComment = (id: string) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleStartWritingComment = () => {
    setIsWritingComment(true);
  };

  const handleCancelComment = () => {
    setIsWritingComment(false);
    setNewCommentContent('');
  };

  const handleSubmitComment = () => {
    if (newCommentContent.trim()) {
      const now = new Date();
      const timestamp = format(now, 'dd.MM.yyyy, HH:mm');

      const newComment = {
        id: Date.now().toString(),
        author: 'Adrian Müller',
        timestamp,
        text: newCommentContent,
      };

      setComments([...comments, newComment]);
      setNewCommentContent('');
      setIsWritingComment(false);
    }
  };

  return (
    <DialogContent
      className="rounded-md sm:max-w-[720px] xl:max-h-[800px] overflow-y-auto max-h-screen flex flex-col gap-6"
      onClick={handleDialogClick}
    >
      {/* Header */}
      <div>
        <EditableHeading initialValue="Update Calendar UI" className="mb-2 mt-4" />
        <div className="flex items-center gap-2">
          <div className="bg-surface rounded px-2 py-1 gap-2 flex items-center">
            <CircleDashed className="h-3 w-3 text-secondary" />
            <span className="text-xs text-secondary">Open</span>
          </div>
        </div>
      </div>

      {/* Section & Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Section</Label>
          <Select>
            <SelectTrigger className="w-full h-[28px] px-2 py-1">
              <SelectValue placeholder="To Do" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Priority</Label>
          <div className="flex gap-2">
            <Badge
              variant={priority === 'Low' ? 'default' : 'outline'}
              className={`rounded text-xs cursor-pointer ${
                priority === 'Low' ? 'bg-green-100 text-green-600' : ''
              }`}
              onClick={() => handlePriorityChange('Low')}
            >
              Low
            </Badge>
            <Badge
              variant={priority === 'Medium' ? 'default' : 'outline'}
              className={`rounded text-xs cursor-pointer ${
                priority === 'Medium' ? 'bg-amber-100 text-amber-600' : ''
              }`}
              onClick={() => handlePriorityChange('Medium')}
            >
              Medium
            </Badge>
            <Badge
              variant={priority === 'High' ? 'default' : 'outline'}
              className={`rounded text-xs cursor-pointer ${
                priority === 'High' ? 'bg-red-100 text-red-600' : ''
              }`}
              onClick={() => handlePriorityChange('High')}
            >
              High
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Label>Due date</Label>
          <div className="relative">
            <Input
              value={date ? format(date, 'dd.MM.yyyy') : ''}
              readOnly
              className="h-[28px] px-2 py-1"
              onClick={() => setShowCalendar(!showCalendar)}
            />
            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          {showCalendar && (
            <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-md">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  setShowCalendar(false);
                }}
                initialFocus
              />
            </div>
          )}
        </div>
        <div>
          <Label>Assignee</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <EditableDescription
          initialContent={description}
          onContentChange={(newContent) => {
            setDescription(newContent);
          }}
        />
      </div>

      <Tags availableTags={tags} selectedTags={selectedTags} onChange={setSelectedTags} />

      <AttachmentsSection />
      <Separator />

      <div>
        <Label className="block text-sm mb-2">Comments</Label>
        <div className="space-y-4">
          {isWritingComment ? (
            <CustomTextEditor
              value={newCommentContent}
              onChange={setNewCommentContent}
              submitName="Comment"
              cancelButton="Cancel"
              onSubmit={handleSubmitComment}
              onCancel={handleCancelComment}
            />
          ) : (
            <div className="flex gap-2">
              <CommentAvatar
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg"
                alt="Profile avatar"
                height={48}
                width={48}
              />
              <Input
                placeholder="Write a comment..."
                className="flex-1 text-sm"
                onClick={handleStartWritingComment}
                readOnly
              />
            </div>
          )}

          {comments.map((comment) => (
            <EditableComment
              key={comment.id}
              author={comment.author}
              timestamp={comment.timestamp}
              initialComment={comment.text}
              onEdit={(newText) => handleEditComment(comment.id, newText)}
              onDelete={() => handleDeleteComment(comment.id)}
            />
          ))}

          <div className="flex gap-2">
            <CommentAvatar
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg"
              alt="Profile avatar"
              height={48}
              width={48}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Adrian Müller</p>
                <p className="text-xs text-gray-500">20.03.2025, 12:00</p>
              </div>
              <p className="text-sm">
                <span className="text-blue-500">@Block Smith</span>, added the task details
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <Button variant="outline" size="sm" className="text-red-500 border-red-500">
          <Trash2 className="h-4 w-4 mr-1" />
        </Button>
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Mark As Complete
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
