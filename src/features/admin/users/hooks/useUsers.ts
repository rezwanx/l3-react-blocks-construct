import { useMutation } from "@tanstack/react-query";
import { getUsers } from "../services/user.service";

export const useGetUsers = () => {
  return useMutation({
    mutationKey: ["getAccount"],
    mutationFn: getUsers,
  });
};
