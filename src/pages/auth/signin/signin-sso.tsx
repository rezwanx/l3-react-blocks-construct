/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  LoginOption,
  SOCIAL_AUTH_PROVIDERS,
  SocialAuthProvider,
  SSO_PROVIDERS,
} from 'constant/sso';
import { GRANT_TYPES } from 'constant/auth';
import SSOSigninCard from 'features/auth/components/sso-signin-card/sso-signin-card';
import { SSOservice } from '/features/auth/services/sso.service';

type SsoSigninProps = {
  loginOption: LoginOption;
};

// export const SsoSignin = ({ loginOption }: SsoSigninProps) => {
//   if (!loginOption || !loginOption.ssoInfo) {
//     return null;
//   }

//   const filteredProviders = Object.values(SOCIAL_AUTH_PROVIDERS)
//     .map((provider) => {
//       const sso = loginOption.ssoInfo?.find((s) => s.provider === provider.value);
//       if (!sso) return null;

//       return {
//         ...provider,
//         audience: sso.audience,
//         provider: sso.provider,
//       };
//     })
//     .filter(Boolean);

//   const providers = filteredProviders as Array<
//     SocialAuthProvider & {
//       audience: string;
//       provider: SSO_PROVIDERS;
//     }
//   >;

//   if (providers.length === 0) {
//     return null;
//   }

//   return (
//     <>
//       {loginOption.allowedGrantTypes?.includes(GRANT_TYPES.password) && (
//         <div className="my-2 mb-4 flex items-center">
//           <hr className="flex-grow border-gray-300" />
//           <span className="mx-2 text-xs text-gray-500">OR</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>
//       )}

//       <div className="flex items-center gap-8">
//         <div className="flex w-full items-center gap-4">
//           {providers.map((item) => (
//             <SSOSigninCard providerConfig={item} key={item.value} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

export const SsoSignin = ({ loginOption }: SsoSigninProps) => {
  // Add additional check for social grant type
  const socialGrantAllowed = loginOption?.allowedGrantTypes?.includes(GRANT_TYPES.social);
  console.log(socialGrantAllowed);
  // // Return early if social grant type is not allowed
  if (!socialGrantAllowed) {
    return null;
  }

  // Also return early if no loginOption or ssoInfo
  if (!loginOption || !loginOption.ssoInfo) {
    return null;
  }

  // Original filtering logic
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

  // Return null if no providers after filtering
  // if (providers.length === 0) {
  //   return null;
  // }

  return (
    <>
      {/* {loginOption.allowedGrantTypes?.includes(GRANT_TYPES.password) && ( */}
      <div className="my-2 mb-4 flex items-center">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-xs text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      {/* )} */}

      <div className="flex items-center gap-8">
        <div className="flex w-full items-center gap-4">
          {Object.values(SOCIAL_AUTH_PROVIDERS).map((item) => (
            <SSOSigninCard providerConfig={item} key={item.value} />
          ))}
        </div>
      </div>
    </>
  );
};
