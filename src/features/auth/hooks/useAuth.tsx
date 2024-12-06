import { useMutation } from "@tanstack/react-query";
import { accountActivation, signin } from "../services/auth.service";
import { useToast } from "@/hooks/use-toast";
import { useGlobalMutation } from "@/state/query-client/hooks";

export const useSigninMutation = () => {
  const { toast } = useToast();

  return useGlobalMutation({
    mutationKey: ["signin"],
    mutationFn: signin,
    onSuccess: () => {
      toast({
        color: "blue",
        title: "Sucesss",
        description: "You are sucessfully logged in",
      });
    },
    onError: ({
      error,
    }: {
      status: number;
      error: { error: string; error_description: string };
    }) => {
      toast({
        variant: "destructive",
        color: "blue",
        title: "Error",
        description: error.error,
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
