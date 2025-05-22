/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginOption, SOCIAL_AUTH_PROVIDERS } from 'constant/sso';
import { GRANT_TYPES } from 'constant/auth';
import SSOSigninCard from 'features/auth/components/sso-signin-card/sso-signin-card';
import { Divider } from '../signup/signup-page';

type SsoSigninProps = {
  loginOption: LoginOption;
};

export const SsoSignin = ({ loginOption }: SsoSigninProps) => {
  const socialGrantAllowed = loginOption?.allowedGrantTypes?.includes(GRANT_TYPES.social);

  if (!socialGrantAllowed) {
    return null;
  }

  const allProviders = Object.values(SOCIAL_AUTH_PROVIDERS).map((provider) => {
    const ssoInfo = loginOption.ssoInfo?.find((s) => s.provider === provider.value);

    return {
      ...provider,
      audience: ssoInfo?.audience || '',
      provider: ssoInfo?.provider || provider.value,
      isAvailable: !!ssoInfo,
    };
  });

  if (allProviders.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-6">
        <Divider text="Or" />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex w-full items-center gap-4">
          {allProviders.map((item) => (
            <SSOSigninCard key={item?.value} providerConfig={item} />
          ))}
        </div>
      </div>
    </>
  );
};
