import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from 'components/ui/dialog';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import {
  CircleIcon,
  CheckCircle2,
  MessageSquare,
  Paperclip,
  MoreVertical,
  GripVertical,
} from 'lucide-react';
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
      assignees: [],
      status: 'todo',
    },
    {
      id: '5',
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
      id: '6',
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
      id: '7',
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
      id: '8',
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
      id: '9',
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

  const [nextTaskId, setNextTaskId] = useState<number>(10);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskStatus, setNewTaskStatus] = useState<'todo' | 'inprogress' | 'done'>('todo');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

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

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: nextTaskId.toString(),
        content: newTaskTitle,
        status: newTaskStatus,
      };

      setTasks([...tasks, newTask]);
      setNextTaskId(nextTaskId + 1);
      setNewTaskTitle('');
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
    <div className="min-h-screen">
      <div className="container mx-auto px-0 py-4">
        <div className="bg-white rounded-lg shadow">
          {/* Table Header */}
          <div className="border-b border-gray-200">
            <div className="flex py-4 font-medium text-sm text-gray-500">
              <div className="px-4 w-8"></div> {/* Space for drag handle */}
              <div className="px-4 w-8"></div> {/* Space for status circle */}
              <div className="min-w-[300px] max-w-[300px] px-4">Title</div>
              <div className="w-[100px] px-4">List</div>
              <div className="w-[100px] px-4">Priority</div>
              <div className="w-[100px] px-4">Due date</div>
              <div className="w-[150px] px-4">Assignee</div>
              <div className="flex-grow px-4">Tags</div>
              <div className="px-4 w-24"></div> {/* Space for actions */}
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
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => <SortableTaskItem key={task.id} task={task} />)
              ) : (
                <div className="text-center p-8 text-gray-500">No tasks to display</div>
              )}
            </SortableContext>

            <DragOverlay>
              {activeTask && (
                <div className="flex items-center bg-white shadow-lg border border-gray-200 p-4 rounded-lg w-full">
                  <div className="flex-shrink-0 px-4">
                    <StatusCircle status={activeTask.status || 'todo'} />
                  </div>
                  <div className="min-w-[300px] px-4">
                    <p className="text-sm font-medium text-gray-900">{activeTask.content}</p>
                  </div>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>

        {/* Add Task Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 hidden">Add Task</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Task Title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="col-span-3"
              />
              <Select
                value={newTaskStatus}
                onValueChange={(value) => setNewTaskStatus(value as 'todo' | 'inprogress' | 'done')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
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
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="mr-2">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={addTask}>Add Task</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default TaskListView;
