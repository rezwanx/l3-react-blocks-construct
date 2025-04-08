import { clients } from 'lib/https';
import API_CONFIG from '../../../config/api';
import { GenerateOTPResponse, ManageUserMFA, VerifyOTP } from '../types/mfa.types';

/**
 * Generates a One-Time Password (OTP) for the user.
 *
 * @param {Object} params - The parameters for generating OTP.
 * @param {string} params.userId - The user ID for whom the OTP is to be generated.
 *
 * @returns {Promise<GenerateOTPResponse>} A promise that resolves with the OTP generation response.
 *
 * @throws {Error} If the request fails or the server returns an error.
 *
 * @example
 * const otpResponse = await generateOTP({ userId: '12345' });
 */

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

/**
 * Verifies the OTP provided by the user.
 *
 * @param {Object} context - The context containing the query key with OTP verification parameters.
 * @param {Array} context.queryKey - The query key which includes the OTP verification parameters.
 * @param {VerifyOTP} context.queryKey[1] - The OTP verification parameters.
 *
 * @returns {Promise<any>} A promise that resolves with the OTP verification response.
 *
 * @throws {Error} If the request fails or the server returns an error.
 *
 * @example
 * const verificationResponse = await getVerifyOTP({ queryKey: ['getVerifyOTP', { otp: '123456', userId: '12345' }] });
 */
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

/**
 * Manages the Multi-Factor Authentication (MFA) settings for the user.
 *
 * @param {ManageUserMFA} payload - The payload containing the MFA management details.
 * @param {string} payload.userId - The user ID whose MFA settings are to be managed.
 * @param {boolean} payload.enableMFA - Whether MFA should be enabled or disabled.
 *
 * @returns {Promise<ManageUserMFA>} A promise that resolves with the updated MFA settings.
 *
 * @throws {Error} If the request fails or the server returns an error.
 *
 * @example
 * const mfaResponse = await manageUserMFA({ userId: '12345', enableMFA: true });
 */
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
