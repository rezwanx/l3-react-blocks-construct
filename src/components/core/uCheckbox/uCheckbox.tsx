import { Checkbox } from '../../../components/ui/checkbox';
import { UCheckboxProps } from './index.type';

export function UCheckbox({ label, labelClassName }: Readonly<UCheckboxProps>) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        className="border-medium-emphasis data-[state=checked]:border-none border-2 rounded-[2px]"
      />
      {label && (
        <label
          htmlFor="terms"
          className={`text-sm text-medium-emphasis font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClassName}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
