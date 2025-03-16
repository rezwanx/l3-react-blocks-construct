import { activities } from 'features/activity-log/components/activity-log/activity-data';
import ActivityLogTimeline from 'features/activity-log/components/activity-log/activity-log-timeline';
import ActivityLogToolbar from 'features/activity-log/components/activity-log/activity-log-toolbar';

export default function ActivityLog() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-[18px] flex items-center justify-between md:mb-[32px]">
        <h3 className="text-2xl font-bold tracking-tight text-high-emphasis">Activity log</h3>
        <ActivityLogToolbar />
      </div>
      <ActivityLogTimeline activities={activities} />
    </div>
  );
}
