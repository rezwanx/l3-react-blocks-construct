import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const url =
    process.env.BACKEND_URL + "/api/authentication/v1/Authentication/Logout";
  const cookieStore = await cookies();

  const res = await fetch(url, {
    method: "post",
    body: JSON.stringify({
      refreshToken: cookieStore.get("x-blocks-refresh-token")?.value,
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Blocks-Key": process.env.X_BLOCKS_KEY || "",
      Authorization: `Bearer ${
        cookieStore.get("x-blocks-access-token")?.value
      }`,
    },
  });
  if (!res.ok) {
    return NextResponse.json({});
  }

  cookieStore.delete("x-blocks-access-token");
  cookieStore.delete("x-blocks-refresh-token");
  return NextResponse.json({});
}
