import { clients } from 'lib/https';
import { User } from 'types/user.type';
import { ProfileFormType } from '../utils/utils';
import API_CONFIG from '../../../config/api';

export const getAccount = async () => {
  const res = (await clients.get('/iam/v1/User/GetAccount')) as { data: User };
  return res.data;
};

export const updateAccount = (data: ProfileFormType) => {
  return clients.post<{
    itemId: string;
    errors: unknown | null;
    isSuccess: boolean;
  }>('/iam/v1/user/UpdateAccount', JSON.stringify(data));
};

export const changePassword = async ({
  newPassword,
  currentPassword,
}: {
  newPassword: string;
  currentPassword: string;
}) => {
  const payload = {
    newPassword,
    currentPassword,
    projectKey: API_CONFIG.blocksKey,
  };

  const url = '/iam/v1/Account/ChangePassword';
  return clients.post(url, JSON.stringify(payload));
};
