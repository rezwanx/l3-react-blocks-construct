import { useMutation } from "@tanstack/react-query";
import { accountActivation, signin } from "../services/auth.service";
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

export const useAccountActivation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["accountActivation"],
    mutationFn: accountActivation,
    onSuccess: () => {
      toast({
        color: "blue",
        title: "Sucesss",
        description: "You are sucessfully acctivated your account",
      });
    },
    onError: ({
      error: { error },
    }: {
      error: { error: { errors: { Code: string } } };
    }) => {
      toast({
        variant: "destructive",
        color: "blue",
        title: "Error",
        description: error?.errors?.Code,
      });
    },
  });
};
