// src/interfaces/TaskDTOs.ts
export interface CreateTaskDTO {
    title: string;
  }
  
  export interface UpdateTaskDTO {
    title?: string;
    completed?: boolean;
  }
  
  export interface TaskResponseDTO {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }