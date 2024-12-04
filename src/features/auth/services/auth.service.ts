import { clients } from "@/lib/https";

export const signin = async (data: { username: string; password: string }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.username);
  formData.append("password", data.password);
  const ownApiUrl = "/api/auth/signin";
  return clients.post(ownApiUrl, formData, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
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
