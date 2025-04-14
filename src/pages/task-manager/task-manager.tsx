import { useState } from 'react';
import { Dialog } from 'components/ui/dialog';
import TaskManagerToolbar from 'features/task-manager/components/task-manager-toolbar/task-manager-toolbar';
import TaskDetailsView from 'features/task-manager/components/task-details-view/task-details-view';
import NewTaskModal from 'features/task-manager/components/new-task-modal/new-task-modal';
import TaskBoard from 'pages/task-manager/card-view';
import TaskListView from './task-list-view';
// import TaskListViewV1 from 'features/task-manager/components/list-view/task-list-view-v1';

export default function TaskManager() {
  const [viewMode, setViewMode] = useState('board');
  const [isTaskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const onOpen = () => {
    setNewTaskModalOpen(true);
  };

  const handleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'board' ? 'list' : 'board'));
  };

  const taskDetailView = () => {
    setTaskDetailsModalOpen(true);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Task Manager</h3>
        <TaskManagerToolbar viewMode={viewMode} handleViewMode={handleViewMode} onOpen={onOpen} />
      </div>
      <Dialog open={isTaskDetailsModalOpen} onOpenChange={setTaskDetailsModalOpen}>
        {isTaskDetailsModalOpen && (
          <TaskDetailsView onClose={() => setTaskDetailsModalOpen(false)} />
        )}
      </Dialog>

      <Dialog open={isNewTaskModalOpen} onOpenChange={setNewTaskModalOpen}>
        {isNewTaskModalOpen && <NewTaskModal onClose={() => setNewTaskModalOpen(false)} />}
      </Dialog>

      {viewMode === 'board' && <TaskBoard />}
      {viewMode === 'list' && <TaskListView openModal={taskDetailView}/>}
    </div>
  );
}
