import { useSearchParams } from 'react-router-dom';
import { useSigninMutation } from 'features/auth/hooks/use-auth';
import { useCallback, useEffect, useRef } from 'react';

export function SsoActivationPage() {
  const isFirstTimeCall = useRef<boolean>(true);
  const { mutateAsync } = useSigninMutation();
  const [searchParams] = useSearchParams();

  const signin = useCallback(
    async (code: string, state: string) => {
      const res = await mutateAsync({ grantType: 'social', code, state });
      console.log(res);
      // login(res.access_token, res.refresh_token);
      //   navigate('/');
      //   toast({
      //     variant: 'success',
      //     title: t('SUCCESS'),
      //     description: t('LOGIN_SUCCESSFULLY'),
      //   });
    },
    [mutateAsync]
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
