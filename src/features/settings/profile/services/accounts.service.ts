import { clients } from "@/lib/https";
import { ProfileFormType } from "../components/profile-form/utils";

export const getAccount = () => {
  return clients.get("/api/users/iam");
};
export const updateAccount = (data: ProfileFormType) => {
  return clients.post("/api/users/account", JSON.stringify(data));
};
