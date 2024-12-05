import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { https } from "../../utils/http";

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const url = `${process.env.BACKEND_URL}/iam/v1/user/UpdateAccount`;
  const cookieStore = await cookies();
  const res = await https.post(
    url,
    JSON.stringify({
      ...body,
      projectKey: process.env.X_BLOCKS_KEY || "",
    }),
    {
      "X-Blocks-Key": process.env.X_BLOCKS_KEY || "",
      Authorization: `Bearer ${
        cookieStore.get("x-blocks-access-token")?.value
      }`,
      credentials: "include",
    }
  );
  return NextResponse.json(res);
};
