import { Request, Response } from "express";
import { AuthRequest } from "../model/AuthModel";
import { TaskService } from "../service/TaskService";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";

export class TaskController {

  static async add(req: Request, res: Response) {
    try{
      const request = req as AuthRequest;
      const data = {
        title: req.body.title,
        cardId: parseInt(req.params.cardId) as number
      }
      await TaskService.addTask(request, data);
      successResponse(res, 201, "Task added successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(500, 'Internal Server Error'));
      }
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const updateType = req.query.type as string;

      let updateData: any = {
        id: parseInt(req.params.taskId) as number
      }

      switch (updateType) {
        case 'title':
          updateData.title = req.body.title as string;
          break;
        case 'dueDate':
          updateData.dueDate = new Date(req.body.dueDate as string);
          break;
        case 'done':
          updateData.done = req.body.done as boolean;
          break;
        default:
          throw new ResponseError(400, "Invalid request");
      }

      await TaskService.updateTask(request, updateData);
      successResponse(res, 200, "Task updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(500, 'Internal Server Error'));
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const data = {
        id: parseInt(req.params.taskId) as number
      }
      await TaskService.deleteTask(request, data);
      successResponse(res, 200, "Task deleted successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError(500, 'Internal Server Error'));
      }
    }
  }
}