import { ITask } from '../types/task';

export const sampleTasks: ITask[] = [
  {
    id: '1',
    content: 'Update Calendar UI',
    priority: 'Medium',
    tags: ['Calendar', 'UI/UX'],
    dueDate: '18/03/2025',
    comments: 2,
    attachments: 2,
    assignees: ['Aaron Green', 'Adrian Müller'],
    status: 'todo'
  },
  {
    id: '2',
    content: 'Fix Login Bug',
    priority: 'High',
    tags: ['UI/UX', 'Usability'],
    dueDate: '20/03/2025',
    comments: 2,
    attachments: 2,
    assignees: ['John Doe'],
    status: 'done'
  },
  {
    id: '3',
    content: 'Design Dashboard Analytics',
    priority: 'High',
    tags: ['Design'],
    dueDate: '25/03/2025',
    comments: 2,
    attachments: 2,
    assignees: ['Sara Kim'],
    status: 'todo'
  },
  {
    id: '4',
    content: 'Set Up CI/CD Pipeline',
    priority: 'High',
    tags: ['UI/UX', 'Usability'],
    dueDate: '22/03/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Alex Wang'],
    status: 'inprogress'
  },
  {
    id: '5',
    content: 'QA: Profile Update Flow',
    priority: 'Medium',
    tags: ['UI/UX', 'Usability'],
    dueDate: '21/03/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Emily Clark'],
    status: 'done'
  },
  {
    id: '6',
    content: 'Integrate Stripe Payments',
    priority: 'High',
    tags: ['UI/UX', 'Usability'],
    dueDate: '27/03/2025',
    comments: 1,
    attachments: 2,
    assignees: ['Leo Chan'],
    status: 'inprogress'
  },
  {
    id: '7',
    content: 'Update Notification System',
    priority: 'Medium',
    tags: ['Frontend'],
    dueDate: '24/03/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Natalie Perez'],
    status: 'todo'
  },
  {
    id: '8',
    content: 'Optimize Landing Page SEO',
    priority: 'Low',
    tags: ['Accessibility', 'Frontend'],
    dueDate: '26/03/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Ivy Thompson'],
    status: 'inprogress'
  },
  {
    id: '9',
    content: 'Database Migration Plan',
    priority: 'High',
    tags: ['UI/UX', 'Usability'],
    dueDate: '29/03/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Carlos Mendes'],
    status: 'todo'
  },
  {
    id: '10',
    content: 'Implement Dark Mode',
    priority: 'Medium',
    tags: ['UI/UX', 'Accessibility'],
    dueDate: '30/03/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Priya Singh'],
    status: 'todo'
  },
  {
    id: '11',
    content: 'Review Legal Compliance',
    priority: 'High',
    tags: ['UI/UX', 'Usability'],
    dueDate: '01/04/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Omar Raza'],
    status: 'done'
  },
  {
    id: '12',
    content: 'User Feedback Report',
    priority: 'Low',
    tags: ['UI/UX', 'Usability'],
    dueDate: '15/03/2025',
    comments: 1,
    attachments: 1,
    assignees: ['Mina Park'],
    status: 'done'
  }
];
