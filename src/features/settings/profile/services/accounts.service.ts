import { clients } from "@/lib/https";
import { ProfileFormType } from "../components/profile-form/utils";
import { User } from "@/types/user.type";

export const getAccount = async () => {
  try {
    const res = (await clients.get("/iam/v1/User/GetAccount")) as {
      data: User;
    };
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateAccount = (data: ProfileFormType) => {
  return clients.post<{
    itemId: string;
    errors: unknown | null;
    isSuccess: boolean;
  }>("/iam/v1/user/UpdateAccount", JSON.stringify(data));
};
