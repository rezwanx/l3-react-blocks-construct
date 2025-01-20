const API_CONFIG = {
  baseUrl: process.env.REACT_APP_PUBLIC_BACKEND_URL || 'https://dev-api.seliseblocks.com',
  blocksKey: process.env.REACT_APP_PUBLIC_X_BLOCKS_KEY || 'cf18dc87904c4e1485639242cda4a026',
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
