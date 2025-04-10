// TaskBoard.tsx
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from 'components/ui/dialog';
import { Plus } from 'lucide-react';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import { Card } from 'components/ui/card';
import { TaskColumn } from 'features/task-manager/task-column';

// Define our types
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

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export function TaskBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: '1',
      title: 'To Do',
      tasks: [
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
      ],
    },
    {
      id: '2',
      title: 'In Progress',
      tasks: [
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
      ],
    },
    {
      id: '3',
      title: 'Done',
      tasks: [
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
      ],
    },
  ]);

  const [nextColumnId, setNextColumnId] = useState<number>(4);
  const [nextTaskId, setNextTaskId] = useState<number>(10);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
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

  const addColumn = () => {
    if (newColumnTitle.trim()) {
      setColumns([...columns, { id: nextColumnId.toString(), title: newColumnTitle, tasks: [] }]);
      setNextColumnId(nextColumnId + 1);
      setNewColumnTitle('');
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() && activeColumn) {
      const newTask: Task = {
        id: nextTaskId.toString(),
        content: newTaskTitle,
        status:
          columns.find((col) => col.id === activeColumn)?.id === '1'
            ? 'todo'
            : columns.find((col) => col.id === activeColumn)?.id === '2'
              ? 'inprogress'
              : 'done',
      };

      const newColumns = columns.map((column) => {
        if (column.id === activeColumn) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });

      setColumns(newColumns);
      setNextTaskId(nextTaskId + 1);
      setNewTaskTitle('');
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id.toString();

    if (activeId.startsWith('task-')) {
      const taskId = activeId.replace('task-', '');

      for (const column of columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          setActiveTask(task);
          break;
        }
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (!activeId.startsWith('task-')) return;

    const activeTaskId = activeId.replace('task-', '');

    const sourceColumnIndex = columns.findIndex((col) =>
      col.tasks.some((task) => task.id === activeTaskId)
    );

    if (sourceColumnIndex === -1) return;

    if (overId.startsWith('column-')) {
      const targetColumnId = overId.replace('column-', '');
      const targetColumnIndex = columns.findIndex((col) => col.id === targetColumnId);

      if (targetColumnIndex === -1 || sourceColumnIndex === targetColumnIndex) return;

      const newColumns = [...columns];
      const activeTaskIndex = newColumns[sourceColumnIndex].tasks.findIndex(
        (task) => task.id === activeTaskId
      );

      if (activeTaskIndex === -1) return;

      const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(activeTaskIndex, 1);

      const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
        '1': 'todo',
        '2': 'inprogress',
        '3': 'done',
      };

      newColumns[targetColumnIndex].tasks.push({
        ...movedTask,
        status: statusMap[targetColumnId] || movedTask.status,
      });

      setColumns(newColumns);
    } else if (overId.startsWith('task-')) {
      const overTaskId = overId.replace('task-', '');

      const targetColumnIndex = columns.findIndex((col) =>
        col.tasks.some((task) => task.id === overTaskId)
      );

      if (targetColumnIndex === -1) return;

      const sourceTaskIndex = columns[sourceColumnIndex].tasks.findIndex(
        (task) => task.id === activeTaskId
      );
      const targetTaskIndex = columns[targetColumnIndex].tasks.findIndex(
        (task) => task.id === overTaskId
      );

      if (sourceTaskIndex === -1 || targetTaskIndex === -1) return;

      const newColumns = [...columns];

      if (sourceColumnIndex === targetColumnIndex) {
        newColumns[sourceColumnIndex].tasks = arrayMove(
          newColumns[sourceColumnIndex].tasks,
          sourceTaskIndex,
          targetTaskIndex
        );
      } else {
        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);

        const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
          '1': 'todo',
          '2': 'inprogress',
          '3': 'done',
        };

        newColumns[targetColumnIndex].tasks.splice(targetTaskIndex, 0, {
          ...movedTask,
          status: statusMap[columns[targetColumnIndex].id] || movedTask.status,
        });
      }

      setColumns(newColumns);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId.startsWith('task-')) {
      const taskId = activeId.replace('task-', '');

      if (overId.startsWith('column-')) {
        const targetColumnId = overId.replace('column-', '');

        let sourceColumnIndex = -1;
        let sourceTaskIndex = -1;

        for (let i = 0; i < columns.length; i++) {
          const taskIndex = columns[i].tasks.findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            sourceColumnIndex = i;
            sourceTaskIndex = taskIndex;
            break;
          }
        }

        if (sourceColumnIndex === -1) {
          setActiveTask(null);
          return;
        }

        const targetColumnIndex = columns.findIndex((col) => col.id === targetColumnId);

        if (targetColumnIndex === -1 || sourceColumnIndex === targetColumnIndex) {
          setActiveTask(null);
          return;
        }

        const newColumns = [...columns];

        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);

        const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
          '1': 'todo',
          '2': 'inprogress',
          '3': 'done',
        };

        newColumns[targetColumnIndex].tasks.push({
          ...movedTask,
          status: statusMap[targetColumnId] || movedTask.status,
        });

        setColumns(newColumns);
      }
    }

    setActiveTask(null);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-0 py-4">
        <div className="flex items-center justify-between mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="flex items-center bg-white hover:bg-white">
                <Plus className="h-4 w-4" />
                Add Column
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Column</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Column Title"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" className="mr-2">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={addColumn}>Add Column</Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-6 pt-3">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={column.tasks}
                setActiveColumn={setActiveColumn}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <Card className="p-3 bg-white shadow-lg w-72 opacity-80">
                <p className="text-sm text-gray-800">{activeTask.content}</p>

                {activeTask.tags && activeTask.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {activeTask.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </DragOverlay>
        </DndContext>

        {activeColumn && (
          <Dialog>
            <DialogTrigger className="hidden" id="add-task-dialog-trigger">
              Add Task
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  Add New Task to {columns.find((c) => c.id === activeColumn)?.title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Task Title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="col-span-3"
                />
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
        )}
      </div>
    </div>
  );
}

export default TaskBoard;
