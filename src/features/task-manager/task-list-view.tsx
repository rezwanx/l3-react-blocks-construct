import React, { useState, useRef } from 'react';
import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  CircleIcon,
  GripVertical,
  MessageSquare,
  MoreVertical,
  Paperclip,
  X,
  Plus,
} from 'lucide-react';
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

// // Status circle component
// function StatusCircle({ status }: { status: string }) {
//   if (status === 'done') {
//     return <CheckCircle2 className="h-5 w-5 text-green-500" />;
//   }
//   return <CircleIcon className="h-5 w-5 text-blue-500" />;
// }

function StatusCircle({ status }: { status: string }) {
  if (status === 'done') {
    return (
      <div className="w-4 h-4 rounded-full border-2 border-green-400 flex items-center justify-center">
        <svg
          className="w-3 h-3 text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
    );
  }

  return <div className="w-4 h-4 rounded-full border-2 border-dashed border-blue-400"></div>;
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
      className={`px-2 py-1 rounded-lg text-xs font-medium ${colors[priority as keyof typeof colors]}`}
    >
      {priority}
    </span>
  );
}

function Tag({ name }: { name: string }) {
  return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">{name}</span>;
}

function AssigneeAvatars({ assignees }: { assignees?: string[] }) {
  if (!assignees || assignees.length === 0) return null;

  return (
    <div className="flex -space-x-2 overflow-hidden">
      {assignees.slice(0, 3).map((user, index) => (
        <div
          key={index}
          className="h-8 w-8 rounded-full bg-gray-300 text-xs flex items-center justify-center border-2 border-white"
        >
          {user[0]}
        </div>
      ))}
      {assignees.length > 3 && (
        <div className="h-8 w-8 rounded-full bg-gray-200 text-xs flex items-center justify-center border-2 border-white">
          +{assignees.length - 3}
        </div>
      )}
    </div>
  );
}

function SortableTaskItem({ task }: { task: Task }) {
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
      className={`flex items-center min-w-max border-b border-gray-200 hover:bg-gray-50 h-14 ${isDragging ? 'bg-blue-50' : ''}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="w-12 flex items-center justify-center cursor-grab"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <div className="w-6 flex-shrink-0 flex items-center justify-center">
        <StatusCircle status={task.status || 'todo'} />
      </div>

      <div className="w-64 pl-2 mr-4">
        <p className="text-sm font-medium text-gray-900 truncate">{task.content}</p>
      </div>

      <div className="w-24 flex-shrink-0">
        <span className="text-sm text-gray-500">
          {statusDisplay[task.status as keyof typeof statusDisplay] || 'To Do'}
        </span>
      </div>

      <div className="w-24 flex-shrink-0">
        <PriorityBadge priority={task.priority} />
      </div>

      <div className="w-28 flex-shrink-0">
        <span className="text-sm text-gray-500">{task.dueDate}</span>
      </div>

      <div className="w-32 flex-shrink-0">
        <AssigneeAvatars assignees={task.assignees} />
      </div>

      <div className="w-32 flex-shrink-0">
        {task.tags && task.tags.length > 0 && <Tag name={task.tags[0]} />}
      </div>

      <div className="flex items-center gap-3 ml-auto pr-4 text-gray-500">
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

function NewTaskRow({
  onAdd,
  onCancel,
}: {
  onAdd: (title: string, status: string) => void;
  onCancel: () => void;
}) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskStatus, setNewTaskStatus] = useState<'todo' | 'inprogress' | 'done'>('todo');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd(newTaskTitle, newTaskStatus);
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="flex items-center min-w-max border-b border-gray-200 h-14">
      <div className="w-12 flex items-center justify-center">
        <GripVertical className="h-4 w-4 text-gray-200" />
      </div>

      <div className="w-6 flex-shrink-0 flex items-center justify-center">
        <CircleIcon className="h-5 w-5 text-gray-300" />
      </div>

      <div className="w-96 pl-2 mr-4">
        <Input
          placeholder="Enter a title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          className="h-10 text-sm w-full"
        />
      </div>

      <div className="w-24 flex-shrink-0">
        <Select
          value={newTaskStatus}
          onValueChange={(value) => setNewTaskStatus(value as 'todo' | 'inprogress' | 'done')}
        >
          <SelectTrigger className="h-8 text-sm">
            <SelectValue placeholder="To Do" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="inprogress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-24 flex-shrink-0"></div>
      <div className="w-28 flex-shrink-0"></div>
      <div className="w-32 flex-shrink-0"></div>
      <div className="w-32 flex-shrink-0"></div>

      <div className="flex items-center gap-2 ml-auto pr-4">
        <Button
          onClick={() => onAdd(newTaskTitle, newTaskStatus)}
          className="h-8 bg-primary hover:bg-primary-700 text-white px-4"
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
        <Button
          variant="ghost"
          onClick={onCancel}
          className="h-8 w-8 p-0 flex items-center justify-center "
        >
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}

export function TaskListView() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      content: 'Implement MFA for All Users',
      priority: 'High',
      tags: ['Security'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1'],
      status: 'todo',
    },
    {
      id: '2',
      content: 'Conduct a Full Inventory Review and Restock Critical Supplies',
      priority: 'Medium',
      tags: ['Inventory', 'Research'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1', 'user2', 'user3', 'user4'],
      status: 'todo',
    },
    {
      id: '3',
      content: 'Prepare and Draft the Monthly Performance & Activity Report',
      priority: 'Low',
      tags: ['Documentation', 'Research'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1', 'user2'],
      status: 'todo',
    },
    {
      id: '4',
      content: 'Investigate and Resolve Email Synchronization Failures Affecting Users',
      priority: 'High',
      tags: ['Mail', 'Bug Fix'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1', 'user2', 'user3'],
      status: 'todo',
    },
    {
      id: '5',
      content: 'Create New Task Templates',
      priority: 'Low',
      tags: ['Tasks', 'Feature'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1', 'user2', 'user3'],
      status: 'todo',
    },
    {
      id: '6',
      content: 'Update Calendar UI',
      priority: 'Medium',
      tags: ['Calendar', 'UI/UX'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1'],
      status: 'inprogress',
    },
    {
      id: '7',
      content: 'Conduct a Comprehensive Audit of User Roles and Permission Settings',
      priority: 'High',
      tags: ['User Management', 'Review'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1', 'user2'],
      status: 'inprogress',
    },
    {
      id: '8',
      content: 'Finalize and Publish Documentation for Upcoming Feature Releases',
      priority: 'Medium',
      tags: ['Documentation'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1', 'user2'],
      status: 'inprogress',
    },
    {
      id: '9',
      content: 'Resolved Login Timeout Bug',
      priority: 'High',
      tags: ['User Management', 'Bug fix'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1'],
      status: 'done',
    },
    {
      id: '10',
      content: 'Sent Weekly Status Update Email',
      priority: 'Low',
      tags: ['Mail', 'Documentation'],
      dueDate: '18.03.2025',
      comments: 2,
      attachments: 4,
      assignees: ['user1', 'user2', 'user3'],
      status: 'done',
    },
  ]);

  const [nextTaskId, setNextTaskId] = useState<number>(11);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleAddItemClick = () => {
      setShowNewTaskInput(true);
    };

    const addItemButton =
      document.querySelector('button[class*="add-item"]') ||
      document.querySelector('button:has(svg[class*="plus"])') ||
      document.querySelector('button:contains("Add Item")');

    if (addItemButton) {
      addItemButton.addEventListener('click', handleAddItemClick);
    }

    return () => {
      if (addItemButton) {
        addItemButton.removeEventListener('click', handleAddItemClick);
      }
    };
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const addTask = (title: string, status: string) => {
    if (title.trim()) {
      const newTask: Task = {
        id: nextTaskId.toString(),
        content: title,
        status: status as 'todo' | 'inprogress' | 'done',
        dueDate: '18.03.2025',
        priority: 'Medium',
        tags: [],
        assignees: [],
      };

      setTasks([newTask, ...tasks]);
      setNextTaskId(nextTaskId + 1);
      setShowNewTaskInput(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id.toString();

    if (activeId.startsWith('task-')) {
      const taskId = activeId.replace('task-', '');
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setActiveTask(task);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    if (active.id !== over.id) {
      const activeIndex = tasks.findIndex((task) => `task-${task.id}` === active.id);
      const overIndex = tasks.findIndex((task) => `task-${task.id}` === over.id);

      setTasks(arrayMove(tasks, activeIndex, overIndex));
    }

    setActiveTask(null);
  };

  const filteredTasks = statusFilter ? tasks.filter((task) => task.status === statusFilter) : tasks;

  const taskIds = filteredTasks.map((task) => `task-${task.id}`);

  return (
    <div className="mt-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <div className="min-w-max">
            {/* Table Header */}
            <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center h-14 font-medium text-sm text-gray-500">
                <div className="w-12"></div> {/* Space for drag handle */}
                <div className="w-6"></div> {/* Space for status circle */}
                <div className="w-64 pl-2 mr-4">Title</div>
                <div className="w-24 flex-shrink-0">List</div>
                <div className="w-24 flex-shrink-0">Priority</div>
                <div className="w-28 flex-shrink-0">Due date</div>
                <div className="w-32 flex-shrink-0">Assignee</div>
                <div className="w-32 flex-shrink-0">Tags</div>
                <div className="flex-grow"></div> {/* Space for actions */}
              </div>
            </div>

            {/* Task List with DnD */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                {/* New Task Input Row */}
                {showNewTaskInput && (
                  <NewTaskRow
                    onAdd={(title, status) => addTask(title, status)}
                    onCancel={() => setShowNewTaskInput(false)}
                  />
                )}

                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => <SortableTaskItem key={task.id} task={task} />)
                ) : (
                  <div className="text-center p-8 text-gray-500">No tasks to display</div>
                )}
              </SortableContext>

              <DragOverlay>
                {activeTask && (
                  <div className="flex items-center bg-white shadow-lg border border-gray-200 p-4 rounded-lg w-full">
                    <div className="flex-shrink-0 mr-3">
                      <StatusCircle status={activeTask.status || 'todo'} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">{activeTask.content}</p>
                    </div>
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListView;
