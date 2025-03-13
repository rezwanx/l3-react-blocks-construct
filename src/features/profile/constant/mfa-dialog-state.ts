export const MFA_DIALOG_STATES = {
  NONE: 'none',
  TWO_FACTOR_SETUP: 'two-factor-setup',
  AUTHENTICATOR_APP_SETUP: 'authenticator-app-setup',
  MANAGE_TWO_FACTOR_AUTHENTICATION: 'manage-two-factor-authentication',
  EMAIL_VERIFICATION: 'email-verification',
} as const;

export type MFA_DIALOG_STATE = (typeof MFA_DIALOG_STATES)[keyof typeof MFA_DIALOG_STATES];
