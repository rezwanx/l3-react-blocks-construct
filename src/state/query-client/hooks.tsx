import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

export const useGlobalMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>({
  mutationKey,
  mutationFn,
  onSuccess,
  onError,
}: UseMutationOptions<TData, TError, TVariables, TContext>) => {
  return useMutation({ mutationKey, mutationFn, onSuccess, onError });
};
