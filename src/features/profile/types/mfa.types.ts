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

export type GenerateOTPResponse = {
  imageUri: string;
  twoFactorId: string;
  isSuccess: boolean;
  errors?: Record<string, string>;
};
