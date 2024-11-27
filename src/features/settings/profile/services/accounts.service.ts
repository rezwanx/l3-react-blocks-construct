import { clients } from "@/lib/https";

export const getAccount = () => {
  return clients.get("/api/users/iam");
};
