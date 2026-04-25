
export interface Task {
    id: string;        // UUID (future DB safe)
    title: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }