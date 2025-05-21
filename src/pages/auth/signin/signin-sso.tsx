/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LoginOption,
  SOCIAL_AUTH_PROVIDERS,
  SocialAuthProvider,
  SSO_PROVIDERS,
} from 'constant/sso';
import { GRANT_TYPES } from 'constant/auth';
import SSOSigninCard from 'features/auth/components/sso-signin-card/sso-signin-card';

type SsoSigninProps = {
  loginOption: LoginOption;
};

export const SsoSignin = ({ loginOption }: SsoSigninProps) => {
  const socialGrantAllowed = loginOption?.allowedGrantTypes?.includes(GRANT_TYPES.social);
  if (!socialGrantAllowed) {
    return null;
  }

  if (!loginOption || !loginOption.ssoInfo) {
    return null;
  }

  const filteredProviders = Object.values(SOCIAL_AUTH_PROVIDERS)
    .map((provider) => {
      const sso = loginOption.ssoInfo?.find((s) => s.provider === provider.value);
      if (!sso) return null;

      return {
        ...provider,
        audience: sso.audience,
        provider: sso.provider,
      };
    })
    .filter(Boolean);

  const providers = filteredProviders as Array<
    SocialAuthProvider & {
      audience: string;
      provider: SSO_PROVIDERS;
    }
  >;

  if (providers.length === 0) {
    return null;
  }

  return (
    <>
      <div className="my-2 mb-4 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-xs text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="flex items-center gap-8">
        <div className="flex w-full items-center gap-4">
          {providers.map((item) => (
            <SSOSigninCard key={item?.value} providerConfig={item} />
          ))}
        </div>
      </div>
    </>
  );
};
