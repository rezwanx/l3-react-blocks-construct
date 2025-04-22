import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, X } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { TaskCard } from './task-card';
import { ITaskColumnProps } from '../../types/task';
import { Dialog } from 'components/ui/dialog';
import TaskDetailsView from '../task-details-view/task-details-view';
import { TaskDetails, TaskService } from '../../services/task-service';
import { ColumnMenu } from './column-menu';
import { useTaskContext } from '../../hooks/use-task-context';

export function TaskColumn({
  column,
  tasks,
  setActiveColumn,
  onAddTask,
  onRenameColumn,
  onDeleteColumn,
  onTaskAdded,
  taskService,
}: ITaskColumnProps & {
  onTaskAdded?: () => void;
  taskService: TaskService;
  onRenameColumn: (columnId: string, newTitle: string) => void;
  onDeleteColumn: (columnId: string) => void;
}) {
  const { tasks: modalTasks, addTask } = useTaskContext();

  const { isOver, setNodeRef } = useDroppable({
    id: `column-${column.id}`,
    data: {
      column,
    },
  });

  const [isTaskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [lastAddedTaskId, setLastAddedTaskId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const newTaskRef = useRef<HTMLDivElement>(null);

  const visibleTaskHeight = 'calc(100vh - 300px)';

  const taskIds = useMemo(() => tasks.map((task) => `task-${task.id}`), [tasks]);

  useEffect(() => {
    if (lastAddedTaskId && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [lastAddedTaskId, tasks.length]);

  const handleAddTaskClick = () => {
    if (showAddInput) {
      return;
    }
    setShowAddInput(true);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const lastTask = modalTasks[modalTasks.length - 1];
      const newId = lastTask ? String(Number(lastTask.id) + 1) : '1';
      const newTask: TaskDetails = {
        id: newId,
        section: column.id == '1' ? 'To Do' : column.id == '2' ? 'In Progress' : 'Done',
        isCompleted: false,
        title: newTaskTitle,
        mark: false,
        priority: '',
        dueDate: null,
        assignees: [],
        description: '',
        tags: [],
        attachments: [],
        comments: [],
      };
      addTask(newTask);
      setActiveColumn(column.id);
      onAddTask(column.id, newTaskTitle);
      setNewTaskTitle('');
      setLastAddedTaskId(newId);

      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
      }, 100);
    }
    setShowAddInput(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    } else if (e.key === 'Escape') {
      setShowAddInput(false);
      setNewTaskTitle('');
    }
  };

  const handleCancelAddTask = () => {
    setShowAddInput(false);
    setNewTaskTitle('');
  };

  const handleTaskClick = (id: string) => {
    setSelectedTaskId(id);
    setTaskDetailsModalOpen(true);
  };

  return (
    <div className="w-80 shrink-0 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-3">
          <h2 className="text-high-emphasis text-base font-bold">{column.title}</h2>
          <span className="text-sm text-medium-emphasis font-semibold">{tasks.length}</span>
        </div>
        <ColumnMenu
          columnId={column.id}
          columnTitle={column.title}
          onRename={onRenameColumn}
          onDelete={onDeleteColumn}
        />
      </div>

      <div
        ref={setNodeRef}
        className={`bg-neutral-25 p-3 border shadow-sm rounded-lg flex-grow flex flex-col ${
          isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''
        }`}
      >
        <div
          ref={scrollContainerRef}
          className="flex-grow flex flex-col overflow-y-auto"
          style={{
            maxHeight: visibleTaskHeight,
            scrollbarWidth: 'thin',
            scrollbarColor: '#CBD5E0 transparent',
          }}
        >
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            <div className="space-y-3 flex-grow">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  ref={task.id === lastAddedTaskId ? newTaskRef : null}
                  className={`task-card-container ${task.id === lastAddedTaskId ? 'animate-pulse' : ''}`}
                >
                  <TaskCard handleTaskClick={handleTaskClick} task={task} index={index} />
                </div>
              ))}
            </div>
          </SortableContext>

          {tasks.length === 0 && !showAddInput && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 mb-2">No tasks in this column</p>
            </div>
          )}
        </div>

        <div className="mt-3 pt-2 border-t">
          {showAddInput ? (
            <div className="space-y-2 p-2 bg-white rounded-md border">
              <Input
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full bg-white"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleAddTask} className="w-20">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelAddTask}
                  className="p-0 h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-medium-emphasis text-sm font-bold justify-center hover:text-high-emphasis rounded-md bg-white border"
              onClick={handleAddTaskClick}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          )}
        </div>
      </div>

      <Dialog open={isTaskDetailsModalOpen} onOpenChange={setTaskDetailsModalOpen}>
        {isTaskDetailsModalOpen && (
          <TaskDetailsView
            taskService={taskService}
            taskId={selectedTaskId}
            onClose={() => setTaskDetailsModalOpen(false)}
            onTaskAddedList={onTaskAdded}
          />
        )}
      </Dialog>
    </div>
  );
}
