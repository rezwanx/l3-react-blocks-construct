import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const urlEncodedData = new URLSearchParams();
  formData.forEach((value, key) => {
    urlEncodedData.append(key, value.toString());
  });

  const res = await fetch(
    `${process.env.BACKEND_URL}/authentication/v1/oauth/token`,
    {
      method: "post",
      body: urlEncodedData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Blocks-Key": process.env.X_BLOCKS_KEY || "",
        credentials: "include",
      },
    }
  );
  if (!res.ok) {
    const errorBody = await res.json();
    return NextResponse.json({ errorBody }, { status: res.status });
  }

  const body = await res.json();
  const cookieStore = await cookies();
  cookieStore.set("x-blocks-access-token", body.access_token);
  cookieStore.set("x-blocks-refresh-token", body.refresh_token);
  const response = NextResponse.json({ ...body });
  return response;
}
