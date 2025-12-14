import type { ApiResponse, ApiErrorResponse } from '~/types';

export class ApiClient {
  private _baseURL: string | null = null;
  
  private getBaseURL(): string {
    if (this._baseURL) {
      return this._baseURL;
    }
    
    // Use runtime config when available (client-side), fallback to env var (SSR-safe)
    let baseURL: string;
    try {
      const config = useRuntimeConfig();
      baseURL = config.public.backendUrl || process.env.NUXT_PUBLIC_BACKEND_URL || 'https://brainbitelms-backend.onrender.com/api';
    } catch {
      // Fallback if useRuntimeConfig is not available (e.g., outside setup context)
      baseURL = process.env.NUXT_PUBLIC_BACKEND_URL || 'https://brainbitelms-backend.onrender.com/api';
    }
    
    // Ensure base URL doesn't end with a slash
    baseURL = baseURL.replace(/\/$/, '');
    
    this._baseURL = baseURL;
    return baseURL;
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    try {
      // Only get session on client-side
      if (process.client) {
        const supabase = useSupabaseClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.access_token) {
          headers.Authorization = `Bearer ${session.access_token}`;
        }
      }
    } catch (error) {
      console.warn('Failed to get auth token:', error);
    }

    return headers;
  }

  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const headers = await this.getAuthHeaders();
    
    try {
      const response = await $fetch<ApiResponse<T>>(`${this.getBaseURL()}${url}`, {
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

    try {
      const response = await $fetch<ApiResponse<T>>(`${this.getBaseURL()}${url}`, {
        ...options,
        method: 'POST',
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

    try {
      const response = await $fetch<ApiResponse<T>>(`${this.getBaseURL()}${url}`, {
        ...options,
        method: 'DELETE',
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

  private extractData<T>(response: any): T {
    // Backend returns { success: true, data: T, timestamp: string }
    if (response?.success && response?.data !== undefined) {
      return response.data;
    }
    // Fallback for direct data
    if (response?.data !== undefined) {
      return response.data;
    }
    // If response is already the data (shouldn't happen with our interceptor)
    return response;
  }

  private handleError(error: any): Error {
    // Check for HTTP status codes first
    const statusCode = error.statusCode || error.status || error.response?.status;
    
    if (statusCode === 401) {
      return new Error('Unauthorized: Please log in to access this resource.');
    }
    
    if (statusCode === 403) {
      return new Error('Forbidden: You do not have permission to access this resource.');
    }
    
    if (statusCode === 404) {
      return new Error('Not Found: The requested resource could not be found.');
    }
    
    // Nuxt $fetch error structure
    if (error.data) {
      const apiError = error.data as ApiErrorResponse;
      if (apiError.message) {
        return new Error(apiError.message);
      }
    }
    
    // H3/Nitro error structure
    if (error.response?._data) {
      const apiError = error.response._data as ApiErrorResponse;
      if (apiError.message) {
        return new Error(apiError.message);
      }
    }
    
    // Network errors (only if no status code and network-related message)
    if (error.message) {
      const isNetworkError = 
        error.message.includes('fetch') || 
        error.message.includes('network') || 
        error.message.includes('ECONNREFUSED') || 
        error.message.includes('Failed to fetch') ||
        error.message.includes('ERR_NETWORK') ||
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT';
      
      if (isNetworkError && !statusCode) {
        const backendUrl = this.getBaseURL();
        return new Error(
          `Network error: Could not connect to the backend server at ${backendUrl}.\n\n` +
          `Please ensure:\n` +
          `1. The backend is running (cd backend && npm run start:dev)\n` +
          `2. The backend URL is correct in your .env file (NUXT_PUBLIC_BACKEND_URL)\n` +
          `3. Required environment variables are set in backend/.env (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, AI_API_KEY)`
        );
      }
      
      return new Error(error.message);
    }
    
    return new Error('An unexpected error occurred');
  }
}

// Lazy singleton - only create when accessed
let apiClientInstance: ApiClient | null = null;

export function getApiClient(): ApiClient {
  if (!apiClientInstance) {
    apiClientInstance = new ApiClient();
  }
  return apiClientInstance;
}

// Export a Proxy for backward compatibility
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

