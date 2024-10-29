import axios from "axios";
export const getToken = async (body) => {
  const res = await axios.post(`/api/identity/v20/identity/token`, body, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // Set correct Content-Type
    },
    withCredentials: true,
  });

  return res;
};
