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

export const getConfigurationMFA = async (): Promise<ConfigMfa> => {
  const res = await clients.get<{ data: ConfigMfa }>('/mfa/v1/Configuration/Get');
  return res.data;
};

export const ConfigurationMFASave = async (configMfa: ConfigMfa): Promise<ConfigMfa> => {
  const res = await clients.post<{ data: ConfigMfa }>(
    '/mfa/v1/Configuration/Save',
    JSON.stringify(configMfa)
  );
  return res.data;
};
