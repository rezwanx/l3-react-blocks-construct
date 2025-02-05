// import { useGlobalMutation } from 'state/query-client/hooks';
// import { getUsers, IamData } from '../services/user-service';

// export interface UserFilter {
//   email?: string;
//   name?: string;
// }

// export interface GetUsersPayload {
//   page: number;
//   pageSize: number;
//   filter?: UserFilter;
// }

// export interface GetUsersResponse {
//   data: IamData[];
//   totalCount: number;
// }

// export const useGetUsersMutation = () => {
//   return useGlobalMutation<GetUsersResponse, Error, GetUsersPayload>({
//     mutationKey: ['getUsers'],
//     mutationFn: getUsers,
//     onError: (error) => {
//       console.error('Failed to fetch users:', error);
//     },
//   });
// };

import { useGlobalQuery } from 'state/query-client/hooks';
import { getUsers, IamData } from '../services/user-service';

export interface UserFilter {
  email?: string;
  name?: string;
}

export interface GetUsersPayload {
  page: number;
  pageSize: number;
  filter?: UserFilter;
}

export interface GetUsersResponse {
  data: IamData[];
  totalCount: number;
}

export const useGetUsersQuery = (payload: GetUsersPayload) => {
  return useGlobalQuery<GetUsersResponse>({
    queryKey: ['getUsers', payload],
    queryFn: () => getUsers(payload),
  });
};
