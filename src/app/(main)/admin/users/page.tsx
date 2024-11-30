"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { UsersTable } from "@/features/admin/users/components/users-table.tsx";
import { getUsers } from "@/features/admin/users/services/user.service";
import { UsersPagination } from "@/features/admin/users/components/users-table.tsx/users-pagination";
import { User } from "@/features/admin/users/components/users-table.tsx/index.type";
import { useGetUsers } from "@/features/admin/users/hooks/useUsers";
import { useEffect, useState } from "react";

export default function UsersPage({
  searchParams: { page, pageSize },
}: {
  searchParams: { page: string; pageSize: string };
}) {
  const [userResponse, setUserResponse] = useState({ data: [], totalCount: 0 });

  const { mutateAsync } = useGetUsers();
  useEffect(() => {
    getUsers(Number(page) || 0, Number(pageSize) || 10);
  }, [page, pageSize]);

  const getUsers = async (page: number, pageSize: number) => {
    const res = (await mutateAsync({ page, pageSize })) as {
      data: User[];
      totalCount: number;
    };
    setUserResponse(res);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">Users</div>
        <Link href="./users/add">
          <Button variant="outline" size="sm">
            <PlusIcon />
            add
          </Button>
        </Link>
      </div>
      <div className="mt-4">
        <UsersTable users={userResponse?.data || []} />
        <div className="flex justify-end mt-4">
          <UsersPagination
            total={userResponse?.totalCount}
            currentPage={Number(page) || 1}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
