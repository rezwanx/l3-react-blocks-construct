import { clients } from 'lib/https';
import API_CONFIG from '../../../config/api';

export type ConfigMfa = {
  enableMfa: boolean;
  userMfaTypes: number[];
  mFATemplate: {
    templateName: string;
    templateId: string;
  };
  projectKey: string;
};

export type ManageUserMFA = {
  userId: string;
  mfaEnabled: boolean;
  userMfaType: number;
};

export type VerifyOTP = {
  verificationCode: string;
  twoFactorId: string;
  authType: number;
  projectKey: string;
};

// export type GenerateOTP = {
//   userId: string;
// };

export type GenerateOTPResponse = {
  imageUri: string;
  twoFactorId: string;
  isSuccess: boolean;
  errors?: Record<string, string>;
};

export const getConfigurationMFA = async (): Promise<ConfigMfa> => {
  const res = await clients.get<{ data: ConfigMfa }>('/mfa/v1/Configuration/Get');
  return res.data;
};

export const configurationMFASave = async (configMfa: ConfigMfa): Promise<ConfigMfa> => {
  const res = await clients.post<{ data: ConfigMfa }>(
    '/mfa/v1/Configuration/Save',
    JSON.stringify(configMfa)
  );
  return res.data;
};

export const generateOTP = async ({ userId }: { userId: string }): Promise<GenerateOTPResponse> => {
  const payload = {
    userId,
    projectKey: API_CONFIG.blocksKey,
  };
  const res = await clients.post<GenerateOTPResponse>(
    '/mfa/v1/MfaManagement/GenerateOTP',
    JSON.stringify(payload)
  );
  return res;
};

export const getVerifyOTP = async (): Promise<VerifyOTP> => {
  const res = await clients.get<{ data: VerifyOTP }>('/mfa/v1/MfaManagement/VerifyOTP');
  return {
    ...res.data,
    projectKey: API_CONFIG.blocksKey,
  };
};

export const manageUserMFA = async (payload: ManageUserMFA): Promise<ManageUserMFA> => {
  const manageUserMfaPatload = {
    ...payload,
    projectKey: API_CONFIG.blocksKey,
  };
  const res = await clients.post<{ data: ManageUserMFA }>(
    '/mfa/v1/MfaManagement/ManageUserMFA',
    JSON.stringify(manageUserMfaPatload)
  );
  return res.data;
};
