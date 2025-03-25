import { useState, useEffect } from 'react';
import { Label } from 'components/ui/label';
import { Input } from 'components/ui/input';
import { cn } from 'lib/utils';

type StockSliderProps = Readonly<{
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}>;

export function StockSlider({
  label = 'Stock',
  value = 0,
  min = 0,
  max = 1000,
  step = 1,
  disabled = false,
  onChange,
  className,
}: StockSliderProps) {
  const [sliderValue, setSliderValue] = useState<number>(value);
  const [inputValue, setInputValue] = useState<string>(value.toString());

  useEffect(() => {
    setSliderValue(value);
    setInputValue(value.toString());
  }, [value]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number.parseInt(e.target.value);
    setSliderValue(newValue);
    setInputValue(newValue.toString());
    onChange?.(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (newValue !== '' && !isNaN(Number(newValue))) {
      const numValue = Number.parseInt(newValue);
      const boundedValue = Math.min(Math.max(numValue, min), max);
      setSliderValue(boundedValue);
      onChange?.(boundedValue);
    }
  };

  const handleInputBlur = () => {
    if (inputValue === '' || isNaN(Number(inputValue))) {
      setInputValue(sliderValue.toString());
    } else {
      const numValue = Number.parseInt(inputValue);
      const boundedValue = Math.min(Math.max(numValue, min), max);
      setSliderValue(boundedValue);
      setInputValue(boundedValue.toString());
      onChange?.(boundedValue);
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          disabled={disabled}
          className="w-20 h-8 text-right"
        />
      </div>
      <div className="relative flex-1">
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{ width: `${(sliderValue / max) * 100}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={handleSliderChange}
          disabled={disabled}
          className={cn(
            'w-full h-2 appearance-none absolute top-0 left-0',
            'bg-transparent focus:outline-none',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow',
            '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow',
            { 'opacity-50 cursor-not-allowed': disabled }
          )}
        />
      </div>
    </div>
  );
}
