import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({});
  response.cookies.delete("x-blocks-access-token");
  response.cookies.delete("x-blocks-refresh-token");
  return response;
}
