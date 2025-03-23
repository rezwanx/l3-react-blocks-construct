import { activities } from 'features/activity-log/components/activity-log-timeline/activity-data';
import ActivityLogTimeline from 'features/activity-log/components/activity-log-timeline/activity-log-timeline';
import ActivityLogToolbar from 'features/activity-log/components/activity-log-toobar/activity-log-toolbar';
import { useState } from 'react';

export default function ActivityLog() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = activities
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);
  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Activity log</h3>
        <ActivityLogToolbar onSearchChange={setSearchQuery} />
      </div>
      <ActivityLogTimeline activities={filteredActivities} />
    </div>
  );
}
