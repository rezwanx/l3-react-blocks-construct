import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useGlobalMutation } from 'state/query-client/hooks';
import { generateOTP, getVerifyOTP, manageUserMFA } from '../services/mfa.services';
import { useToast } from 'hooks/use-toast';
import { VerifyOTP } from '../types/mfa.types';

/**
 * Custom hook to generate an OTP (One-Time Password) for the user.
 * It uses a global mutation to request the OTP generation.
 *
 * @returns {Object} The mutation result for generating OTP.
 *
 * @example
 * const { mutate } = useGenerateOTP();
 * mutate(userId);
 */
export const useGenerateOTP = () => {
  return useGlobalMutation({
    mutationKey: ['generateOTP'],
    mutationFn: (userId: string) => generateOTP({ userId }),
  });
};

/**
 * Custom hook to verify the OTP entered by the user.
 * It uses a mutation to verify the OTP with the provided query parameters.
 *
 * @returns {Object} The mutation result for verifying OTP.
 *
 * @example
 * const { mutate } = useGetVerifyOTP();
 * mutate({ userId, otp });
 */
export const useGetVerifyOTP = () => {
  return useMutation({
    mutationFn: (queryParams: VerifyOTP) =>
      getVerifyOTP({ queryKey: ['getVerifyOTP', queryParams] }),
  });
};

/**
 * Custom hook to manage the Multi-Factor Authentication (MFA) for the user.
 * It uses a global mutation to enable or disable MFA for the user.
 * On success, it invalidates the account query cache.
 *
 * @returns {Object} The mutation result for managing MFA.
 *
 * @example
 * const { mutate } = useManageUserMFA();
 * mutate({ userId, mfaEnabled, userMfaType });
 */
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
