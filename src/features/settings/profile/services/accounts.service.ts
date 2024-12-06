import { clients } from "@/lib/https";
import { ProfileFormType } from "../components/profile-form/utils";

export const getAccount = async () => {
  try {
    const res = (await clients.get("/iam/v1/User/GetAccount")) as {
      data: unknown;
    };
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const updateAccount = (data: ProfileFormType) => {
  return clients.post("/iam/v1/user/UpdateAccount", JSON.stringify(data));
};
