import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe2 } from "lucide-react";
import { Fragment } from "react";

export const ULanguageMenu = () => {
  const language = ["EN", "DE", "BN"];
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Globe2 />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-12 min-w-0 flex-col items-center justify-center"
          sideOffset={17}
        >
          {language.map((item, index) => (
            <Fragment key={index}>
              <DropdownMenuItem className="w-full">{item}</DropdownMenuItem>
              {index < language.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
