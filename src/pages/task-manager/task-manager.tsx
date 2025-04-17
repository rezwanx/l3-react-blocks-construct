import { useState } from 'react';
import { Dialog } from 'components/ui/dialog';
import TaskManagerToolbar from 'features/task-manager/components/task-manager-toolbar/task-manager-toolbar';
import NewTaskModal from 'features/task-manager/components/new-task-modal/new-task-modal';
import TaskListView from './task-list-view';
import { TaskService } from 'features/task-manager/services/task-service';
import TaskCardView from './task-card-view';

export default function TaskManager() {
  const [viewMode, setViewMode] = useState('board');
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const taskService = new TaskService();

  const task = taskService.getTasks();

  const onOpen = () => {
    setNewTaskModalOpen(true);
  };

  const handleViewMode = (view: string) => {
    setViewMode(view === 'list' ? 'list' : 'board');
  };

  // Function to handle main "Add Item" button click
  // const handleAddItemClick = () => {
  //   // Set the active column to the "To Do" column (assuming its ID is '1')
  //   const todoColumnId = '1';

  //   // Use a custom event to communicate with TaskCardView
  //   const event = new CustomEvent('setActiveColumn', { detail: todoColumnId });
  //   document.dispatchEvent(event);

  //   // Then trigger the add task dialog
  //   const dialogTrigger = document.getElementById('add-task-dialog-trigger');
  //   if (dialogTrigger) {
  //     dialogTrigger.click();
  //   }
  // };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Task Manager</h3>
        <TaskManagerToolbar viewMode={viewMode} handleViewMode={handleViewMode} onOpen={onOpen} />
      </div>

      <Dialog open={isNewTaskModalOpen} onOpenChange={setNewTaskModalOpen}>
        {isNewTaskModalOpen && <NewTaskModal onClose={() => setNewTaskModalOpen(false)} />}
      </Dialog>

      {viewMode === 'board' && <TaskCardView task={task} taskService={taskService} />}
      {viewMode === 'list' && <TaskListView task={task} taskService={taskService} />}
    </div>
  );
}
