"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UPasswordInputProps } from "./index.type";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export function UPasswordInput({
  label,
  placeholder = "",
}: UPasswordInputProps) {
  const [open, setOpen] = useState(false);
  const EyeComponet = open ? EyeOffIcon : EyeIcon;
  return (
    <div className="grid w-full items-center gap-2">
      {label && (
        <Label htmlFor={label} className="text-primary">
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          type={open ? "text" : "password"}
          id={label}
          placeholder={placeholder}
        />
        <EyeComponet
          className="size-5 text-primary absolute top-2 right-3"
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
}
