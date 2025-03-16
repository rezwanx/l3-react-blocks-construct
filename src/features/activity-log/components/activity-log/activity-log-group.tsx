import { Separator } from 'components/ui/separator';
import ActivityLogItem from './activity-log-item';
import { ActivityGroup } from './activity-log.types';

const ActivityLogGroup = ({ date, items, isLastIndex }: ActivityGroup & { isLastIndex: boolean}) => (
  <div className="mb-6 relative">
    {/* Date Header */}
    <div className="text-base font-bold text-gray-700 mb-2 pb-1">
      {date}
    </div>
    {/* Activity List */}
    <div className="relative">
      {items.map((activity, index) => (
        <ActivityLogItem key={index} {...activity} />
      ))}
    </div>
    { !isLastIndex && <Separator />}
  </div>
);

export default ActivityLogGroup;
