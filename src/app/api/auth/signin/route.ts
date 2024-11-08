import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const urlEncodedData = new URLSearchParams();
  formData.forEach((value, key) => {
    urlEncodedData.append(key, value.toString());
  });

  const res = await fetch(
    "https://dev-msblocks.seliselocal.com/api/authentication/v1/oauth/token",
    {
      method: "post",
      body: urlEncodedData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Blocks-Key": process.env.X_Blocks_Key || "",
        credentials: "include",
      },
    }
  );
  if (!res.ok) {
    const errorBody = await res.json();
    return NextResponse.json({ errorBody }, { status: res.status });
  }

  const cookies = res.headers.getSetCookie();
  const body = await res.json();

  const response = NextResponse.json({ ...body });
  response.cookies.set("x-blocks-access-token", cookies[0].split("=")[1]);
  response.cookies.set("x-blocks-refresh-token", cookies[1].split("=")[1]);
  return response;
}
