import API_CONFIG, { getApiUrl } from '../../../config/api';
import { clients, HttpError } from 'lib/https';
import { useAuthStore } from 'state/store/auth';

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  enable_mfa: boolean;
  tofactorId: string;
  mfaType: number;
}

interface AccountActivationData {
  password: string;
  code: string;
}

interface AccountActivationPayload extends AccountActivationData {
  ProjectKey: string;
  preventPostEvent: boolean;
}

export type PasswordSigninPayload = {
  grantType: 'password';
  username: string;
  password: string;
  captchaToken?: string;
};

export type MFASigninPayload = {
  grantType: 'mfa_code';
  code: string;
  two_factor_id: string;
  mfaType: number;
};

export type MFASigninResponse = {
  access_token: string;
  refresh_token: string;
};

export const signin = async <T extends 'password' | 'mfa_code' = 'password'>(
  payload: PasswordSigninPayload | MFASigninPayload
): Promise<T extends 'password' ? SignInResponse : MFASigninResponse> => {
  const url = getApiUrl('/authentication/v1/OAuth/Token');

  // sign in flow
  if (payload.grantType === 'password') {
    const passwordFormData = new URLSearchParams();
    if (payload.grantType === 'password') {
      passwordFormData.append('grant_type', 'password');
      passwordFormData.append('username', payload.username);
      passwordFormData.append('password', payload.password);
    }
    const response = await fetch(url, {
      method: 'POST',
      body: passwordFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-blocks-key': API_CONFIG.blocksKey,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json();
      throw new HttpError(response.status, err);
    }

    return response.json();
  } else {
    // MFA OTP Verification flow
    const mfaFormData = new URLSearchParams();
    mfaFormData.append('grant_type', 'mfa_code');
    mfaFormData.append('code', payload.code || '');
    mfaFormData.append('two_factor_id', payload.two_factor_id);
    mfaFormData.append('mfa_type', payload.mfaType.toString());

    const response = await fetch(url, {
      method: 'POST',
      body: mfaFormData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-blocks-key': API_CONFIG.blocksKey,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const err = await response.json();
      throw new HttpError(response.status, err);
    }

    return response.json();
  }
};

export const signout = async (): Promise<{ isSuccess: true }> => {
  try {
    localStorage.removeItem('auth-storage');
    const url = '/authentication/v1/Authentication/Logout';
    return await clients.post(
      url,
      JSON.stringify({
        refreshToken: useAuthStore.getState().refreshToken,
      })
    );
  } catch (error) {
    console.error('Logout operation failed:', error);
    throw error;
  }
};

export const getRefreshToken = async () => {
  const url = '/authentication/v1/OAuth/Token';
  const formData = new URLSearchParams();
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', useAuthStore.getState().refreshToken ?? '');

  const response = await fetch(`${API_CONFIG.baseUrl}${url}`, {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-blocks-key': API_CONFIG.blocksKey,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const err = await response.json();
    throw new HttpError(response.status, err);
  }

  return response.json();
};

export const accountActivation = async (data: {
  password: string;
  code: string;
  captchaCode: string;
}) => {
  const payload: AccountActivationPayload = {
    ...data,
    ProjectKey: API_CONFIG.blocksKey,
    preventPostEvent: true,
  };

  const url = '/iam/v1/Account/Activate';
  return clients.post(url, JSON.stringify(payload));
};

export const forgotPassword = async (data: { email: string; captchaCode?: string }) => {
  const payload = {
    ...data,
    mailPurpose: 'RecoverAccount',
    ProjectKey: API_CONFIG.blocksKey,
  };

  const url = '/iam/v1/Account/Recover';
  return clients.post(url, JSON.stringify(payload));
};

export const resetPassword = async (data: { code: string; password: string }) => {
  const payload = {
    ...data,
    logoutFromAllDevices: true,
    ProjectKey: API_CONFIG.blocksKey,
  };

  const url = '/iam/v1/Account/ResetPassword';
  return clients.post(url, JSON.stringify(payload));
};

export const resendActivation = async (data: { userId: string }) => {
  const payload = {
    ...data,
    mailPurpose: 'ResendActivation',
  };

  const url = '/iam/v1/Account/ResendActivation';
  return clients.post(url, JSON.stringify(payload));
};

export const logoutAll = async () => {
  const url = '/authentication/v1/Authentication/LogoutAll';
  return clients.post(url, '');
};
