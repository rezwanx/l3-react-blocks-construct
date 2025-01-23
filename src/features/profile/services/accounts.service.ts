import { clients } from 'lib/https';
import { User } from 'types/user.type';
import { ProfileFormType } from '../utils/utils';

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
