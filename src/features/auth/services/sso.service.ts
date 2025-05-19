import { clients } from 'lib/https';
import {
  IGetSocialLoginEndpointPayload,
  IGetSocialLoginEndpointResponse,
  ISigninBySSOPayload,
  ISigninBySSOResponse,
} from 'constant/sso';

export class OAuthervice {
  getSocialLoginEndpoint(
    payload: IGetSocialLoginEndpointPayload
  ): Promise<IGetSocialLoginEndpointResponse> {
    return clients.post(`/authentication/v1/OAuth/GetSocialLogInEndPoint`, JSON.stringify(payload));
  }

  signinBySSO(payload: ISigninBySSOPayload): Promise<ISigninBySSOResponse> {
    const body = new URLSearchParams();
    body.append('grant_type', 'social');
    body.append('code', payload.code);
    body.append('state', payload.state);

    return clients.post('/authentication/v1/OAuth/Token', body, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  }
}

export const oauthService = new OAuthervice();
