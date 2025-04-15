// import React, { useMemo } from 'react';
// import { useDroppable } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { MoreVertical, Plus } from 'lucide-react';
// import { Button } from 'components/ui/button';
// import { TaskCard } from './task-card';
// import { ITaskColumnProps } from '../../types/task';

// export function TaskColumn({ column, tasks, setActiveColumn }: ITaskColumnProps) {
//   const { isOver, setNodeRef } = useDroppable({
//     id: `column-${column.id}`,
//     data: {
//       column,
//     },
//   });

//   const taskIds = useMemo(() => tasks.map((task) => `task-${task.id}`), [tasks]);

//   const handleAddTaskClick = () => {
//     setActiveColumn(column.id);
//     const dialogTrigger = document.getElementById('add-task-dialog-trigger');
//     if (dialogTrigger) {
//       dialogTrigger.click();
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       className={`w-80 shrink-0 bg-gray-50 p-3 rounded-lg shadow-sm border border-gray-200
//         ${isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''}`}
//     >
//       <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-200">
//         <div className="flex items-center gap-2">
//           <h2 className="font-medium text-gray-800">{column.title}</h2>
//           <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
//             {tasks.length}
//           </span>
//         </div>
//         <div className="flex items-center">
//           <Button variant="ghost" className="h-8 w-8 p-0" onClick={handleAddTaskClick}>
//             <Plus className="h-4 w-4 text-gray-500" />
//           </Button>
//           <Button variant="ghost" className="h-8 w-8 p-0">
//             <MoreVertical className="h-4 w-4 text-gray-500" />
//           </Button>
//         </div>
//       </div>

//       <div className="min-h-[200px]">
//         <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
//           {tasks.map((task, index) => (
//             <TaskCard key={task.id} task={task} index={index} />
//           ))}
//         </SortableContext>

//         {tasks.length === 0 && (
//           <div className="mt-2 p-4 border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center">
//             <p className="text-xs text-gray-500 mb-2">No tasks in this column</p>
//             <Button variant="outline" size="sm" className="text-xs" onClick={handleAddTaskClick}>
//               <Plus className="h-3 w-3 mr-1" /> Add Task
//             </Button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useMemo } from 'react';
// import { useDroppable } from '@dnd-kit/core';
// import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
// import { MoreVertical, Plus } from 'lucide-react';
// import { Button } from 'components/ui/button';
// import { TaskCard } from './task-card';
// import { ITaskColumnProps } from '../../types/task';

// export function TaskColumn({ column, tasks, setActiveColumn }: ITaskColumnProps) {
//   const { isOver, setNodeRef } = useDroppable({
//     id: `column-${column.id}`,
//     data: {
//       column,
//     },
//   });

//   const taskIds = useMemo(() => tasks.map((task) => `task-${task.id}`), [tasks]);

//   const handleAddTaskClick = () => {
//     setActiveColumn(column.id);
//     const dialogTrigger = document.getElementById('add-task-dialog-trigger');
//     if (dialogTrigger) {
//       dialogTrigger.click();
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       className={`w-80 shrink-0 bg-gray-50 p-3 rounded-lg ${
//         isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''
//       }`}
//     >
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex items-center gap-2">
//           <h2 className="font-medium text-gray-800">{column.title}</h2>
//           <span className="text-xs text-gray-500 px-1">{tasks.length}</span>
//         </div>
//         <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//           <MoreVertical className="h-4 w-4 text-gray-500" />
//         </Button>
//       </div>

//       <div className="space-y-3 min-h-[200px]">
//         <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
//           {tasks.map((task, index) => (
//             <TaskCard key={task.id} task={task} index={index} />
//           ))}
//         </SortableContext>

//         {tasks.length === 0 && (
//           <div className="mt-2 text-center py-8">
//             <p className="text-sm text-gray-500 mb-2">No tasks in this column</p>
//           </div>
//         )}
//       </div>

//       <div className="mt-2">
//         <Button
//           variant="ghost"
//           size="sm"
//           className="w-full text-gray-500 justify-center hover:bg-gray-50 rounded-md font-normal"
//           onClick={handleAddTaskClick}
//         >
//           <Plus className="h-4 w-4 mr-1" /> Add Item
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { MoreVertical, Plus } from 'lucide-react';
import { Button } from 'components/ui/button';
import { TaskCard } from './task-card';
import { ITaskColumnProps } from '../../types/task';

export function TaskColumn({ column, tasks, setActiveColumn }: ITaskColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `column-${column.id}`,
    data: {
      column,
    },
  });

  const taskIds = useMemo(() => tasks.map((task) => `task-${task.id}`), [tasks]);

  const handleAddTaskClick = () => {
    setActiveColumn(column.id);
    const dialogTrigger = document.getElementById('add-task-dialog-trigger');
    if (dialogTrigger) {
      dialogTrigger.click();
    }
  };

  return (
    <div className="w-80 shrink-0 ">
      <div className="flex justify-between items-center mb-3 px-1">
        <div className="flex items-center gap-3">
          <h2 className=" text-gray-800 font-bold">{column.title}</h2>
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
              <TaskCard key={task.id} task={task} index={index} />
            ))}
          </SortableContext>

          {tasks.length === 0 && (
            <div className="mt-2 text-center py-8">
              <p className="text-sm text-gray-500 mb-2">No tasks in this column</p>
            </div>
          )}
        </div>

        <div className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-gray-500 justify-center hover:bg-gray-50 rounded-md font-normal"
            onClick={handleAddTaskClick}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
      </div>
    </div>
  );
}
