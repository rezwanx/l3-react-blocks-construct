import { clients } from 'lib/https';
import { User } from 'types/user.type';
import { ProfileFormType } from '../utils/utils';
import API_CONFIG from '../../../config/api';

export const getAccount = async (): Promise<User> => {
  const res = await clients.get<{ data: User }>('/iam/v1/User/GetAccount');
  return res.data;
};

export const updateAccount = (data: ProfileFormType) => {
  return clients.post<{
    itemId: string;
    errors: unknown;
    isSuccess: boolean;
  }>('/iam/v1/user/UpdateAccount', JSON.stringify(data));
};

export const changePassword = async ({
  newPassword,
  oldPassword,
}: {
  newPassword: string;
  oldPassword: string;
}) => {
  const payload = {
    newPassword,
    oldPassword,
    projectKey: API_CONFIG.blocksKey,
  };

  return clients.post('/iam/v1/Account/ChangePassword', JSON.stringify(payload));
};
