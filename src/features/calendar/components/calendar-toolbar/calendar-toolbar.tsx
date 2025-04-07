import { View, NavigateAction } from 'react-big-calendar';
import { Button } from 'components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from 'components/ui/tabs';
import { cn } from 'lib/utils';
import { formattedDate } from '../../utils/date-utils';
import { CALENDAR_VIEWS, CustomView } from '../../enums/calendar.enum';

interface CalendarToolbarProps {
  currentView: View;
  currentDate: Date;
  onViewChange: (view: View) => void;
  onNavigate: (action: NavigateAction) => void;
  views?: CustomView[];
  className?: string;
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
  views = CALENDAR_VIEWS,
  className,
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
        'flex justify-between flex-col sm:flex-row items-center border-b border-border py-3 px-3 gap-2 sm:px-6',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleTodayClick} className="text-sm font-bold">
          Today
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevClick}
            title={navButtonTooltip.previous}
          >
            <ChevronLeft className="!h-5 !w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextClick}
            title={navButtonTooltip.next}
          >
            <ChevronRight className="!h-5 !w-5" />
          </Button>
        </div>
        <p className="text-high-emphasis text-base sm:text-2xl font-semibold">
          {formattedDate(currentDate, currentView)}
        </p>
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
