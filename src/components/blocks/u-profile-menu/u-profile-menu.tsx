"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignoutMutation } from "@/features/auth/hooks/useAuth";
import { useGetAccount } from "@/features/settings/profile/hooks/useAccount";
import Image from "next/image";
import { useRouter } from "next/navigation";
import avatarSource from "@/assets/bg-auth.png";

export const UProfileMenu = () => {
  const { mutateAsync } = useSignoutMutation();
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

  const signoutHandler = async () => {
    try {
      await mutateAsync();
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.replace("/signin");
    } catch (_error) {}
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={avatarSource} alt="profile pic" />
          </div>
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
                    src={avatarSource}
                    alt="profile pic"
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
          <DropdownMenuItem onClick={signoutHandler}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
