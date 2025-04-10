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
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from 'components/ui/button';
import { TaskCard } from './task-card';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
}

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  setActiveColumn: (id: string) => void;
}

export function TaskColumn({ column, tasks, setActiveColumn }: TaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${column.id}`,
    data: {
      column,
    },
  });

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
      className={`w-72 shrink-0 rounded bg-gray-200 p-3 ${isOver ? 'ring-2 ring-blue-400' : ''}`}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-700">{column.title}</h2>
        <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer" />
      </div>

      <SortableContext
        items={tasks.map((task) => `task-${task.id}`)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 mb-3 min-h-8">
          {tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </div>
      </SortableContext>

      <Button
        variant="ghost"
        className="w-full justify-start text-gray-500 hover:text-gray-700 hover:bg-gray-300"
        onClick={handleAddTaskClick}
      >
        <Plus className="mr-1 h-4 w-4" /> Add an item
      </Button>
    </div>
  );
}
