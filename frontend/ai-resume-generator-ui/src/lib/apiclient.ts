import { API_BASE_URL, API_ENDPOINTS } from "@/constants/apiEndpoints";


export const apiClient = {
  async post<T>(url: string, data: object): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    const result: T = await response.json();
    return result;
  },

  async get<T>(url: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }

    const result: T = await response.json();
    return result;
  },

  async createResume(data: object): Promise<any> {
    return this.post(API_ENDPOINTS.CREATE_RESUME, data);
  },

};
