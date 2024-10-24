import { ReactNode } from "react";
import blockLogo from "@/assets/blocks_logo.png";
import Image from "next/image";
import { Bell, Globe2, LayoutDashboard } from "lucide-react";
import { UProfileMenu } from "@/components/core/u-profile-menu";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="border-b py-2 px-12 flex justify-between items-center">
        <Image src={blockLogo} alt="logo" width="100" />
        <div className="text-gray-500 flex justify-between items-center gap-10">
          <Globe2 className="" />
          <Bell />
          <LayoutDashboard />
          <UProfileMenu />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
