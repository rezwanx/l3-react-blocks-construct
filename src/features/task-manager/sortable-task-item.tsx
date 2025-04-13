import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import {
  CircleIcon,
  CheckCircle2,
  MessageSquare,
  Paperclip,
  MoreVertical,
  GripVertical,
} from 'lucide-react';

interface Task {
  id: string;
  content: string;
  priority?: 'High' | 'Medium' | 'Low';
  tags?: string[];
  dueDate?: string;
  comments?: number;
  attachments?: number;
  assignees?: string[];
  status?: 'todo' | 'inprogress' | 'done';
}

// Status circle component
function StatusCircle({ status }: { status: string }) {
  if (status === 'done') {
    return <CheckCircle2 className="h-5 w-5 text-green-500" />;
  }
  return <CircleIcon className="h-5 w-5 text-gray-300" />;
}

// Priority badge component
function PriorityBadge({ priority }: { priority?: string }) {
  const colors = {
    High: 'bg-red-100 text-red-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-blue-100 text-blue-700',
  };

  if (!priority) return null;

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${colors[priority as keyof typeof colors]}`}
    >
      {priority}
    </span>
  );
}

// Tag component
function Tag({ name }: { name: string }) {
  return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{name}</span>;
}

// Assignee avatars component
function AssigneeAvatars({ assignees }: { assignees?: string[] }) {
  if (!assignees || assignees.length === 0) return null;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {assignees.map((user, index) => (
        <div
          key={index}
          className="inline-block h-8 w-8 rounded-full bg-gray-300 text-xs flex items-center justify-center border-2 border-white"
        >
          {user[0]}
        </div>
      ))}
      {assignees.length > 3 && (
        <div className="inline-block h-8 w-8 rounded-full bg-gray-200 text-xs items-center justify-center border-2 border-white">
          +{assignees.length - 3}
        </div>
      )}
    </div>
  );
}

// Task Item component with drag functionality
export function SortableTaskItem({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `task-${task.id}`,
    data: {
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const statusDisplay = {
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center border-b border-gray-200 hover:bg-gray-50 py-4 ${isDragging ? 'bg-blue-50' : ''}`}
    >
      <div {...attributes} {...listeners} className="px-4 cursor-grab">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <div className="flex-shrink-0 px-4">
        <StatusCircle status={task.status || 'todo'} />
      </div>

      <div className="min-w-[300px] max-w-[300px] px-4">
        <p className="text-sm font-medium text-gray-900 truncate">{task.content}</p>
      </div>

      <div className="w-[100px] px-4">
        <span className="text-sm text-gray-500">
          {statusDisplay[task.status as keyof typeof statusDisplay] || 'To Do'}
        </span>
      </div>

      <div className="w-[100px] px-4">
        <PriorityBadge priority={task.priority} />
      </div>

      <div className="w-[100px] px-4">
        <span className="text-sm text-gray-500">{task.dueDate}</span>
      </div>

      <div className="w-[150px] px-4">
        <AssigneeAvatars assignees={task.assignees} />
      </div>

      <div className="flex-grow px-4 flex gap-2">
        {task.tags?.map((tag, idx) => <Tag key={idx} name={tag} />)}
      </div>

      <div className="flex items-center gap-4 px-4 text-gray-500">
        {task.comments && (
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{task.comments}</span>
          </div>
        )}

        {task.attachments && (
          <div className="flex items-center">
            <Paperclip className="h-4 w-4 mr-1" />
            <span className="text-xs">{task.attachments}</span>
          </div>
        )}

        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
