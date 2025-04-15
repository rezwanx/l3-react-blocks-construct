import React, { useMemo, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreVertical, Plus, X } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { TaskCard } from './task-card';
import { ITaskColumnProps } from '../../types/task';
import { Dialog } from 'components/ui/dialog';
import TaskDetailsView from '../task-details-view/task-details-view';
import { TaskService } from '../../services/task-service';

export function TaskColumn({ column, tasks, setActiveColumn, onAddTask, taskService }: ITaskColumnProps & { taskService: TaskService }) {
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

  const taskIds = useMemo(() => tasks.map((task) => `task-${task.id}`), [tasks]);

  const handleAddTaskClick = () => {
    if (showAddInput) {
      return;
    }
    setShowAddInput(true);
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      setActiveColumn(column.id);
      onAddTask(column.id, newTaskTitle);
      setNewTaskTitle('');
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
    setSelectedTaskId(id); // Set the selected task ID
    setTaskDetailsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    // deleteTask(id);
    taskService.deleteTask(id);
    setTaskDetailsModalOpen(false)
  };

  return (
    <div className="w-80 shrink-0 ">
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-3">
          <h2 className="text-gray-800 font-bold">{column.title}</h2>
          <span className="text-xs text-gray-500 font-semibold">{tasks.length}</span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </Button>
      </div>

      <div
        ref={setNodeRef}
        className={`bg-gray-50 p-3 rounded-xl ${isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
      >
        <div className="space-y-3 min-h-[200px]">
          <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {tasks.map((task, index) => (
              <TaskCard handleTaskClick={handleTaskClick} key={task.id} task={task} index={index} />
            ))}
          </SortableContext>

          {tasks.length === 0 && !showAddInput && (
            <div className="mt-2 text-center py-8">
              <p className="text-sm text-gray-500 mb-2">No tasks in this column</p>
            </div>
          )}
        </div>

        <div className="mt-2">
          {showAddInput ? (
            <div className="space-y-2">
              <Input
                placeholder="Enter task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                className="w-full"
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
              className="w-full text-gray-500 justify-center hover:bg-gray-50 rounded-md font-normal bg-white"
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
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </Dialog>
    </div>
  );
}
