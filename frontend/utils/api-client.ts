import type { ApiResponse, ApiErrorResponse } from '~/types';

export class ApiClient {
  private _baseURL: string | null = null;
  
  private getBaseURL(): string {
    if (this._baseURL) {
      return this._baseURL;
    }
    
    let baseURL: string;
    try {
      const config = useRuntimeConfig();
      baseURL = config.public.backendUrl || process.env.NUXT_PUBLIC_BACKEND_URL || '';
    } catch {
      baseURL = process.env.NUXT_PUBLIC_BACKEND_URL || '';
    }
    
    if (!baseURL) {
      throw new Error('NUXT_PUBLIC_BACKEND_URL environment variable is not set');
    }
    
    baseURL = baseURL.replace(/\/$/, '');
    
    if (!baseURL.endsWith('/api')) {
      baseURL = `${baseURL}/api`;
    }
    
    this._baseURL = baseURL;
    return baseURL;
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    try {
      if (process.client) {
        const supabase = useSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          headers.Authorization = `Bearer ${session.access_token}`;
        }
      }
    } catch (error) {
    }

    return headers;
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const headers = await this.getAuthHeaders();
    const fullUrl = `${this.getBaseURL()}${url}`;
    
    try {
      const response = await $fetch<ApiResponse<T>>(fullUrl, {
        ...options,
        method: 'GET',
        headers: {
          ...headers,
          ...options?.headers,
        },
      });

      return this.extractData(response);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, body?: any, options?: RequestInit): Promise<T> {
    const headers = await this.getAuthHeaders();
    const fullUrl = `${this.getBaseURL()}${url}`;

    try {
      const response = await $fetch<ApiResponse<T>>(fullUrl, {
        ...options,
        method: 'POST',
        headers: {
          ...headers,
          ...options?.headers,
        },
        body,
        timeout: 90000,
      });

      return this.extractData(response);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, body?: any, options?: RequestInit): Promise<T> {
    const headers = await this.getAuthHeaders();

    try {
      const response = await $fetch<ApiResponse<T>>(`${this.getBaseURL()}${url}`, {
        ...options,
        method: 'PUT',
        headers: {
          ...headers,
          ...options?.headers,
        },
        body,
      });

      return this.extractData(response);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    const headers = await this.getAuthHeaders();
    const fullUrl = `${this.getBaseURL()}${url}`;

    try {
      const response = await $fetch<ApiResponse<T>>(fullUrl, {
        ...options,
        method: 'DELETE',
        headers: {
          ...headers,
          ...options?.headers,
        },
        timeout: 60000,
      });

      return this.extractData(response);
    } catch (error: any) {
      if (process.dev) {
        console.error('API Error Details:', {
          url: fullUrl,
          error,
          status: error.status || error.statusCode,
          message: error.message,
        });
      }
      throw this.handleError(error);
    }
  }

  private extractData<T>(response: any): T {
    if (response?.success === true && response?.data !== undefined) {
      return response.data;
    }
    if (response?.data !== undefined) {
      return response.data;
    }
    if (Array.isArray(response)) {
      return response as T;
    }
    return response;
  }

  private handleError(error: any): Error {
    const statusCode = error.status || error.statusCode || error.response?.status || error.response?.statusCode;
    
    if (statusCode === 401) {
      return new Error('Unauthorized: Please log in to access this resource.');
    }
    
    if (statusCode === 403) {
      return new Error('Forbidden: You do not have permission to access this resource.');
    }
    
    if (statusCode === 404) {
      return new Error('Not Found: The requested resource could not be found.');
    }
    
    if (error.message?.includes('CORS') || error.message?.includes('Cross-Origin')) {
      const backendUrl = this.getBaseURL();
      return new Error(
        `CORS Error: The backend server at ${backendUrl} is not allowing requests from this origin.\n\n` +
        `This is a backend configuration issue. The backend needs to allow requests from your frontend domain.`
      );
    }
    
    if (error.data) {
      const apiError = error.data as ApiErrorResponse;
      if (apiError.message) {
        return new Error(apiError.message);
      }
      if (typeof error.data === 'string') {
        return new Error(error.data);
      }
    }
    
    if (error.response?._data) {
      const apiError = error.response._data as ApiErrorResponse;
      if (apiError.message) {
        return new Error(apiError.message);
      }
    }
    
    const isFetchError = error.name === 'FetchError' || error.name === 'TypeError';
    const errorMessage = error.message || '';
    
    const isNetworkError = 
      isFetchError ||
      errorMessage.includes('fetch') || 
      errorMessage.includes('network') || 
      errorMessage.includes('ECONNREFUSED') || 
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('ERR_NETWORK') ||
      errorMessage.includes('ERR_INTERNET_DISCONNECTED') ||
      errorMessage.includes('NetworkError') ||
      error.code === 'ECONNREFUSED' ||
      error.code === 'ETIMEDOUT' ||
      error.code === 'ENOTFOUND';
    
    if (isNetworkError && !statusCode) {
      const backendUrl = this.getBaseURL();
      const currentOrigin = process.client ? window.location.origin : 'unknown';
      
      const isRenderTimeout = 
        backendUrl.includes('render.com') && 
        (errorMessage.includes('timeout') || errorMessage.includes('aborted') || error.code === 'ETIMEDOUT');
      
      if (isRenderTimeout) {
        return new Error(
          `Backend is waking up: The Render free tier backend is spinning up (takes ~50 seconds).\n\n` +
          `Please wait a moment and try again. The first request after inactivity takes longer.\n\n` +
          `Backend URL: ${backendUrl}\n` +
          `Tip: Consider upgrading to a paid Render plan to avoid cold starts.`
        );
      }
      
      return new Error(
        `Network error: Could not connect to the backend server at ${backendUrl}.\n\n` +
        `Current frontend origin: ${currentOrigin}\n\n` +
        `Troubleshooting steps:\n` +
        `1. Check if backend is running: Visit ${backendUrl.replace('/api', '')} in your browser\n` +
        `2. CORS issue: Verify backend FRONTEND_URL env var includes ${currentOrigin}\n` +
        `   → In Render dashboard: Settings → Environment → FRONTEND_URL\n` +
        `   → Set to: ${currentOrigin} (or comma-separated: http://localhost:3001,${currentOrigin})\n` +
        `3. Vercel env var: Ensure NUXT_PUBLIC_BACKEND_URL is set to ${backendUrl.replace('/api', '')}\n` +
        `   → In Vercel: Settings → Environment Variables\n` +
        `   → ⚠️ IMPORTANT: Do NOT include /api suffix! API client adds it automatically.\n` +
        `4. Backend sleep: If using Render free tier, first request takes ~50s to wake up\n` +
        `5. Check browser DevTools → Network tab for detailed error information\n` +
        `6. Test backend directly: curl ${backendUrl}/courses`
      );
    }
    
    if (statusCode) {
      return new Error(`Request failed with status ${statusCode}: ${errorMessage || 'Unknown error'}`);
    }
    
    if (errorMessage) {
      return new Error(errorMessage);
    }
    
    return new Error('An unexpected error occurred');
  }
}

let apiClientInstance: ApiClient | null = null;

export function getApiClient(): ApiClient {
  if (!apiClientInstance) {
    apiClientInstance = new ApiClient();
  }
  return apiClientInstance;
}

export const apiClient = new Proxy({} as ApiClient, {
  get(_target, prop: string | symbol) {
    const instance = getApiClient();
    const value = instance[prop as keyof ApiClient];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
  set(_target, prop: string | symbol, value: any) {
    const instance = getApiClient();
    (instance as any)[prop] = value;
    return true;
  }
});

