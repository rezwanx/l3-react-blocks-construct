import { useQuery } from "@tanstack/react-query";
import { getAccount } from "../services/accounts.service";

export const useGetAccount = () => {
  return useQuery({
    queryKey: ["getAccount"],
    queryFn: getAccount,
  });
};
