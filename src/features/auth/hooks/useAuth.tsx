import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../services/auth.service";
import { useToast } from "@/hooks/use-toast";

export const useAuth = () => {
  const [isLoggedIn] = useState(false);

  const signin = async (values: { email: string; password: string }) => {};

  return {
    isLoggedIn,
    signin,
  };
};

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
  });
};
