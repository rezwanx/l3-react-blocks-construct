import { getUsers } from './user-service';
import { clients } from '@/lib/https';

// Mock using the same path alias as import
jest.mock('@/lib/https', () => ({
  clients: {
    post: jest.fn(),
  },
}));

// Type the mocked function
const mockedPost = clients.post as jest.MockedFunction<typeof clients.post>;

describe('getUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make API call with correct parameters', async () => {
    const mockResponse = {
      data: [
        {
          itemId: '123',
          createdDate: '2024-02-19T10:00:00Z',
          lastUpdatedDate: '2024-02-19T10:00:00Z',
          lastLoggedInTime: '2024-02-19T09:00:00Z',
          language: 'en',
          salutation: 'Mr',
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@example.com',
          userName: 'johndoe',
          phoneNumber: '+1234567890',
          roles: ['user'],
          permissions: ['read'],
          active: true,
          isVarified: true,
          profileImageUrl: null,
          mfaEnabled: false,
        },
      ],
      totalCount: 1,
    };

    mockedPost.mockImplementation(() => Promise.resolve(mockResponse));

    const payload = {
      page: 1,
      pageSize: 10,
      filter: {
        email: 'test@example.com',
        name: 'John',
      },
    };

    const result = await getUsers(payload);

    expect(mockedPost).toHaveBeenCalledWith(
      '/iam/v1/User/GetUsers',
      JSON.stringify({
        page: 1,
        pageSize: 10,
        filter: {
          email: 'test@example.com',
          name: 'John',
        },
      })
    );

    expect(result).toEqual(mockResponse);
  });

  it('should handle API errors', async () => {
    mockedPost.mockImplementation(() => Promise.reject(new Error('API Error')));

    const payload = {
      page: 1,
      pageSize: 10,
    };

    await expect(getUsers(payload)).rejects.toThrow('API Error');
  });

  it('should use empty strings for missing filters', async () => {
    mockedPost.mockImplementation(() => Promise.resolve({ data: [], totalCount: 0 }));

    const payload = {
      page: 1,
      pageSize: 10,
    };

    await getUsers(payload);

    expect(mockedPost).toHaveBeenCalledWith(
      '/iam/v1/User/GetUsers',
      JSON.stringify({
        page: 1,
        pageSize: 10,
        filter: {
          email: '',
          name: '',
        },
      })
    );
  });
});
