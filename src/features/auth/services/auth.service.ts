import { clients, HttpError } from "@/lib/https";

export const signin = async (data: { username: string; password: string }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.username);
  formData.append("password", data.password);
  const url =
    process.env.NEXT_PUBLIC_BACKEND_URL + "/authentication/v1/oauth/token";

  const res = await fetch(url, {
    method: "post",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Blocks-Key": process.env.NEXT_PUBLIC_X_BLOCKS_KEY || "",
      credentials: "include",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new HttpError(res.status, err);
  }
  return res.json();
};

export const signout = async () => {
  try {
    const url = "/authentication/v1/Authentication/Logout";
    const res = await clients.post(
      url,
      JSON.stringify({
        refreshToken: localStorage.getItem("refresh_token"),
      })
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getRefreshToken = async () => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "refresh_token");
  formData.append("refresh_token", localStorage.getItem("refresh_token") || "");
  const url =
    process.env.NEXT_PUBLIC_BACKEND_URL + "/authentication/v1/oauth/token";

  const res = await fetch(url, {
    method: "post",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Blocks-Key": process.env.NEXT_PUBLIC_X_BLOCKS_KEY || "",
      credentials: "include",
    },
  });
  return res.json();
};

export const accountActivation = async (data: {
  password: string;
  code: string;
}) => {
  const payload = {
    ...data,
    ProjectKey: process.env.NEXT_PUBLIC_X_BLOCKS_KEY,
    preventPostEvent: true,
  };
  const url = "/iam/v1/Account/Activate";
  return clients.post(url, JSON.stringify(payload));
};
