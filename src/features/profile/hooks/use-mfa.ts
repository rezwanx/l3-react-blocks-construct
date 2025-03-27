import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalMutation } from 'state/query-client/hooks';
import {
  generateOTP,
  getVerifyOTP,
  manageUserMFA,
} from '../services/mfa.services';
import { useToast } from 'hooks/use-toast';
import { VerifyOTP } from '../types/mfa.types';

export const useGenerateOTP = () => {
  return useGlobalMutation({
    mutationKey: ['generateOTP'],
    mutationFn: (userId: string) => generateOTP({ userId }),
  });
};

export const useGetVerifyOTP = () => {
  return useMutation({
    mutationFn: (queryParams: VerifyOTP) =>
      getVerifyOTP({ queryKey: ['getVerifyOTP', queryParams] }),
  });
};

export const useManageUserMFA = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useGlobalMutation({
    mutationKey: ['manageUserMFA'],
    mutationFn: manageUserMFA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAccount'] });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to Manage User MFA',
        description:
          error?.error?.message ?? 'An error occurred while managing user MFA. Please try again.',
      });
    },
  });
};
