import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";
import {
     addTaskRequest, 
     updateTaskDoneRequest, 
     updateTaskDueDateRequest, 
     updateTaskTitleRequest,
     deleteTaskRequest 
    } from "../model/TaskModel";
import { CardRepository } from "../repository/CardRepository";
import { UserRepository } from "../repository/UserRepository";
import { TaskRepository } from "../repository/TaskRepository";
import { TaskValidation } from "../validation/TaskValidation";
import { Validation } from "../utils/validation";

export class TaskService {
  
  static async addTask(auth: AuthRequest, request: addTaskRequest) {
      const data = Validation.validation(TaskValidation.ADD, request);
      
      const userId: number = auth.user?.id as number;
      const user = await UserRepository.findById(userId);

      if (!user) {
          throw new ResponseError(404, "User not found");
      }

      const card = await CardRepository.findById(data.cardId);

      if (!card) {
          throw new ResponseError(404, "Card not found");
      }

      return await TaskRepository.create(data.title, data.cardId);
  }

  static async updateTask(auth: AuthRequest, request: updateTaskTitleRequest | updateTaskDueDateRequest | updateTaskDoneRequest) {
    const userId: number = auth.user?.id as number;
    const user = await UserRepository.findById(userId);

    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    const task = await TaskRepository.findById(request.id);

    if (!task) {
        throw new ResponseError(404, "Task not found");
    }

    if("title" in request) {
        const data = Validation.validation(TaskValidation.UPDATE, request);
        return await TaskRepository.findByIdAndUpdate(request.id, { title: data.title });
    } else if("dueDate" in request) {
        const data = Validation.validation(TaskValidation.UPDATE, request);
        return await TaskRepository.findByIdAndUpdate(request.id, { dueDate: data.dueDate });
    } else if("done" in request) {
        const data = Validation.validation(TaskValidation.UPDATE, request);
        return await TaskRepository.findByIdAndUpdate(request.id, { done: data.done });
    } else {
        throw new ResponseError(400, "Invalid request");
    }
  }

  static async deleteTask(auth: AuthRequest, request: deleteTaskRequest) {
    const data = Validation.validation(TaskValidation.DELETE, request);

    const userId: number = auth.user?.id as number;
    
    const user = await UserRepository.findById(userId);

    if (!user) {
        throw new ResponseError(404, "User not found");
    }

    const task = await TaskRepository.findById(data.id);

    if (!task) {
        throw new ResponseError(404, "Task not found");
    }

    return await TaskRepository.findByIdAndDelete(data.id);
  }
}