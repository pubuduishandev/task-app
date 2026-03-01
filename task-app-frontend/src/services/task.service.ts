import axiosClient from '../api/axiosClient';
import type { Task, CreateTaskPayload, UpdateTaskPayload, ApiResponse } from '../types/task.types';

export const TaskService = {
  
  // GET ALL TASKS
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axiosClient.get<ApiResponse<Task[]>>('/tasks');
    // We return response.data.data because of how we structured the NestJS response
    return response.data.data || []; 
  },

  // CREATE TASK
  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const response = await axiosClient.post<ApiResponse<Task>>('/tasks', payload);
    return response.data.data;
  },

  // UPDATE TASK (Title or Status)
  updateTask: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    const response = await axiosClient.patch<ApiResponse<Task>>(`/tasks/${id}`, payload);
    return response.data.data;
  },

  // DELETE TASK
  deleteTask: async (id: string): Promise<void> => {
    await axiosClient.delete(`/tasks/${id}`);
  }
};