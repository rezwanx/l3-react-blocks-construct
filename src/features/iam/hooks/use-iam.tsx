import { useGlobalQuery } from 'state/query-client/hooks';
import { getUsers, IamData, getRoles, RoleData } from '../services/user-service';

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
  return useGlobalQuery({
    queryKey: ['getUsers', payload.page, payload.pageSize, payload.filter],
    queryFn: () => getUsers(payload),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
};

export interface RoleSort {
  property: string;
  isDescending: boolean;
}

export interface RoleFilter {
  search?: string;
}

export interface GetRolesPayload {
  page: number;
  pageSize: number;
  sort?: RoleSort;
  filter?: RoleFilter;
  projectKey?: string;
}

export interface GetRolesResponse {
  data: RoleData[];
  totalCount: number;
}

export const useGetRolesQuery = (payload: GetRolesPayload) => {
  return useGlobalQuery({
    queryKey: [
      'getRoles',
      payload.page,
      payload.pageSize,
      payload.filter,
      payload.sort,
      payload.projectKey,
    ],
    queryFn: () => getRoles(payload),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });
};
