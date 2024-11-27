import { clients } from "@/lib/https";

export const signin = async (data: { username: string; password: string }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.username);
  formData.append("password", data.password);
  // const backendUrl =
  //   "https://dev-msblocks.seliselocal.com/api/authentication/v1/oauth/token";
  const ownApiUrl = "/api/auth/signin";
  return clients.post(ownApiUrl, formData, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
};
