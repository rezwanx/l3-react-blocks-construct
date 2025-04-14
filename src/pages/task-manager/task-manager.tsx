import { useState } from 'react';
import { Dialog } from 'components/ui/dialog';
import TaskManagerToolbar from 'features/task-manager/components/task-manager-toolbar/task-manager-toolbar';
import TaskDetailsView from 'features/task-manager/components/task-details-view/task-details-view';
import NewTaskModal from 'features/task-manager/components/new-task-modal/new-task-modal';
import { Button } from 'components/ui/button';

export default function TaskManager() {
  const [isTaskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);
  const [isNewTaskModalOpen, setNewTaskModalOpen] = useState(false);

  const onOpen = () => {
    setNewTaskModalOpen(true)
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Task Manager</h3>
        <TaskManagerToolbar onOpen={onOpen} />
      </div>
      <Button className="cursor-pointer" onClick={() => setTaskDetailsModalOpen(true)}>
        Task Details View
      </Button>

      <Dialog open={isTaskDetailsModalOpen} onOpenChange={setTaskDetailsModalOpen}>
        {isTaskDetailsModalOpen && (
          <TaskDetailsView onClose={() => setTaskDetailsModalOpen(false)} />
        )}
      </Dialog>

      <Dialog open={isNewTaskModalOpen} onOpenChange={setNewTaskModalOpen}>
        {isNewTaskModalOpen && <NewTaskModal onClose={() => setNewTaskModalOpen(false)} />}
      </Dialog>
    </div>
  );
}
