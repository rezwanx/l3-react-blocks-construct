import {
  DefaultError,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGlobalQuery = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  option: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  const router = useRouter();
  const { error, ...rest } = useQuery(option);
  if (
    (error as { error: { error: string } })?.error?.error ===
    "invalid_refresh_token"
  ) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.replace("/signin");
  }
  return { error, ...rest };
};

export const useGlobalMutation = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>(
  option: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  return useMutation(option);
};
