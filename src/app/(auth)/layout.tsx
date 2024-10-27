import Image from "next/image";
import { ReactNode } from "react";
import bgAuth from "@/assets/bg-auth.png";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-[400px]">{children}</div>
      </div>
      <div className="flex-1 relative">
        <Image src={bgAuth} alt="bg-auth" fill={true} />
        <div className=" absolute left-0 right-0 top-0 bottom-0 bg-primary opacity-70"></div>
      </div>
    </div>
  );
}
