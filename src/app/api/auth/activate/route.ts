import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { https } from "../../utils/http";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const url = `${process.env.BACKEND_URL}/api/iam/v1/Account/Activate`;
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
  } catch (error: unknown) {
    const { status } = error as {
      status: number;
      error: { isSuccess: boolean; errors: { Code: string } };
    };
    return NextResponse.json(error, { status: status });
  }
};
