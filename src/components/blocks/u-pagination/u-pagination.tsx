import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { UPaginationProps } from "./index.type";

export const UPagination = ({
  total,
  currentPage = 1,
  pageSize,
}: UPaginationProps) => {
  const totalPage = Math.ceil(total / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
        )}
        {prevPage - 1 > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {prevPage > 0 && (
          <PaginationItem>
            <PaginationLink href="#">{prevPage}</PaginationLink>
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
            <PaginationLink href="#">{nextPage}</PaginationLink>
          </PaginationItem>
        )}
        {totalPage > nextPage + 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {totalPage > currentPage && (
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
