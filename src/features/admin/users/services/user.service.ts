import { https } from "@/lib/https";

export const getUsers = async ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  return https.post(
    "https://dev-msblocks.seliselocal.com/api/iam/v1/User/GetUsers",
    JSON.stringify({
      page: Number(page),
      pageSize: Number(pageSize),
    }),
    {
      "X-Blocks-Key": process.env.X_Blocks_Key || "",
    }
  );
};
