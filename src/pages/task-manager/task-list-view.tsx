import React, { useState, useRef, useEffect } from 'react';
import {
  DndContext,
  closestCorners,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { useTasks } from 'features/task-manager/hooks/useTasks';
import { ITask } from 'features/task-manager/types/task';
import {
  NewTaskRow,
  SortableTaskItem,
  StatusCircle,
  TableHeader,
} from 'features/task-manager/components/list-view';
import { verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { sampleTasks } from 'features/task-manager/data/sample-tasks';

interface TaskListViewProps {
  openModal: () => void;
}

export function TaskListView({openModal}: TaskListViewProps) {
  const { tasks, addTask, updateTaskOrder, getFilteredTasks } = useTasks(sampleTasks);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [showNewTaskInput, setShowNewTaskInput] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleAddItemClick = () => {
      setShowNewTaskInput(true);
    };

    const addItemButton =
      document.querySelector('button[class*="add-item"]') ||
      document.querySelector('button:has(svg[class*="plus"])') ||
      document.querySelector('button:contains("Add Item")');

    if (addItemButton) {
      addItemButton.addEventListener('click', handleAddItemClick);
    }

    return () => {
      if (addItemButton) {
        addItemButton.removeEventListener('click', handleAddItemClick);
      }
    };
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleAddTask = (title: string, status: string) => {
    if (addTask(title, status as 'todo' | 'inprogress' | 'done')) {
      setShowNewTaskInput(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id.toString();

    if (activeId.startsWith('task-')) {
      const taskId = activeId.replace('task-', '');
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setActiveTask(task);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    if (active.id !== over.id) {
      const activeIndex = tasks.findIndex((task) => `task-${task.id}` === active.id);
      const overIndex = tasks.findIndex((task) => `task-${task.id}` === over.id);

      updateTaskOrder(activeIndex, overIndex);
    }

    setActiveTask(null);
  };

  const filteredTasks = getFilteredTasks(statusFilter);
  const taskIds = filteredTasks.map((task) => `task-${task.id}`);

  return (
    <div className="mt-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto" ref={scrollContainerRef}>
          <div className="min-w-max">
            {/* Table Header */}
            <TableHeader />

            {/* Task List with DnD */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
                {/* New Task Input Row */}
                {showNewTaskInput && (
                  <NewTaskRow onAdd={handleAddTask} onCancel={() => setShowNewTaskInput(false)} />
                )}

                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => <SortableTaskItem openModal={openModal} key={task.id} task={task} />)
                ) : (
                  <div className="text-center p-8 text-gray-500">No tasks to display</div>
                )}
              </SortableContext>

              <DragOverlay>
                {activeTask && (
                  <div className="flex items-center bg-white shadow-lg border border-gray-200 p-4 rounded-lg w-full">
                    <div className="flex-shrink-0 mr-3">
                      <StatusCircle status={activeTask.status || 'todo'} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium text-gray-900">{activeTask.content}</p>
                    </div>
                  </div>
                )}
              </DragOverlay>
            </DndContext>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListView;
