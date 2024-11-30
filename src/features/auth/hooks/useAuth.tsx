import { useMutation } from "@tanstack/react-query";
import { signin } from "../services/auth.service";
import { useToast } from "@/hooks/use-toast";

export const useSigninMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["signin"],
    mutationFn: signin,
    onSuccess: () => {
      toast({
        color: "blue",
        title: "Sucesss",
        description: "You are sucessfully logged in",
      });
    },
    onError: ({ error }: { error: { errorBody: { error: string } } }) => {
      toast({
        variant: "destructive",
        color: "blue",
        title: "Error",
        description: error.errorBody.error,
      });
    },
  });
};
