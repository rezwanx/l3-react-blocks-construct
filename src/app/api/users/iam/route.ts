import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { https } from "../../utils/http";

export const GET = async () => {
  try {
    const url = `${process.env.BACKEND_URL}/iam/v1/User/GetAccount`;
    const cookieStore = await cookies();
    const res = (await https.get(url, {
      "X-Blocks-Key": process.env.X_BLOCKS_KEY || "",
      Authorization: `Bearer ${
        cookieStore.get("x-blocks-access-token")?.value
      }`,
      credentials: "include",
    })) as { data: unknown };
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(error);
  }
};
