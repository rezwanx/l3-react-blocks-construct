import { ActivityGroup } from './activity-log.types';

export const activities: ActivityGroup[] = [
  {
    date: 'Today - 12.03.2025',
    items: [
      {
        time: '22:32',
        category: 'Task manager',
        description: 'User Adrian Müller completed the task "Finalize Q1 Budget"',
      },
      {
        time: '22:32',
        category: 'Calendar',
        description: 'Created an event: "Quarterly Review Meeting" (10.03.2025)',
      },
      {
        time: '22:32',
        category: 'Inventory',
        description: 'Added a new inventory item: "Steel Beams - 50 units"',
      },
      {
        time: '22:32',
        category: 'Mail',
        description: 'New email from Adrian Müller (adrian-muller@gmail.com)',
      },
      {
        time: '22:32',
        category: 'Dashboard',
        description: 'System auto-refreshed dashboard analytics.',
      },
    ],
  },
  {
    date: 'Yesterday - 11.03.2025',
    items: [
      {
        time: '22:32',
        category: 'Task manager',
        description: 'System marked overdue task "Submit Compliance Docs"',
      },
      {
        time: '22:32',
        category: 'Calendar',
        description: 'User Ethan Gold rescheduled "Team Standup" from 9:00 AM to 10:00 AM',
      },
      {
        time: '22:32',
        category: 'IAM',
        description: 'Enabled MFA for 3 users',
      },
      {
        time: '22:32',
        category: 'Dashboard',
        description: 'System auto-refreshed dashboard analytics.',
      },
    ],
  },
  {
    date: '10.03.2025',
    items: [
      {
        time: '22:32',
        category: 'Inventory',
        description: 'Deleted item "Adhesives" from inventory',
      },
      {
        time: '22:32',
        category: 'Task manager',
        description: 'Deleted task "Follow-up on Vendor Contract"',
      },
      {
        time: '22:32',
        category: 'Dashboard',
        description: 'System auto-refreshed dashboard analytics.',
      },
    ],
  },
];
