import React, { useEffect, useState } from 'react';
import { Task } from 'components/blocks/data-table/schema';
import { DataTable } from 'components/blocks/data-table/data-table';
import { columns } from 'features/Iam/components/iam-table/iam-table-columns';

export const tasksData = [
  {
    id: '1',
    title: 'Complete project documentation',
    status: 'in-progress',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Review pull requests',
    status: 'todo',
    label: 'development',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Fix navigation bug',
    status: 'in-progress',
    label: 'bug',
    priority: 'high',
  },
  {
    id: '4',
    title: 'Update user dashboard',
    status: 'completed',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Implement authentication',
    status: 'todo',
    label: 'security',
    priority: 'high',
  },
  {
    id: '6',
    title: 'Optimize database queries',
    status: 'in-progress',
    label: 'performance',
    priority: 'medium',
  },
  {
    id: '7',
    title: 'Write unit tests',
    status: 'todo',
    label: 'testing',
    priority: 'medium',
  },
  {
    id: '8',
    title: 'Design landing page',
    status: 'completed',
    label: 'design',
    priority: 'high',
  },
];

const TaskPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = tasksData;
        setTasks(data);
      } catch (err) {
        setError('Failed to load tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [tasks]);

  if (loading) {
    return <div className="flex justify-center p-8">Loading tasks...</div>;
  }

  if (error) {
    return <div className="flex justify-center p-8 text-red-500">{error}</div>;
  }

  return (
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Identity Access Management</h2>
          </div>
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
};

export default TaskPage;
