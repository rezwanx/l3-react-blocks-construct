import blockLogo from "@/assets/blocks_logo.png";
import Image from "next/image";
import { Bell } from "lucide-react";
import { UProfileMenu } from "@/components/core/u-profile-menu";
import { UServiceMenu } from "@/components/core/u-service-menu";
import { ULanguageMenu } from "@/components/core/u-language-menu";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="border-b py-2 px-12 flex justify-between items-center">
        <Image src={blockLogo} alt="logo" width="100" />
        <div className="text-gray-500 flex justify-between items-center gap-10">
          <ULanguageMenu />
          <Bell />
          <UServiceMenu />
          <UProfileMenu />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
