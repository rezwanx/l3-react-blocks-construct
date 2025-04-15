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
import { CalendarIcon, CircleDashed, CheckCircle, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from 'components/ui/badge';
import { Label } from 'components/ui/label';
import { EditableHeading } from './editable-heading';
import { DialogContent } from 'components/ui/dialog';
import { EditableDescription } from './editable-description';
import { AttachmentsSection } from './attachment-section';
import { Separator } from 'components/ui/separator';
import { Tags } from './tag-selector';
import { AssigneeSelector } from './assignee-selector';

type NewTaskModalProps = {
  onClose: () => void;
};

interface Assignee {
  id: string;
  name: string;
  avatar: string;
}

interface Tag {
  id: string;
  label: string;
}

export default function NewTaskModal({ onClose }: NewTaskModalProps) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [mark, setMark] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [priority, setPriority] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [selectedAssignees, setSelectedAssignees] = useState<Assignee[]>([]);

  const availableAssignees: Assignee[] = [
    {
      id: '1',
      name: 'Aaron Green',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg',
    },
    {
      id: '2',
      name: 'Adrian Müller',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg',
    },
    {
      id: '3',
      name: 'Blocks Smith',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg',
    },
    {
      id: '4',
      name: 'Sarah Pavan',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/avator.JPG-eY44OKHv1M9ZlInG6sSFJSz2UMlimG.jpeg',
    },
  ];

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

  const handlePriorityChange = (value: string) => {
    setPriority(value);
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <DialogContent
      className="rounded-md sm:max-w-[720px] xl:max-h-[800px] overflow-y-auto max-h-screen flex flex-col gap-6"
      onClick={handleDialogClick}
    >
      <div>
        <EditableHeading initialValue="Add a title" className="mb-2 mt-4" />
        <div className="flex h-7">
          <div className="bg-surface rounded px-2 py-1 gap-2 flex items-center">
            {mark ? (
              <>
                <CheckCircle className="h-4 w-4 text-secondary" />
                <span className="text-xs font-semibold text-secondary">Completed</span>
              </>
            ) : (
              <>
                <CircleDashed className="h-4 w-4 text-secondary" />
                <span className="text-xs font-semibold text-secondary">Open</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section & Priority */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-high-emphasis text-base font-semibold">Section</Label>
          <Select>
            <SelectTrigger className="w-full h-[28px] px-2 py-1 mt-2">
              <SelectValue placeholder="Select" />
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
          <Label className="text-high-emphasis text-base font-semibold">Priority</Label>
          <div className="flex gap-2 mt-3">
            <Badge
              variant={priority === 'Low' ? 'default' : 'outline'}
              className={`rounded text-xs font-semibold cursor-pointer ${
                priority === 'Low' ? 'bg-amber-100 text-amber-600' : 'text-medium-emphasis'
              }`}
              onClick={() => handlePriorityChange('Low')}
            >
              Low
            </Badge>
            <Badge
              variant={priority === 'Medium' ? 'default' : 'outline'}
              className={`rounded text-xs font-semibold cursor-pointer ${
                priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 'text-medium-emphasis'
              }`}
              onClick={() => handlePriorityChange('Medium')}
            >
              Medium
            </Badge>
            <Badge
              variant={priority === 'High' ? 'default' : 'outline'}
              className={`rounded text-xs font-semibold cursor-pointer ${
                priority === 'High' ? 'bg-amber-100 text-amber-600' : 'text-medium-emphasis'
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
          <Label className="text-high-emphasis text-base font-semibold">Due date</Label>
          <div className="relative mt-2">
            <Input
              value={date ? format(date, 'dd.MM.yyyy') : ''}
              placeholder="Choose a date"
              readOnly
              className="h-[28px] px-2 py-1 placeholder:text-high-emphasis"
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
          <Label className="text-high-emphasis text-base font-semibold mb-2">Assignee</Label>
          <AssigneeSelector
            availableAssignees={availableAssignees}
            selectedAssignees={selectedAssignees}
            onChange={setSelectedAssignees}
          />
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

      <div className="flex justify-between mt-4">
        <Button variant="ghost" size="icon" className="text-red-500 bg-white w-12 h-10 border">
          <Trash className="h-3 w-3" />
        </Button>
        <div className="flex gap-2">
          {mark ? (
            <Button variant="ghost" className="h-10 border" onClick={() => setMark(false)}>
              <CircleDashed className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-black">Reopen Task</span>
            </Button>
          ) : (
            <Button variant="ghost" className="h-10 border" onClick={() => setMark(true)}>
              <CheckCircle className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-black">Mark As a Complete</span>
            </Button>
          )}

          <Button variant="ghost" className="h-10 border" onClick={onClose}>
            <span className="text-sm font-bold text-black">Close</span>
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
