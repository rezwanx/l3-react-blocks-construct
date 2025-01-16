const API_CONFIG = {
  baseUrl: process.env.REACT_APP_PUBLIC_BACKEND_URL || 'https://dev-api.seliseblocks.com',
  blocksKey: process.env.REACT_APP_PUBLIC_X_BLOCKS_KEY || '93c21ea21083453d93dbcbd2fee69aab',
  auth: {
    token: '/authentication/v1/oauth/token',
  },
};

export const getApiUrl = (path: string) => {
  const baseUrl = API_CONFIG.baseUrl.endsWith('/')
    ? API_CONFIG.baseUrl.slice(0, -1)
    : API_CONFIG.baseUrl;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${cleanPath}`;
};

export default API_CONFIG;
