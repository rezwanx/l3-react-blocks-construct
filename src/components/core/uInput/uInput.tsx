import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomInputProps } from "./index.type";

export function UInput({ label, placeholder }: CustomInputProps) {
  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor={label} className="text-primary">
        {label}
      </Label>
      <Input type="email" id={label} placeholder={placeholder} />
    </div>
  );
}
