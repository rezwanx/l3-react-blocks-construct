import { Card } from 'components/ui/card';
import { ITask } from '../../types/task';
import TagBadges from '../tag-badges/tag-badges';
import { PriorityBadge } from '../priority-badge/priority-badge';

interface TaskDragOverlayProps {
  activeTask: ITask | null;
}

export function TaskDragOverlay({ activeTask }: TaskDragOverlayProps) {
  if (!activeTask) return null;

  return (
    <Card className="p-3 bg-white shadow-lg w-72 opacity-80">
      <p className="text-sm text-gray-800">{activeTask.content}</p>

      {activeTask.tags && activeTask.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {activeTask.tags && activeTask.tags.length > 0 && <TagBadges tags={activeTask.tags} />}
        </div>
      )}

      {activeTask.priority && <PriorityBadge priority={activeTask.priority} />}
    </Card>
  );
}
