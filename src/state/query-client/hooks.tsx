import {
  DefaultError,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export const useGlobalQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  queryKey,
  queryFn,
}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) => {
  return useQuery({ queryKey, queryFn });
};

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
