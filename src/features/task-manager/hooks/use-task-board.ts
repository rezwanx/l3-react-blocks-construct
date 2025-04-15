// useTaskBoard.ts
import { useState } from 'react';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ITask, ITaskManagerColumn } from '../types/task';

export function useTaskBoard() {
  const [columns, setColumns] = useState<ITaskManagerColumn[]>([
    {
      id: '1',
      title: 'To Do',
      tasks: [
        {
          id: '1',
          content: 'Implement MFA for All Users',
          priority: 'High',
          tags: ['Security'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1'],
          status: 'todo',
        },
        {
          id: '2',
          content: 'Conduct a Full Inventory Review and Restock Critical Supplies',
          priority: 'Medium',
          tags: ['Inventory', 'Research'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1', 'user2', 'user3', 'user4'],
          status: 'todo',
        },
        {
          id: '3',
          content: 'Prepare and Draft the Monthly Performance & Activity Report',
          priority: 'Low',
          tags: ['Documentation', 'Research'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1', 'user2'],
          status: 'todo',
        },
        {
          id: '4',
          content: 'Investigate and Resolve Email Synchronization Failures Affecting Users',
          priority: 'High',
          tags: ['Mail', 'Bug Fix'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: [],
          status: 'todo',
        },
      ],
    },
    {
      id: '2',
      title: 'In Progress',
      tasks: [
        {
          id: '5',
          content: 'Update Calendar UI',
          priority: 'Medium',
          tags: ['Calendar', 'UI/UX'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1'],
          status: 'inprogress',
        },
        {
          id: '6',
          content: 'Conduct a Comprehensive Audit of User Roles and Permission Settings',
          priority: 'High',
          tags: ['User Management', 'Review'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1', 'user2'],
          status: 'inprogress',
        },
        {
          id: '7',
          content: 'Finalize and Publish Documentation for Upcoming Feature Releases',
          priority: 'Medium',
          tags: ['Documentation'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1', 'user2'],
          status: 'inprogress',
        },
      ],
    },
    {
      id: '3',
      title: 'Done',
      tasks: [
        {
          id: '8',
          content: 'Resolved Login Timeout Bug',
          priority: 'High',
          tags: ['User Management', 'Bug fix'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1'],
          status: 'done',
        },
        {
          id: '9',
          content: 'Sent Weekly Status Update Email',
          priority: 'Low',
          tags: ['Mail', 'Documentation'],
          dueDate: '18.03.2025',
          comments: 2,
          attachments: 4,
          assignees: ['user1', 'user2', 'user3'],
          status: 'done',
        },
      ],
    },
  ]);

  const [nextColumnId, setNextColumnId] = useState<number>(4);
  const [nextTaskId, setNextTaskId] = useState<number>(10);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

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

  const addColumn = (title: string) => {
    if (title.trim()) {
      setColumns([...columns, { id: nextColumnId.toString(), title, tasks: [] }]);
      setNextColumnId(nextColumnId + 1);
    }
  };

  const addTask = (columnId: string, content: string) => {
    if (content.trim()) {
      const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
        '1': 'todo',
        '2': 'inprogress',
        '3': 'done',
      };

      const newTask: ITask = {
        id: nextTaskId.toString(),
        content,
        status: statusMap[columnId] || 'todo',
        dueDate: '18.03.2025',
        comments: 0,
        attachments: 0,
        assignees: [],
      };

      const newColumns = columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });

      setColumns(newColumns);
      setNextTaskId(nextTaskId + 1);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id.toString();

    if (activeId.startsWith('task-')) {
      const taskId = activeId.replace('task-', '');

      for (const column of columns) {
        const task = column.tasks.find((t) => t.id === taskId);
        if (task) {
          setActiveTask(task);
          break;
        }
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (!activeId.startsWith('task-')) return;

    const activeTaskId = activeId.replace('task-', '');

    const sourceColumnIndex = columns.findIndex((col) =>
      col.tasks.some((task) => task.id === activeTaskId)
    );

    if (sourceColumnIndex === -1) return;

    if (overId.startsWith('column-')) {
      const targetColumnId = overId.replace('column-', '');
      const targetColumnIndex = columns.findIndex((col) => col.id === targetColumnId);

      if (targetColumnIndex === -1 || sourceColumnIndex === targetColumnIndex) return;

      const newColumns = [...columns];
      const activeTaskIndex = newColumns[sourceColumnIndex].tasks.findIndex(
        (task) => task.id === activeTaskId
      );

      if (activeTaskIndex === -1) return;

      const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(activeTaskIndex, 1);

      const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
        '1': 'todo',
        '2': 'inprogress',
        '3': 'done',
      };

      newColumns[targetColumnIndex].tasks.push({
        ...movedTask,
        status: statusMap[targetColumnId] || movedTask.status,
      });

      setColumns(newColumns);
    } else if (overId.startsWith('task-')) {
      const overTaskId = overId.replace('task-', '');

      const targetColumnIndex = columns.findIndex((col) =>
        col.tasks.some((task) => task.id === overTaskId)
      );

      if (targetColumnIndex === -1) return;

      const sourceTaskIndex = columns[sourceColumnIndex].tasks.findIndex(
        (task) => task.id === activeTaskId
      );
      const targetTaskIndex = columns[targetColumnIndex].tasks.findIndex(
        (task) => task.id === overTaskId
      );

      if (sourceTaskIndex === -1 || targetTaskIndex === -1) return;

      const newColumns = [...columns];

      if (sourceColumnIndex === targetColumnIndex) {
        newColumns[sourceColumnIndex].tasks = arrayMove(
          newColumns[sourceColumnIndex].tasks,
          sourceTaskIndex,
          targetTaskIndex
        );
      } else {
        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);

        const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
          '1': 'todo',
          '2': 'inprogress',
          '3': 'done',
        };

        newColumns[targetColumnIndex].tasks.splice(targetTaskIndex, 0, {
          ...movedTask,
          status: statusMap[columns[targetColumnIndex].id] || movedTask.status,
        });
      }

      setColumns(newColumns);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveTask(null);
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    if (activeId.startsWith('task-')) {
      const taskId = activeId.replace('task-', '');

      if (overId.startsWith('column-')) {
        const targetColumnId = overId.replace('column-', '');

        let sourceColumnIndex = -1;
        let sourceTaskIndex = -1;

        for (let i = 0; i < columns.length; i++) {
          const taskIndex = columns[i].tasks.findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            sourceColumnIndex = i;
            sourceTaskIndex = taskIndex;
            break;
          }
        }

        if (sourceColumnIndex === -1) {
          setActiveTask(null);
          return;
        }

        const targetColumnIndex = columns.findIndex((col) => col.id === targetColumnId);

        if (targetColumnIndex === -1 || sourceColumnIndex === targetColumnIndex) {
          setActiveTask(null);
          return;
        }

        const newColumns = [...columns];

        const [movedTask] = newColumns[sourceColumnIndex].tasks.splice(sourceTaskIndex, 1);

        const statusMap: Record<string, 'todo' | 'inprogress' | 'done'> = {
          '1': 'todo',
          '2': 'inprogress',
          '3': 'done',
        };

        newColumns[targetColumnIndex].tasks.push({
          ...movedTask,
          status: statusMap[targetColumnId] || movedTask.status,
        });

        setColumns(newColumns);
      }
    }

    setActiveTask(null);
  };

  return {
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
  };
}
