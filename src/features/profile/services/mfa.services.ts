import { clients } from 'lib/https';

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
  projectKey: string;
};

export type VerifyOTP = {
  verificationCode: string;
  twoFactorId: string;
  authType: number;
  projectKey: string;
};

export type GenerateOTP = {
  userId: string;
  projectKey: string;
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

export const generateOTP = async (generateOtp: GenerateOTP): Promise<GenerateOTP> => {
  const res = await clients.post<{ data: GenerateOTP }>(
    '/mfa/v1/MfaManagement/GenerateOTP',
    JSON.stringify(generateOtp)
  );
  return res.data;
};

export const getVerifyOTP = async (): Promise<VerifyOTP> => {
  const res = await clients.get<{ data: VerifyOTP }>('/mfa/v1/MfaManagement/VerifyOTP');
  return res.data;
};

export const manageUserMFA = async (payload: ManageUserMFA): Promise<ManageUserMFA> => {
  const res = await clients.post<{ data: ManageUserMFA }>(
    '/mfa/v1/MfaManagement/ManageUserMFA',
    JSON.stringify(payload)
  );
  return res.data;
};
