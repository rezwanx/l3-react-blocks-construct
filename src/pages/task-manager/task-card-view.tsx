import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { useTaskBoard } from 'features/task-manager/hooks/use-task-board';
import { AddColumnDialog } from 'features/task-manager/components/card-view/add-column-dialog';
import { TaskDragOverlay } from 'features/task-manager/components/card-view/tag-drag-overlay';
import { AddTaskDialog } from 'features/task-manager/components/card-view/add-task-dialog';
import { TaskColumn } from 'features/task-manager/components/card-view/task-column';

export function TaskCardView() {
  const {
    columns,
    activeColumn,
    activeTask,
    sensors,
    setActiveColumn,
    addColumn,
    addTask,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useTaskBoard();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-0 py-4">
        <div className="flex items-center justify-between mb-4">
          <AddColumnDialog onAddColumn={addColumn} />
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-6 pt-3">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={column.tasks}
                setActiveColumn={setActiveColumn}
              />
            ))}
          </div>

          <DragOverlay>
            <TaskDragOverlay activeTask={activeTask} />
          </DragOverlay>
        </DndContext>

        {activeColumn && (
          <AddTaskDialog activeColumn={activeColumn} columns={columns} onAddTask={addTask} />
        )}
      </div>
    </div>
  );
}

export default TaskCardView;
