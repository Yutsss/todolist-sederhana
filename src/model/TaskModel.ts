export interface addTaskRequest {
  title: string;
  cardId: number;
}

export interface updateTaskDueDateRequest {
  id: number;
  dueDate: Date;
  
}

export interface updateTaskTitleRequest {
  id: number;
  title: string;
}

export interface updateTaskDoneRequest {
  id: number;
  done: boolean;
}

export interface deleteTaskRequest {
  id: number;
}