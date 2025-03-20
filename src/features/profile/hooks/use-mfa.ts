import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalMutation, useGlobalQuery } from 'state/query-client/hooks';
import {
  configurationMFASave,
  generateOTP,
  getConfigurationMFA,
  getVerifyOTP,
  manageUserMFA,
  VerifyOTP,
} from '../services/mfa.services';
import { useToast } from 'hooks/use-toast';

export const useGetConfigurationMfa = () => {
  return useGlobalQuery({
    queryKey: ['getConfigurationMFA'],
    queryFn: getConfigurationMFA,
  });
};

export const useSaveMfaConfiguration = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useGlobalMutation({
    mutationKey: ['configurationMFASave'],
    mutationFn: configurationMFASave,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getConfigurationMFA'] });
      toast({
        color: 'blue',
        title: 'MFA Configuration Saved',
        description: 'Multi-factor authentication has been successfully enabled for the user.',
      });
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Failed to Save MFA Configuration',
        description:
          error?.error?.message ?? 'An error occurred while saving MFA settings. Please try again.',
      });
    },
  });
};

export const useGenerateOTP = () => {
  return useGlobalMutation({
    mutationKey: ['generateOTP'],
    mutationFn: (userId: string) => generateOTP({ userId }),
  });
};

// export const useGetVerifyOTP = () => {
//   return useGlobalQuery({
//     queryKey: ['getVerifyOTP'],
//     queryFn: getVerifyOTP,
//   });
// };

// export const useGetVerifyOTP = (queryParams: VerifyOTP) => {
//   return useGlobalQuery({
//     queryKey: ['getVerifyOTP', queryParams], // Include queryParams in the queryKey
//     queryFn: getVerifyOTP,
//   });
// };
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
      queryClient.invalidateQueries({ queryKey: ['getConfigurationMFA'] });
      toast({
        color: 'blue',
        title: 'User MFA Managed Successfully',
        description: 'Multi-factor authentication settings have been updated successfully.',
      });
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
