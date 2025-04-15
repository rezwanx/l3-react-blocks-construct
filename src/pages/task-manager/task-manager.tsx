import { useState } from 'react';
import { AlignJustify, Columns3, ListFilter, Plus, Search } from 'lucide-react';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';
import TaskListView from './task-list-view';
import { AddTaskDialog } from 'features/task-manager/components/card-view/add-task-dialog';
import { v4 as uuidv4 } from 'uuid';
import { TaskColumn } from 'features/task-manager/components/card-view/task-column';
import { sampleTasks } from 'features/task-manager/data/sample-tasks';
import { ITask, ITaskManagerColumn, statusDisplay } from 'features/task-manager/types/task';

export default function TaskManager() {
  const [viewMode, setViewMode] = useState('board');
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  const todoTasks = sampleTasks.filter((task) => task.status === 'todo');
  const inProgressTasks = sampleTasks.filter((task) => task.status === 'inprogress');
  const doneTasks = sampleTasks.filter((task) => task.status === 'done');

  const [columns, setColumns] = useState<ITaskManagerColumn[]>([
    {
      id: 'todo',
      title: statusDisplay.todo,
      tasks: todoTasks,
    },
    {
      id: 'inprogress',
      title: statusDisplay.inprogress,
      tasks: inProgressTasks,
    },
    {
      id: 'done',
      title: statusDisplay.done,
      tasks: doneTasks,
    },
  ]);

  // Function to handle main "Add Item" button click
  const handleAddItemClick = () => {
    // Open the dialog
    const dialogTrigger = document.getElementById('add-task-dialog-trigger');
    if (dialogTrigger) {
      dialogTrigger.click();
    }
  };

  // Function to handle adding a task from the dialog
  const handleAddTask = (columnId: string, content: string) => {
    // Create new task
    const newTask: ITask = {
      id: uuidv4(), // Generate unique ID
      content,
      status: columnId as 'todo' | 'inprogress' | 'done',
      priority: 'Medium', // Default priority
      tags: [], // Empty tags
      dueDate: '', // No due date
      comments: 0,
      attachments: 0,
      assignees: [],
    };

    // Add the task to the appropriate column
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, tasks: [...column.tasks, newTask] } : column
      )
    );
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between md:mb-8">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Task Manager</h3>
        <div className="flex gap-1">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search" className="h-8 w-full rounded-lg pl-8" />
          </div>
          <Button variant="outline" size="sm" className="h-8 px-3">
            <ListFilter className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 px-3 ${viewMode === 'board' ? 'bg-gray-100' : ''}`}
            onClick={() => setViewMode('board')}
          >
            <Columns3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 px-3 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
          <Button size="sm" className="h-8 text-sm font-bold" onClick={handleAddItemClick}>
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </div>
      </div>

      {viewMode === 'board' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={column.tasks}
              setActiveColumn={setActiveColumn}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      )}
      {viewMode === 'list' && <TaskListView />}

      <AddTaskDialog activeColumn={activeColumn} columns={columns} onAddTask={handleAddTask} />
    </div>
  );
}
