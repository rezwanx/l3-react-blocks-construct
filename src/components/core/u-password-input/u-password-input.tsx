import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input, InputProps } from 'components/ui/input';

export const UPasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const EyeComponet = open ? EyeOffIcon : EyeIcon;
  return (
    <div className="grid w-full items-center gap-2">
      <div className="relative">
        <Input
          type={open ? 'text' : 'password'}
          {...props}
          ref={ref}
          className="border rounded-lg"
        />
        <EyeComponet
          className="size-5 text-medium-emphasis absolute top-3 right-3"
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
});
UPasswordInput.displayName = 'UPasswordInput';
