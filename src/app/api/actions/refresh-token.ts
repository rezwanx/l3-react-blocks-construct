import { cookies } from "next/headers";

export const refreshToken = async () => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "refresh_token");

  const url = `${process.env.BACKEND_URL}/api/authentication/v1/oauth/token`;
  const cookieStore = await cookies();
  const res = await fetch(url, {
    method: "post",
    body: formData,
    headers: {
      "X-Blocks-Key": process.env.X_BLOCKS_KEY || "",
      Cookie: `refresh_token=${
        cookieStore.get("x-blocks-refresh-token")?.value
      }`,
    },
  });
  const response = await res.json();
  cookieStore.set("x-blocks-access-token", response.access_token);
  return response.access_token;
};
