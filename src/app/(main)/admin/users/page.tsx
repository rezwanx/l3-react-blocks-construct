import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { UsersTable } from "@/features/admin/users/components/users-table.tsx";
import { getUsers } from "@/features/admin/users/services/user.service";
import { UsersPagination } from "@/features/admin/users/components/users-table.tsx/users-pagination";

export default async function UsersPage({
  searchParams: { page, pageSize },
}: {
  searchParams: { page: string; pageSize: string };
}) {
  const res = await getUsers({
    page: Number(page),
    pageSize: Number(pageSize),
  });
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
        <UsersTable users={res?.data || []} />
        <div className="flex justify-end mt-4">
          <UsersPagination
            total={res?.totalCount}
            currentPage={Number(page) || 1}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
