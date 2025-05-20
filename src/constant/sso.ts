import { GRANT_TYPES } from './auth';
import microsoftIcon from 'assets/images/social_media_ms.svg';
import googleIcon from 'assets/images/social_media_google.svg';

export enum SSO_PROVIDERS {
  google = 'google',
  microsoft = 'microsoft',
}

export const SOCIAL_AUTH_PROVIDERS: Record<SSO_PROVIDERS, SocialAuthProvider> = {
  google: {
    value: SSO_PROVIDERS.google,
    label: 'Google',
    description: 'Allow your users to seamlessly log in with their trusted Google Account.',
    icon: 'google-icon',
    imageSrc: googleIcon,
    isAvailable: true,
    isConfigured: false,
    configurations: null,
  },
  microsoft: {
    value: SSO_PROVIDERS.microsoft,
    label: 'Microsoft',
    description: 'Enable your users to securely sign in through their trusted Microsoft Account.',
    icon: 'microsoft-icon',
    imageSrc: microsoftIcon,
    isAvailable: true,
    isConfigured: false,
    configurations: null,
  },
};

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

export type SocialAuthProvider = {
  value: SSO_PROVIDERS;
  label: string;
  description: string;
  icon: string;
  imageSrc: string;
  isAvailable?: boolean;
  isConfigured: boolean;
  configurations: SsoProvider | null;
  audience?: string | null;
  provider?: SSO_PROVIDERS;
};

export type SsoProvider = {
  itemId: string;
  createdDate: string;
  lastUpdatedDate: string;
  createdBy: string;
  language: string;
  lastUpdatedBy: string;
  organizationIds: string[];
  tags: string[];
  provider: string;
  audience: string;
  clientId: string;
  clientSecret: string;
  authorizationUrl: string;
  tokenUrl: string;
  getProfileUrl: string;
  redirectUrl: string;
  scope: string[];
  initialRoles: string[];
  initialPermisssions: string[];
  isDisabled: boolean;
};

export interface ISaveSsoCredentialPayload {
  provider: string;
  audience: string;
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  projectKey: string;
}

export interface ISaveSsoCredentialResponse {
  isSuccess: boolean;
  errors: unknown;
}

export interface IDeleteSsoCredentialPayload {
  itemId: string;
  projectKey: string;
}

export interface IDeleteSsoCredentialResponse {
  isSuccess: boolean;
  errors: unknown;
}
export interface IGetSsoCredentialByIdPayload {
  itemId: string;
  projectKey: string;
}

export type IGetSsoCredentialByIdResponse = SsoProvider;
export interface IGetSsoCredentialsPayload {
  projectKey: string;
}

export type IGetSsoCredentialsResponse = SsoProvider[];

type SSO_INFO = {
  provider: SSO_PROVIDERS;
  audience: string;
};

export type LoginOption = {
  allowedGrantTypes: GRANT_TYPES[];
  ssoInfo: SSO_INFO[];
};
export type IGetProjectLoginOptionResponse = LoginOption;
