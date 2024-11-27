import { clients } from "@/lib/https";

export const getUsers = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  return clients.post(
    `/api/users`,
    JSON.stringify({
      page: Number(page),
      pageSize: Number(pageSize),
    })
  );
};
