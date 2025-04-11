import TaskManagerToolbar from 'features/task-manager/components/task-manager-toolbar/task-manager-toolbar';
import TaskDetailsModal from 'features/task-manager/components/task-details-modal/task-details-modal';
import { useState } from 'react';
import { Dialog } from 'components/ui/dialog';

export default function TaskManager() {
  const [isTaskDetailsModalOpen, setTaskDetailsModalOpen] = useState(false);

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Task Manager</h3>
        <TaskManagerToolbar />
      </div>
      <h1 className="cursor-pointer" onClick={() => setTaskDetailsModalOpen(true)}>
        open modal
      </h1>

      <Dialog open={isTaskDetailsModalOpen} onOpenChange={setTaskDetailsModalOpen}>
        {isTaskDetailsModalOpen && (
          <TaskDetailsModal onClose={() => setTaskDetailsModalOpen(false)} />
        )}
      </Dialog>
    </div>
  );
}
