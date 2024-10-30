import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { UsersTable } from "@/features/admin/users/components/users-table.tsx";
import { getUsers } from "@/features/admin/users/services/user.service";
import { UPagination } from "@/components/blocks/u-pagination";

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
          <UPagination total={30} pageSize={3} currentPage={Number(page)} />
        </div>
      </div>
    </div>
  );
}
