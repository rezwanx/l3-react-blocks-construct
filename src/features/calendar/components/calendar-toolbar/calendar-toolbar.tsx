import { View, NavigateAction } from 'react-big-calendar';
import { Button } from 'components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from 'components/ui/tabs';
import { cn } from 'lib/utils';
import { formattedDate } from '../../utils/date-utils';

interface CalendarToolbarProps {
  currentView: View;
  currentDate: Date;
  onViewChange: (view: View) => void;
  onNavigate: (action: NavigateAction) => void;
  views?: View[];
  className?: string;
  todayButtonLabel?: string;
  navButtonTooltip?: {
    today?: string;
    previous?: string;
    next?: string;
  };
}

export const CalendarToolbar = ({
  currentView,
  currentDate,
  onViewChange,
  onNavigate,
  views = ['agenda', 'day', 'week', 'month'],
  className,
  todayButtonLabel = 'Today',
  navButtonTooltip = {
    today: 'Go to today',
    previous: 'Previous period',
    next: 'Next period',
  },
}: Readonly<CalendarToolbarProps>) => {
  const handleTodayClick = () => {
    onNavigate('TODAY');
  };

  const handlePrevClick = () => {
    onNavigate('PREV');
  };

  const handleNextClick = () => {
    onNavigate('NEXT');
  };

  return (
    <div
      className={cn(
        'flex justify-between items-center py-3 px-6 border-b bg-background',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={handleTodayClick}>
          {todayButtonLabel}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevClick}
          title={navButtonTooltip.previous}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextClick}
          title={navButtonTooltip.next}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="ml-4 text-lg font-medium">{formattedDate(currentDate, currentView)}</div>
      </div>
      <Tabs value={currentView} onValueChange={(value) => onViewChange(value as View)}>
        <TabsList className="bg-surface rounded-[4px]">
          {views.map((view) => (
            <TabsTrigger
              key={view}
              value={view}
              className="data-[state=active]:bg-white data-[state=active]:rounded-[4px]"
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
