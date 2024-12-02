import { useMutation, useQuery } from "@tanstack/react-query";
import { getAccount, updateAccount } from "../services/accounts.service";
import { useToast } from "@/hooks/use-toast";

export const useGetAccount = () => {
  return useQuery({
    queryKey: ["getAccount"],
    queryFn: getAccount,
  });
};
export const useUpdateAccount = () => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: ["updateAccount"],
    mutationFn: updateAccount,
    onSuccess: () => {
      toast({
        color: "blue",
        title: "Sucesss",
        description: "Profile sucessfully updated",
      });
    },
  });
};
