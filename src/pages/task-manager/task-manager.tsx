import TaskManagerToolbar from "features/task-manager/components/task-manager-toolbar/task-manager-toolbar";
import TaskDetailsModal from "features/task-manager/components/task-details-modal/task-details-modal";

export default function TaskManager() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Task Manager</h3>
        <TaskManagerToolbar />
      </div>
        <TaskDetailsModal />
    </div>
  )
}
