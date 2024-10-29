"use client";
import BlockLogo from "@/assets/blocks_logo.png";
import { Badge } from "@/components/ui/badge";
import { getToken } from "@/features/auth/services/auth.service";
import { getDefaultOrganization } from "@/features/auth/services/organization.service";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";
export default function Page() {
  useEffect(() => {
    const getOrganization = async () => {
      const formData = new URLSearchParams();
      formData.append("grant_type", "authenticate_site");
      const token = getToken(formData);
      const res = getDefaultOrganization({
        UserName: "rifath.sahriar@selisegroup.com",
      });
    };
    getOrganization();
  }, []);
  return (
    <div>
      <div className="px-12">
        <div className="my-8 text-2xl">My Organizations</div>
        <div>
          <div className="flex border w-fit rounded shadow p-4 px-6">
            <Image src={BlockLogo} alt="" width="100" />
            <div className="flex flex-col justify-between p-4 leading-normal gap-2">
              <h5 className="text-2xl font-bold  text-gray-600 dark:text-white">
                Blocks External test
              </h5>
              <div>
                <Badge variant="outline">admin</Badge>
              </div>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                3 services
              </p>
            </div>
          </div>
        </div>

        <div className="my-4"></div>
        {/* service card */}
        <div className="border border-primary shadow rounded w-fit p-5 flex flex-col justify-center items-center text-primary hover:bg-primary hover:text-white font-semibold gap-3">
          <div>
            <Mail className="w-12 h-12" />
          </div>
          <div>
            <h2>Email Templating</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
