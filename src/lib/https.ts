import { getRefreshToken } from "@/features/auth/services/auth.service";

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

export class HttpError extends Error {
  status: number;
  error: Record<string, unknown>;

  constructor(status: number, error: Record<string, unknown>) {
    super(error.toString());
    this.status = status;
    this.error = error;
  }
}

export const clients: Https = {
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
        "X-Blocks-Key": process.env.NEXT_PUBLIC_X_BLOCKS_KEY || "",
        Authorization: `bearer ${localStorage.getItem("access_token")}`,
        credentials: "include",
        ...Object(
          headers instanceof Headers
            ? Object.fromEntries(headers.entries())
            : headers
        ),
      }),
    };

    config.body = body;
    const fullUrl = process.env.NEXT_PUBLIC_BACKEND_URL + url;

    try {
      const response = await fetch(fullUrl, config);
      if (!response.ok) {
        if (response.status === 401) {
          if (!localStorage.getItem("refresh_token")) {
            throw new HttpError(response.status, {
              error: "invalid_refresh_token",
            });
          }
          const refreshTokenRes = await getRefreshToken();
          if (refreshTokenRes.error === "invalid_refresh_token") {
            throw new HttpError(response.status, refreshTokenRes);
          } else {
            localStorage.setItem("access_token", refreshTokenRes.access_token);
            return this.request(url, { method, headers, body });
          }
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
