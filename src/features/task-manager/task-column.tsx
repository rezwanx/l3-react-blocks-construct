// import { useDroppable } from '@dnd-kit/core';
// import { MoreHorizontal, Plus } from 'lucide-react';
// import { TaskCard } from './task-card';
// import { Button } from 'components/ui/button';

// interface ColumnProps {
//   column: {
//     id: string;
//     title: string;
//   };
//   tasks: Array<{
//     id: string;
//     content: string;
//   }>;
//   setActiveColumn: (id: string) => void;
// }

// export function TaskColumn({ column, tasks, setActiveColumn }: ColumnProps) {
//   const { isOver, setNodeRef } = useDroppable({
//     id: `column-${column.id}`,
//     data: {
//       column,
//     },
//   });

//   const handleAddTaskClick = () => {
//     setActiveColumn(column.id);
//     // Trigger the dialog
//     const dialogTrigger = document.getElementById('add-task-dialog-trigger');
//     if (dialogTrigger) {
//       dialogTrigger.click();
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       className={`w-72 shrink-0 rounded bg-gray-200 p-3 ${isOver ? 'ring-2 ring-blue-400' : ''}`}
//     >
//       <div className="flex justify-between items-center mb-3">
//         <h2 className="text-sm font-semibold text-gray-700">{column.title}</h2>
//         <MoreHorizontal className="h-5 w-5 text-gray-500" />
//       </div>

//       <div className="space-y-2 mb-3 min-h-8">
//         {tasks.map((task, index) => (
//           <TaskCard key={task.id} task={{ id: task.id, content: task.content }} index={index} />
//         ))}
//       </div>

//       <Button
//         variant="ghost"
//         className="w-full justify-start text-gray-500 hover:text-gray-700 hover:bg-gray-300"
//         onClick={handleAddTaskClick}
//       >
//         <Plus className="mr-1 h-4 w-4" /> Add an item
//       </Button>
//     </div>
//   );
// }

// task-column.tsx
// TaskColumn.tsx
// TaskColumn.tsx
// TaskColumn.tsx
// TaskColumn.tsx
import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreVertical, Plus } from 'lucide-react';
import { Button } from 'components/ui/button';
import { SortableTaskCard } from './task-card';

interface Task {
  id: string;
  content: string;
  priority?: 'High' | 'Medium' | 'Low';
  dueDate?: string;
  assignees?: string[];
  tags?: string[];
  status?: 'todo' | 'inprogress' | 'done';
  comments?: number;
  attachments?: number;
}

interface Column {
  id: string;
  title: string;
  tasks?: Task[];
}

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  setActiveColumn: (id: string) => void;
}

export function TaskColumn({ column, tasks, setActiveColumn }: TaskColumnProps) {
  // Set up droppable area for this column
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${column.id}`,
    data: {
      column,
    },
  });

  // Memoize task IDs to prevent unnecessary re-renders
  const taskIds = useMemo(() => tasks.map((task) => `task-${task.id}`), [tasks]);

  // Handle click on the Add Task button
  const handleAddTaskClick = () => {
    setActiveColumn(column.id);
    // Trigger the dialog
    const dialogTrigger = document.getElementById('add-task-dialog-trigger');
    if (dialogTrigger) {
      dialogTrigger.click();
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`w-80 shrink-0 bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200 
        ${isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
    >
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-gray-800">{column.title}</h2>
          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleAddTaskClick}>
            <Plus className="h-4 w-4 text-gray-500" />
          </Button>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>

      <div className="min-h-[200px]">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task, index) => (
            <SortableTaskCard key={task.id} task={task} index={index} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="mt-2 p-4 border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500 mb-2">No tasks in this column</p>
            <Button variant="outline" size="sm" className="text-xs" onClick={handleAddTaskClick}>
              <Plus className="h-3 w-3 mr-1" /> Add Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
