'use client';

import { Minus, X, Expand } from 'lucide-react';
import { Button } from 'components/ui/button';

interface EmailComposeHeaderProps {
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
}

export function EmailComposeHeader({ onMinimize, onMaximize, onClose }: EmailComposeHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-blue-200 bg-white p-2">
      <div className="font-medium text-gray-700">New message</div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMinimize}>
          <Minus className="h-4 w-4" />
          <span className="sr-only">Minimize</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onMaximize}>
          <Expand className="h-4 w-4" />
          <span className="sr-only">Maximize</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
}
