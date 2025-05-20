// import { clients } from 'lib/https';
// import { IGetSocialLoginEndpointPayload, IGetSocialLoginEndpointResponse } from 'constant/sso';

// export class SSOservice {
//   getSocialLoginEndpoint(
//     payload: IGetSocialLoginEndpointPayload
//   ): Promise<IGetSocialLoginEndpointResponse> {
//     return clients.post(`/authentication/v1/OAuth/GetSocialLogInEndPoint`, JSON.stringify(payload));
//   }
// }

const safeJsonParse = async (response: Response) => {
  try {
    if (!response || !response.text) {
      console.error('Invalid response object');
      return { error: 'Invalid response object' };
    }

    const text = await response.text();
    console.log('Raw response text:', text);

    if (!text || text.trim() === '') {
      console.error('Empty response received');
      return { error: 'Empty response received' };
    }

    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Failed to parse JSON response:', text);
      return {
        error: 'Invalid JSON response',
        rawResponse: text,
      };
    }
  } catch (error) {
    console.error('Response handling error:', error);
    return { error: 'Failed to process response' };
  }
};

export class SSOservice {
  async getSocialLoginEndpoint(payload: any) {
    try {
      console.log('Calling getSocialLoginEndpoint with payload:', payload);

      const rawResponse = await fetch(
        `${process.env.REACT_APP_PUBLIC_BACKEND_URL}/authentication/v1/OAuth/GetSocialLogInEndPoint`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      console.log('Response status:', rawResponse.status);
      console.log('Response headers:', Array.from(rawResponse.headers.entries()));

      // Check if the response is ok (status in the range 200-299)
      if (!rawResponse.ok) {
        console.error('API responded with error status:', rawResponse.status);
        return {
          error: `API error: ${rawResponse.status}`,
          status: rawResponse.status,
        };
      }

      return await safeJsonParse(rawResponse);
    } catch (error) {
      console.error('Request failed:', error);
      return { error: 'Failed to make request' };
    }
  }
}
