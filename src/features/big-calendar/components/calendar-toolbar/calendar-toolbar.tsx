import { ToolbarProps, View } from 'react-big-calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from 'components/ui/button';
import { Tabs, TabsList, TabsTrigger } from 'components/ui/tabs';

export const CalendarToolbar = ({ view, onNavigate, onView, label, views }: ToolbarProps) => {
  const allViews = views as View[];

  return (
    <div className="flex justify-between flex-col sm:flex-row items-center border-b border-border py-3 px-3 gap-2 sm:px-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => onNavigate('TODAY')} className="text-sm font-bold">
          Today
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('PREV')}>
            <ChevronLeft className="!h-5 !w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onNavigate('NEXT')}>
            <ChevronRight className="!h-5 !w-5" />
          </Button>
        </div>
        <p className="text-high-emphasis text-base sm:text-2xl font-semibold">{label}</p>
      </div>
      <Tabs value={view} onValueChange={(view) => onView(view as View)}>
        <TabsList className="bg-surface rounded-[4px]">
          {allViews.map((view) => (
            <TabsTrigger
              key={view}
              value={view}
              className="capitalize data-[state=active]:bg-white data-[state=active]:rounded-[4px]"
            >
              {view}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
