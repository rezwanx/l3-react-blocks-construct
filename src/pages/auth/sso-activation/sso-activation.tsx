import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSigninMutation } from 'features/auth/hooks/use-auth';
import { useCallback, useEffect, useRef } from 'react';
import { useAuthStore } from 'state/store/auth';
import { useToast } from 'hooks/use-toast';
import { useTranslation } from 'react-i18next';

export function SsoActivationPage() {
  const { t } = useTranslation();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isFirstTimeCall = useRef<boolean>(true);
  const { mutateAsync } = useSigninMutation();
  const [searchParams] = useSearchParams();

  const signin = useCallback(
    async (code: string, state: string) => {
      const res = await mutateAsync({ grantType: 'social', code, state });
      login(res.access_token, res.refresh_token);
      navigate('/');
      toast({
        variant: 'success',
        title: t('SUCCESS'),
        description: t('LOGIN_SUCCESSFULLY'),
      });
    },
    [login, mutateAsync, navigate, t, toast]
  );

  useEffect(() => {
    const state = searchParams.get('state');
    const code = searchParams.get('code');
    if (code && state && isFirstTimeCall.current) {
      isFirstTimeCall.current = false;
      signin(code, state);
    }
  }, [searchParams, signin]);

  return null;
}
