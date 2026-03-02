import axiosClient from '../api/axiosClient';
import type { User, ApiResponse } from '../types/task.types';

export const AuthService = {
  // Login
  login: async (data: any): Promise<User> => {
    const response = await axiosClient.post<any>('/auth/login', data);
    const { status, data: result } = response.data;

    if (status === 'success' && result && result.token) {
      AuthService.saveToLocal(result, result.token);
      return result;
    }
    
    throw new Error("Invalid login response: Missing user ID or token");
  },
  
  // Register
  register: async (data: any): Promise<User> => {
    const response = await axiosClient.post<any>('/auth/register', data);
    const { status, data: result } = response.data;

    if (status === 'success' && result && result.token) {
      AuthService.saveToLocal(result, result.token);
      return result;
    }
    
    throw new Error("Registration failed: Unexpected response structure");
  },

  // Get User Profile
  getProfile: async (): Promise<User> => {
    const response = await axiosClient.get<ApiResponse<User>>('/auth/profile');
    if (response.data.status === 'success') {
      return response.data.data;
    }
    throw new Error("Failed to fetch profile");
  },

  // Save to local storage
  saveToLocal: (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  },

  // Get user from local storage
  getUser: (): User | null => {
    const data = localStorage.getItem('user');
    if (!data || data === 'undefined') return null;
    try { return JSON.parse(data); } catch { return null; }
  },

  // Get access token from local storage
  getToken: () => localStorage.getItem('token'),

  // Logout
  logout: () => {
    // 1. Clear Local Storage
    localStorage.clear(); 
    
    // 2. Clear Session Storage
    sessionStorage.clear();

    // 3. Clear Cookies (Standard JS way)
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  },
};