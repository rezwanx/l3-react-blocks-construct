// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { SocialAuthProvider } from 'constant/sso';
// import { SSOservice } from '../../services/sso.service';
// import { Button } from 'components/ui/button';

// const safeJsonParse = async (response: Response) => {
//   try {
//     if (!response || !response.text) {
//       return { error: 'Invalid response object' };
//     }

//     const text = await response.text();

//     if (!text || text.trim() === '') {
//       return { error: 'Empty response received' };
//     }

//     try {
//       return JSON.parse(text);
//     } catch (parseError) {
//       console.error('JSON parse error:', parseError);
//       return {
//         error: 'Invalid JSON response',
//         rawResponse: text,
//       };
//     }
//   } catch (error) {
//     console.error('Response handling error:', error);
//     return { error: 'Failed to process response' };
//   }
// };

// type SSOSigninCardProps = {
//   providerConfig: SocialAuthProvider;
// };

// const SSOSigninCard = ({ providerConfig }: SSOSigninCardProps) => {
//   const ssoService = new SSOservice();
//   const modifiedSSOService = {
//     ...ssoService,
//     getSocialLoginEndpoint: async (payload: any) => {
//       try {
//         const rawResponse = await fetch(
//           `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/authentication/v1/OAuth/GetSocialLogInEndPoint`,
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//           }
//         );

//         return await safeJsonParse(rawResponse);
//       } catch (error) {
//         console.error('Request failed:', error);
//         return { error: 'Failed to make request' };
//       }
//     },
//   };

//   const onClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     console.log('Button clicked!');
//     e.preventDefault(); // Prevent any default form submission behavior if button is inside a form

//     try {
//       if (!providerConfig.audience || !providerConfig.provider) {
//         console.log('Something went wrong: Missing audience or provider');
//         console.log('Current providerConfig:', providerConfig);
//         return;
//       }

//       console.log('Sending request with params:', {
//         provider: providerConfig.provider,
//         audience: providerConfig.audience,
//         sendAsResponse: true,
//       });

//       try {
//         console.log('About to call getSocialLoginEndpoint...');
//         const res = await modifiedSSOService.getSocialLoginEndpoint({
//           provider: providerConfig.provider,
//           audience: providerConfig.audience,
//           sendAsResponse: true,
//         });

//         console.log('Response received:', res);

//         if (res?.error) {
//           console.log('Error in response:', res.error);
//           return;
//         }

//         if (!res?.providerUrl) {
//           console.log('No redirect URL provided in response');
//           return;
//         }

//         console.log('Redirecting to:', res.providerUrl);
//         window.location.href = res.providerUrl;
//       } catch (apiError) {
//         console.error('API call failed:', apiError);
//         console.log('Response might be empty or not valid JSON');
//       }
//     } catch (error) {
//       console.error('General error:', error);
//     }
//   };

//   return (
//     <button
//       className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 p-2 hover:bg-gray-100"
//       onClick={onClickHandler}
//       aria-label={`Sign in with ${providerConfig.label}`}
//     >
//       <img src={providerConfig.imageSrc} alt={`${providerConfig.label} logo`} className="h-5 w-5" />
//     </button>
//   );
// };

// export default SSOSigninCard;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SocialAuthProvider } from 'constant/sso';
import { SSOservice } from '../../services/sso.service';

// You can remove this function since your SSOservice already handles JSON parsing
const safeJsonParse = async (response: Response) => {
  try {
    if (!response || !response.text) {
      return { error: 'Invalid response object' };
    }

    const text = await response.text();

    if (!text || text.trim() === '') {
      return { error: 'Empty response received' };
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return {
        error: 'Invalid JSON response',
        rawResponse: text,
      };
    }
  } catch (error) {
    console.error('Response handling error:', error);
    return { error: 'Failed to process response' };
  }
};

type SSOSigninCardProps = {
  providerConfig: SocialAuthProvider;
};

const SSOSigninCard = ({ providerConfig }: SSOSigninCardProps) => {
  // Use the original service directly - no need to modify it
  const ssoService = new SSOservice();

  const onClickHandler = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (!providerConfig?.audience || !providerConfig?.provider) {
        console.error('Missing required provider config:', {
          audience: providerConfig?.audience,
          provider: providerConfig?.provider,
          fullConfig: providerConfig,
        });
        alert('Provider configuration is incomplete. Please check the setup.');
        return;
      }

      const requestPayload = {
        provider: providerConfig.provider,
        audience: providerConfig.audience,
        sendAsResponse: true,
      };

      const res = await ssoService.getSocialLoginEndpoint(requestPayload);
      if (!res.error) return alert(`Authentication error: ${res.error}`);

      if (!res?.providerUrl)
        return alert('No redirect URL received from the authentication service.');

      window.location.href = res.providerUrl;
    } catch (error) {
      console.error('=== UNEXPECTED ERROR ===');
      console.error('Error details:', error);
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded border border-gray-300 p-2 hover:bg-gray-100"
      onClick={onClickHandler}
      aria-label={`Sign in with ${providerConfig.label}`}
    >
      <img src={providerConfig.imageSrc} alt={`${providerConfig.label} logo`} className="h-5 w-5" />
    </button>
  );
};

export default SSOSigninCard;
