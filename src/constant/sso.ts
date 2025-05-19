export enum SSO_PROVIDERS {
  google = 'google',
  microsoft = 'microsoft',
  github = 'github',
  linkedin = 'linkedin',
}

export interface IGetSocialLoginEndpointPayload {
  provider: SSO_PROVIDERS;
  audience: string;
  nextUrl?: string;
  sendAsResponse: boolean;
}
export interface IGetSocialLoginEndpointResponse {
  error: unknown;
  isAResponse: boolean;
  providerUrl: string;
}
export interface ISigninBySSOPayload {
  code: string;
  state: string;
}
export interface ISigninBySSOResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}
