// CardView.tsx
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
  DragStartEvent,
  pointerWithin,
} from '@dnd-kit/core';

import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Card } from 'components/ui/card';
import { TaskColumn } from 'features/task-manager/task-column';

// Define our types
interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export function CardView() {
  const [columns, setColumns] = useState<Column[]>([
    { id: '1', title: 'To Do', tasks: [] },
    { id: '2', title: 'In Progress', tasks: [] },
    { id: '3', title: 'Done', tasks: [] },
  ]);

  const [nextColumnId, setNextColumnId] = useState<number>(4);
  const [nextTaskId, setNextTaskId] = useState<number>(1);
  const [newColumnTitle, setNewColumnTitle] = useState<string>('');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Set up sensors for drag interactions
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
      const newColumns = columns.map((column) => {
        if (column.id === activeColumn) {
          return {
            ...column,
            tasks: [...column.tasks, { id: nextTaskId.toString(), content: newTaskTitle }],
          };
        }
        return column;
      });
      setColumns(newColumns);
      setNextTaskId(nextTaskId + 1);
      setNewTaskTitle('');
    }
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id.toString();

    // Check if this is a task being dragged (tasks have format "task-id")
    if (activeId.startsWith('task-')) {
      const taskId = activeId.replace('task-', '');

      // Find the dragged task
      for (const column of columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          setActiveTask(task);
          break;
        }
      }
    }
  };

  // Find column containing a task
  const findColumnContainingTask = (taskId: string): { columnIndex: number; taskIndex: number } => {
    for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
      const column = columns[columnIndex];
      const taskIndex = column.tasks.findIndex((t) => t.id === taskId);

      if (taskIndex !== -1) {
        return { columnIndex, taskIndex };
      }
    }
    return { columnIndex: -1, taskIndex: -1 };
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    // Extract IDs
    const activeId = active.id.toString();
    const overId = over.id.toString();

    // Only proceed if we're dragging a task
    if (!activeId.startsWith('task-')) {
      setActiveTask(null);
      return;
    }

    const taskId = activeId.replace('task-', '');

    // If dropping over another task, it's a reordering within column
    if (overId.startsWith('task-')) {
      const overTaskId = overId.replace('task-', '');

      // Find both tasks
      const { columnIndex: sourceColumnIndex, taskIndex: sourceTaskIndex } =
        findColumnContainingTask(taskId);
      const { columnIndex: targetColumnIndex, taskIndex: targetTaskIndex } =
        findColumnContainingTask(overTaskId);

      if (
        sourceColumnIndex === -1 ||
        targetColumnIndex === -1 ||
        sourceColumnIndex !== targetColumnIndex
      ) {
        setActiveTask(null);
        return;
      }

      // Create new columns array with reordered tasks
      const newColumns = [...columns];
      const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);
      newColumns[targetColumnIndex].tasks.splice(targetTaskIndex, 0, movedTask);

      setColumns(newColumns);
    }
    // If dropping over a column
    else if (overId.startsWith('column-')) {
      const targetColumnId = overId.replace('column-', '');

      // Find source column and task
      const { columnIndex: sourceColumnIndex, taskIndex: sourceTaskIndex } =
        findColumnContainingTask(taskId);

      if (sourceColumnIndex === -1) {
        setActiveTask(null);
        return;
      }

      // If same column, we place it at the end
      if (columns[sourceColumnIndex].id === targetColumnId) {
        const newColumns = [...columns];
        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);
        newColumns[sourceColumnIndex].tasks.push(movedTask);
        setColumns(newColumns);
      }
      // Otherwise, move to new column
      else {
        const newColumns = [...columns];
        const [taskToMove] = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);

        const targetColumnIndex = newColumns.findIndex((col) => col.id === targetColumnId);
        if (targetColumnIndex !== -1) {
          newColumns[targetColumnIndex].tasks.push(taskToMove);
        }

        setColumns(newColumns);
      }
    }

    setActiveTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Trello-like Task Manager</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-blue-700 hover:bg-blue-800 text-white border-none"
              >
                <Plus className="mr-1 h-4 w-4" /> Add Column
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
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={(args) => {
          // First try detecting collisions with pointer
          const pointerCollisions = pointerWithin(args);
          if (pointerCollisions.length > 0) return pointerCollisions;

          // Fallback to closest corners
          return closestCorners(args);
        }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <main className="container mx-auto p-4 overflow-x-auto">
          <div className="flex space-x-4">
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
            {activeTask ? (
              <Card className="p-3 cursor-grab bg-white shadow-lg max-w-xs">
                <p className="text-sm text-gray-700">{activeTask.content}</p>
              </Card>
            ) : null}
          </DragOverlay>
        </main>
      </DndContext>

      {/* Task Dialog */}
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
  );
}

export default CardView;
