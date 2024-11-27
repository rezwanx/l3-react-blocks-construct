import { refreshToken } from "../actions/refresh-token";

interface Https {
  get: (url: string, headers?: HeadersInit) => Promise<unknown>;
  post: (
    url: string,
    body: BodyInit,
    headers?: HeadersInit
  ) => Promise<unknown>;
  put: (url: string, body: BodyInit, headers?: HeadersInit) => Promise<unknown>;
  delete: (url: string, headers?: HeadersInit) => Promise<unknown>;
  request: (url: string, options: RequestOptions) => Promise<unknown>;
}

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: BodyInit;
}

class HttpError extends Error {
  status: number;
  error: Record<string, unknown>;

  constructor(status: number, error: Record<string, unknown>) {
    super(error.toString());
    this.status = status;
    this.error = error;
  }
}

export const https: Https = {
  async get(url: string, headers: HeadersInit = {}) {
    return this.request(url, { method: "GET", headers });
  },

  async post(url: string, body: BodyInit, headers: HeadersInit = {}) {
    return this.request(url, { method: "POST", headers, body });
  },

  async put(url: string, body: BodyInit, headers: HeadersInit = {}) {
    return this.request(url, { method: "PUT", headers, body });
  },

  async delete(url: string, headers: HeadersInit = {}) {
    return this.request(url, { method: "DELETE", headers });
  },

  async request(
    url: string,
    { method, headers = {}, body }: RequestOptions
  ): Promise<unknown> {
    const config: RequestInit = {
      method,
      headers: new Headers({
        "Content-Type": "application/json",
        ...Object(
          headers instanceof Headers
            ? Object.fromEntries(headers.entries())
            : headers
        ),
      }),
    };

    config.body = body;

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        if (response.status === 401) {
          const newToken = await refreshToken();
          config.headers.set("Authorization", `Bearer ${newToken}`);
          const retryResponse = await fetch(url, config);

          if (!retryResponse.ok) {
            const err = await retryResponse.json();
            throw new HttpError(retryResponse.status, err);
          }

          return await retryResponse.json();
        }

        const err = await response.json();
        throw new HttpError(response.status, err);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};
