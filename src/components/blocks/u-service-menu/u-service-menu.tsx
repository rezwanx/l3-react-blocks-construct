import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Globe, LayoutDashboard, Mail, NotepadText } from "lucide-react";
import { UServiceItem } from "./u-service-item";

export function UServiceMenu() {
  const items = [
    {
      label: "Email Template",
      icon: Mail,
    },
    {
      label: "Language",
      icon: Globe,
    },
    {
      label: "Release note",
      icon: NotepadText,
    },
  ];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <LayoutDashboard />
      </PopoverTrigger>
      <PopoverContent
        className="w-full"
        align="end"
        side="bottom"
        sideOffset={17}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Services</h4>
          </div>
          <hr />
          <div className="grid grid-cols-3 gap-2">
            {items.map((item, index) => (
              <UServiceItem key={index} {...item} />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
