import { useLayoutEffect } from 'react';
import { redirect, useSearchParams } from 'react-router-dom';
import { useAuthState } from 'state/client-middleware';
import { ResetpasswordForm } from 'features/auth/components/reset-password';
import { useTranslation } from 'react-i18next';

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') ?? '';
  const { isMounted, isAuthenticated } = useAuthState();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    if (isAuthenticated) redirect('/');
  }, [isAuthenticated]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-6 mb-4">
      <div>
        <div className="text-2xl font-bold text-high-emphasis">{t('RESET_PASSWORD')}</div>
        <div className="flex gap-1 mt-1">
          <div className="text-sm font-normal text-medium-emphasis">
            {t('CHOOSE_PASSWORD_SECURE_ACCOUNT')}
          </div>
        </div>
      </div>

      <ResetpasswordForm code={code} />
    </div>
  );
}
