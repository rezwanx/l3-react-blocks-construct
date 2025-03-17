import { useQueryClient } from '@tanstack/react-query';
import { useGlobalMutation, useGlobalQuery } from 'state/query-client/hooks';
import { ConfigurationMFASave, getConfigurationMFA } from '../services/mfa.services';
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
    mutationKey: ['ConfigurationMFASave'],
    mutationFn: ConfigurationMFASave,
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
