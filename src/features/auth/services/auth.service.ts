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

export const accountActivation = async ({
  code,
  password,
}: {
  password: string;
  code: string;
}) => {
  const payload = {
    code,
    password,
    preventPostEvent: true,
  };
  const ownApiUrl = "/api/auth/activate";
  return clients.post(ownApiUrl, JSON.stringify(payload), {});
};
