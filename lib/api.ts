import config from './config';

export const apiClient = {
  baseUrl: config.apiBaseUrl,
  
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    // Detect FormData body so we DON'T force JSON Content-Type
    const isFormData = options.body instanceof FormData;

    const defaultOptions: RequestInit = {
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
    };
    
    // Force fresh data on server-side by disabling fetch cache
    return fetch(url, { ...defaultOptions, ...options, cache: (options as any)?.cache || 'no-store' });
  },
  
  // Convenience methods
  get: (endpoint: string, options?: RequestInit) => 
    apiClient.request(endpoint, { ...options, method: 'GET' }),
    
  post: (endpoint: string, data?: any, options?: RequestInit) => {
    // If data is FormData, pass it through as-is and avoid JSON.stringify
    if (data instanceof FormData) {
      return apiClient.request(endpoint, { ...options, method: 'POST', body: data });
    }

    return apiClient.request(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
    
  put: (endpoint: string, data?: any, options?: RequestInit) =>
    apiClient.request(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),
    
  delete: (endpoint: string, options?: RequestInit) =>
    apiClient.request(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient;
