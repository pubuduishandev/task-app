// Notice the 'export' keyword here!
export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskPayload {
  title: string;
}

export interface UpdateTaskPayload {
  title?: string;
  isCompleted?: boolean;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}