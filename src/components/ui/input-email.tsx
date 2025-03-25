import * as React from 'react';

export type InputEmailProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputEmail = React.forwardRef<HTMLInputElement, InputEmailProps>(
  ({ className, type = 'email', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`flex h-11 w-full rounded-md border-b border-input bg-transparent px-3 py-1 text-sm shadow-sm 
          focus-visible:outline-none focus-visible:border-b focus-visible:border-ring ${className || ''}`}
        {...props}
      />
    );
  }
);

InputEmail.displayName = 'InputEmail';

export { InputEmail };
