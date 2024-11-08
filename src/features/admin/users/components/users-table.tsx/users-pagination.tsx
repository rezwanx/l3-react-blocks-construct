import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type UsersPaginationProps = {
  total: number;
  currentPage: number;
  pageSize: number;
};

export const UsersPagination = ({
  total,
  currentPage = 1,
  pageSize,
}: UsersPaginationProps) => {
  const totalPage = Math.ceil(total / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={`./users/?page=${currentPage - 1}&pageSize=10`}
            />
          </PaginationItem>
        )}
        {prevPage - 1 > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {prevPage > 0 && (
          <PaginationItem>
            <PaginationLink href={`./users/?page=${prevPage}&pageSize=10`}>
              {prevPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentPage && (
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}

        {nextPage <= totalPage && (
          <PaginationItem>
            <PaginationLink href={`./users/?page=${nextPage}&pageSize=10`}>
              {nextPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {totalPage >= nextPage + 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPage > currentPage && (
          <PaginationItem>
            <PaginationNext
              href={`./users/?page=${currentPage + 1}&pageSize=10`}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
