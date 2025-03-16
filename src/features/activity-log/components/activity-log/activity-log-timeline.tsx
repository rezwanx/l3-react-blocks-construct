import { Card } from 'components/ui/card';
import ActivityLogGroup from './activity-log-group';
import { ActivityGroup } from './activity-log.types';

const ActivityLogTimeline = ({ activities }: { activities: ActivityGroup[] }) => (
  <Card className="w-full border-none rounded-[8px] shadow-sm">
    <div className="px-12 py-8">
      {/* Continuous timeline line for all groups */}
      <div className="relative">
        {/* Main continuous timeline */}
        <div className="absolute left-1.5 -ml-6 top-0 bottom-0 w-0.5 bg-gray-200">
          <div className="absolute top-0 h-12 w-0.5 bg-white"></div>
          <div className="absolute bottom-0 h-8 w-0.5 bg-white"></div>
        </div>

        {activities.map((group, index) => (
          <ActivityLogGroup key={index} isLastIndex={index === activities.length - 1} {...group} />
        ))}
      </div>
    </div>
  </Card>
);

export default ActivityLogTimeline;
