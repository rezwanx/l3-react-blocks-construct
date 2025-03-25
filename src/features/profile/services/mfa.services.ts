import { clients } from 'lib/https';
import API_CONFIG from '../../../config/api';
import { GenerateOTPResponse, ManageUserMFA, VerifyOTP } from '../types/mfa.types';


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

export const getVerifyOTP = async (context: { queryKey: [string, VerifyOTP] }): Promise<any> => {
  const [, queryParams] = context.queryKey;
  const stringifiedParams = Object.fromEntries(
    Object.entries(queryParams).map(([key, value]) => [key, String(value)])
  );
  const params = new URLSearchParams(stringifiedParams as Record<string, string>);
  const url = `/mfa/v1/MfaManagement/VerifyOTP?${params.toString()}`;
  const res = await clients.get<any>(url);

  return res;
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
