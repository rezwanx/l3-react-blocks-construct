"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAccount } from "@/features/settings/profile/hooks/useAccount";
import { clients } from "@/lib/https";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";

export const UProfileMenu = () => {
  const { data } = useGetAccount();
  const router = useRouter();

  const {
    firstName = "",
    lastName = "",
    email = "",
  } = (data as {
    firstName: string;
    lastName: string;
    email: string;
  }) || { firstName: "", lastName: "", email: "" };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 "
          align="end"
          side="top"
          sideOffset={10}
        >
          <DropdownMenuLabel>Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex justify-between items-center gap-2">
                <div className="relative w-8 h-8 rounded">
                  <Image
                    src="https://github.com/shadcn.png"
                    alt="profile"
                    fill={true}
                    className="rounded"
                  />
                </div>
                <div>
                  <h2>{firstName + " " + lastName}</h2>
                  <p className="text-xs text-gray-500">{email}</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>My selise</DropdownMenuItem>
          <DropdownMenuItem>About</DropdownMenuItem>
          <DropdownMenuItem>Privacy Policy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await clients.post("/api/auth/signout", JSON.stringify({}), {});
              router.push("/signin");
            }}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
