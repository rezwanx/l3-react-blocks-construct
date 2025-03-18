import React from 'react';
import PhoneInput, { Country, Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './phone-input.css';
import { cn } from '../../..//lib/utils';

type PhoneInputProps = React.ComponentProps<typeof PhoneInput>;

interface UIPhoneInputProps extends Omit<PhoneInputProps, 'value' | 'onChange'> {
  onChange(value?: Value): void;
  placeholder?: string;
  defaultCountry?: Country;
  countryCallingCodeEditable?: boolean;
  international?: boolean;
  className?: string;
}

const UIPhoneInput = React.forwardRef<any, UIPhoneInputProps>(
  (
    {
      onChange,
      placeholder,
      defaultCountry,
      className,
      countryCallingCodeEditable,
      international,
      ...props
    },
    ref
  ) => {
    return (
      <PhoneInput
        onChange={onChange}
        placeholder={placeholder}
        defaultCountry={defaultCountry}
        className={cn(
          'flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        countryCallingCodeEditable={countryCallingCodeEditable}
        international={international}
        ref={ref}
        {...props}
      />
    );
  }
);

UIPhoneInput.displayName = 'UIPhoneInput';

export default UIPhoneInput;
