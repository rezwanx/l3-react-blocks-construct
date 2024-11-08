// export const getToken = async (body) => {
//   const res = await axios.post(`/api/identity/v20/identity/token`, body, {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded", // Set correct Content-Type
//     },
//     withCredentials: true,
//   });
//   return res;
// };

import { https } from "@/lib/https";

export const signin = async (data: { username: string; password: string }) => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", data.username);
  formData.append("password", data.password);
  // const backendUrl =
  //   "https://dev-msblocks.seliselocal.com/api/authentication/v1/oauth/token";
  const ownApiUrl = "/api/auth/signin";
  return https.post(ownApiUrl, formData, {
    "Content-Type": "application/x-www-form-urlencoded",
  });
};
