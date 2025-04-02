import { useState } from 'react';
import { Check } from 'lucide-react';
import { CalendarEventColor } from '../../enums/calendar.enum';

interface ColorPickerProps {
  selectedColor?: string | null;
  onColorChange?: (color: string) => void;
  defaultColor?: string | null;
  colors?: string[];
}

export const ColorPickerTool = ({
  selectedColor: externalColor,
  onColorChange,
  defaultColor = null,
  colors = Object.values(CalendarEventColor),
}: ColorPickerProps) => {
  const [internalColor, setInternalColor] = useState(defaultColor);
  const isControlled = externalColor !== undefined;
  const currentColor = isControlled ? externalColor : internalColor;

  const handleColorSelect = (color: string) => {
    if (isControlled) {
      onColorChange?.(color);
    } else {
      setInternalColor(color);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleColorSelect(color)}
          className={`
            cursor-pointer w-6 h-6 rounded-full bg-${color}
            flex items-center justify-center transition-all
            ${currentColor === color ? 'ring-2 ring-neutral-200 scale-110' : 'ring-2 ring-neutral-100'}
          `}
        >
          {currentColor === color && <Check className="w-4 h-4 text-black" />}
        </div>
      ))}
    </div>
  );
};
