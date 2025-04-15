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

  const handleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'board' ? 'list' : 'board'));
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between md:mb-8">
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
