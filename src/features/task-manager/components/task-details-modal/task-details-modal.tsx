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
import { CalendarIcon, CircleDashed, Download, File, Plus, Trash2 } from 'lucide-react';
import { cn } from 'lib/utils';
import { format } from 'date-fns';
import { Badge } from 'components/ui/badge';
import { Label } from 'components/ui/label';
import { EditableHeading } from './editable-heading';
import { EditableComment } from './editable-comment';

export default function TaskDetailsModal() {
  const [date, setDate] = useState<Date | undefined>(new Date('2025-03-18'));
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [priority, setPriority] = useState('Medium');
  const [newComment, setNewComment] = useState('');
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

  return (
    <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 flex flex-col gap-6">
      {/* Header */}
      <div>
        <EditableHeading
          initialValue="Update Calendar UI"
          className="mb-2"
          onValueChange={(newValue) => console.log('New value:', newValue)}
        />
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

      {/* Due date & Assignee */}
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

      {/* Description */}
      <div>
        <label className="block text-sm mb-2">Description</label>
        <div className="text-sm">
          <p>
            Revamp the calendar interface to improve usability and readability. Key updates include:
          </p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Enhancing event visibility with better color contrast and typography.</li>
            <li>Improving the day, week, and month views for smoother navigation.</li>
            <li>Adding hover tooltips to display event details without clicking.</li>
            <li>Ensuring mobile responsiveness for seamless use across devices.</li>
            {showMore && <li>Optimizing drag-and-drop interactions for rescheduling events.</li>}
          </ul>
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
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          <div className="bg-gray-100 text-xs px-3 py-1 rounded-full">Calendar</div>
          <div className="bg-gray-100 text-xs px-3 py-1 rounded-full">UI/UX</div>
          <Button variant="outline" size="icon" className="h-6 w-6 rounded-full">
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm">Attachments</label>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs flex items-center gap-1 text-green-600"
          >
            <Plus className="h-3 w-3" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs font-medium">acceptance criteria.pdf</p>
                <p className="text-xs text-gray-500">600.00 KB</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Download className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded border">
            <div className="flex items-center gap-2">
              <img className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs font-medium">reference-calendar.png</p>
                <p className="text-xs text-gray-500">58.00 KB</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Download className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div>
        <label className="block text-sm mb-2">Comments</label>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Write a comment..."
              className="flex-1 text-sm"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
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

      {/* Footer */}
      <div className="flex justify-between mt-4">
        <Button variant="outline" size="sm" className="text-red-500 border-red-500">
          <Trash2 className="h-4 w-4 mr-1" />
        </Button>
        <div className="flex gap-2">
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Mark As Complete
          </Button>
          <Button variant="outline" size="sm">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
