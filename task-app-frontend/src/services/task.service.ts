import axiosClient from '../api/axiosClient';
import type { Task, UpdateTaskPayload, ApiResponse } from '../types/task.types';

export const TaskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axiosClient.get<ApiResponse<Task[]>>('/tasks');
    return response.data.data || [];
  },

  createTask: async (title: string) => {
    const response = await axiosClient.post<ApiResponse<Task>>('/tasks', { title });
    return { 
      task: response.data.data, 
      message: response.data.message 
    };
  },

  updateTask: async (id: string, payload: UpdateTaskPayload) => {
    const response = await axiosClient.patch<ApiResponse<Task>>(`/tasks/${id}`, payload);
    return { 
      task: response.data.data, 
      message: response.data.message 
    };
  },

  deleteTask: async (id: string) => {
    const response = await axiosClient.delete<ApiResponse<null>>(`/tasks/${id}`);
    return { 
      message: response.data.message 
    };
  }
};