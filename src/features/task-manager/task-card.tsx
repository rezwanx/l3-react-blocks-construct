import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, Circle, Check, MoreVertical } from 'lucide-react';
import { Card } from 'components/ui/card';

interface ITask {
  id: string;
  content: string;
  priority?: 'High' | 'Medium' | 'Low';
  dueDate?: string;
  assignees?: string[];
  tags?: string[];
  status?: 'todo' | 'inprogress' | 'done';
  comments?: number;
  attachments?: number;
}

interface SortableTaskCardProps {
  task: ITask;
  index: number;
}

export function SortableTaskCard({ task, index }: SortableTaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `task-${task.id}`,
    data: {
      task,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 999 : 'auto',
  };

  const TaskIcon = () => {
    if (task.status === 'done') {
      return <Check className="h-5 w-5 text-green-500" />;
    }
    return <Circle className="h-5 w-5 text-blue-400" />;
  };

  const PriorityBadge = () => {
    if (!task.priority) return null;

    const colorMap = {
      High: 'bg-red-100 text-red-600',
      Medium: 'bg-yellow-100 text-yellow-600',
      Low: 'bg-blue-100 text-blue-600',
    };

    return (
      <span className={`px-2 py-1 text-xs rounded ${colorMap[task.priority]}`}>
        {task.priority}
      </span>
    );
  };

  const TagBadges = () => {
    if (!task.tags || task.tags.length === 0) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {task.tags.map((tag, idx) => (
          <span key={idx} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3">
      <Card className="p-3 cursor-grab bg-white hover:shadow-md">
        <div className="flex justify-between items-start">
          <div className="flex gap-2">
            <TaskIcon />
            <p className="text-sm text-gray-700 font-medium">{task.content}</p>
          </div>
          <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <PriorityBadge />
          <TagBadges />
        </div>

        {(task.dueDate || task.assignees || task.comments || task.attachments) && (
          <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              {task.comments !== undefined && task.comments > 0 && (
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>{task.comments}</span>
                </span>
              )}

              {task.attachments !== undefined && task.attachments > 0 && (
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                  <span>{task.attachments}</span>
                </span>
              )}
            </div>

            {task.assignees && task.assignees.length > 0 && (
              <div className="flex -space-x-2">
                {task.assignees.slice(0, 3).map((user, idx) => (
                  <div
                    key={idx}
                    className="h-6 w-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs"
                  >
                    {user.charAt(0).toUpperCase()}
                  </div>
                ))}
                {task.assignees.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                    +{task.assignees.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
