import { Checkbox } from '../../../components/ui/checkbox';
import { UCheckboxProps } from './index.type';

export function UCheckbox({ label, labelClassName }: UCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        className="border-medium-emphasis data-[state=checked]:border-primary border-2 shadow-none [&>span>svg>path]:stroke-[3]"
      />
      {label && (
        <label
          htmlFor="terms"
          className={`text-sm text-medium-emphasis font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClassName}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
