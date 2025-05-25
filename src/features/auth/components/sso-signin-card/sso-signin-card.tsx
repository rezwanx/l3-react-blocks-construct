/* eslint-disable @typescript-eslint/no-unused-vars */
import { SocialAuthProvider, SSO_PROVIDERS } from 'constant/sso';
import { SSOservice } from '../../services/sso.service';
import { Button } from 'components/ui/button';

type SSOSigninCardProps = {
  providerConfig: SocialAuthProvider & {
    audience: string;
    provider: SSO_PROVIDERS;
    isAvailable: boolean;
  };
};

const SSOSigninCard = ({ providerConfig }: SSOSigninCardProps) => {
  const ssoService = new SSOservice();

  const onClickHandler = async (e: React.MouseEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (!providerConfig.isAvailable) {
        return;
      }

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

      if (res.error) return alert(`Authentication error: ${res.error}`);

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
    <Button
      variant="outline"
      className="w-[25%] h-12"
      onClick={onClickHandler}
      disabled={!providerConfig.isAvailable}
      data-state={providerConfig.isAvailable ? 'enabled' : 'disabled'}
    >
      <img
        src={providerConfig.imageSrc}
        width={20}
        height={20}
        alt={`${providerConfig.label} logo`}
        className={!providerConfig.isAvailable ? 'opacity-50' : ''}
      />
    </Button>
  );
};

export default SSOSigninCard;
