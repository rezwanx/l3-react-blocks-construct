import { useGlobalMutation } from 'state/query-client/hooks';
import { getUsers, IamData } from '../services/user-service';

export interface GetUsersPayload {
  page: number;
  pageSize: number;
  //   projectKey: string;
}

export interface GetUsersResponse {
  data: IamData[];
  totalCount: number;
}

export const useGetUsersMutation = () => {
  return useGlobalMutation<GetUsersResponse, Error, GetUsersPayload>({
    mutationKey: ['getUsers'],
    mutationFn: getUsers,
    onError: (error) => {
      console.error('Failed to fetch users:', error);
    },
  });
};
