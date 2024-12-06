import { useQueryClient } from "@tanstack/react-query";
import { getAccount, updateAccount } from "../services/accounts.service";
import { useToast } from "@/hooks/use-toast";
import { useGlobalMutation, useGlobalQuery } from "@/state/query-client/hooks";

export const useGetAccount = () => {
  return useGlobalQuery({
    queryKey: ["getAccount"],
    queryFn: getAccount,
  });
};
export const useUpdateAccount = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useGlobalMutation({
    mutationKey: ["updateAccount"],
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAccount"] });
      toast({
        color: "blue",
        title: "Sucesss",
        description: "Profile sucessfully updated",
      });
    },
  });
};
