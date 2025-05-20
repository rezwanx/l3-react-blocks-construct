import { SigninForm } from 'features/auth/components/signin-form';
import { Link } from 'react-router-dom';
import darklogo from 'assets/images/construct_logo_dark.svg';
import lightlogo from 'assets/images/construct_logo_light.svg';
import { useTheme } from 'components/core/theme-provider';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LoginOption, SSO_PROVIDERS } from 'constant/sso';
import { GRANT_TYPES } from 'constant/auth';

// const getLoginOption = async () => {
//   const key = process.env.REACT_APP_PUBLIC_X_BLOCKS_KEY;
//   const appUrl = process.env.REACT_APP_PUBLIC_BACKEND_URL;

//   if (!key || !appUrl) return null;

//   const headers = {
//     'X-Blocks-Key': key,
//     origin: appUrl,
//   };

//   const res = await fetch(
//     `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/identifier/v1/Project/GetLoginOptions`,
//     {
//       method: 'GET',
//       headers,
//       cache: 'no-cache',
//     }
//   );

//   return res.json();
// };

export const getLoginOption = async (): Promise<LoginOption | null> => {
  try {
    const response = await (
      await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/authentication/v1/OAuth/GetLoginOption`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        { method: 'GET', headers: { 'X-Blocks-Key': process.env.REACT_APP_PUBLIC_X_BLOCKS_KEY } }
      )
    ).json();

    return JSON.parse(response);
  } catch (error) {
    console.error('Error fetching login options:', error);
    return null;
  }
};

export function SigninPage() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [, setLoginOption] = useState<any>(null);

  useEffect(() => {
    getLoginOption().then(setLoginOption);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="w-32 h-14 mb-2">
        <img src={theme == 'dark' ? darklogo : lightlogo} className="w-full h-full" alt="logo" />
      </div>
      <div>
        <div className="text-2xl font-bold text-high-emphasis">{t('LOG_IN')}</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm font-normal text-medium-emphasis">{t('DONT_HAVE_ACCOUNT')}</span>
          <Link
            to={'/signup'}
            className="text-sm font-bold text-primary hover:text-primary-600 hover:underline"
          >
            {t('SIGN_UP')}
          </Link>
        </div>
      </div>
      <div className="w-full invisible h-0">
        <div className="rounded-lg bg-success-background border border-success p-4">
          <p className="text-xs font-normal text-success-high-emphasis">
            <span className="font-semibold">demo.construct@seliseblocks.com</span> with password:{' '}
            <span className="font-semibold">H%FE*FYi5oTQ!VyT6TkEy</span>
          </p>
        </div>
      </div>
      <SigninForm
        loginOption={{
          allowedGrantTypes: [GRANT_TYPES.password, GRANT_TYPES.social],
          ssoInfo: [
            { provider: SSO_PROVIDERS.google, audience: 'https://dev-construct.selisblocks.com' },
          ],
        }}
      />
    </div>
  );
}
