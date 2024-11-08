import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomInputProps } from "./index.type";
import { UFormError } from "../u-form-error";

export function UInput({
  label,
  placeholder,
  error,
  ...rest
}: CustomInputProps) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={label} className="text-primary">
        {label}
      </Label>
      <Input id={label} placeholder={placeholder} {...rest} />
      <UFormError error={error} />
    </div>
  );
}
