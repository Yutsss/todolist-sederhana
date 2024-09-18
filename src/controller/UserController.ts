import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { CreateUserRequest } from "../model/UserModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { LoginRequest } from "../model/AuthModel";

export class UserController {
  static async register (req: Request, res: Response) {
    try {
      const request = req.body as CreateUserRequest;
      await UserService.registerUser(request);
      successResponse(res, 201, "User created successfully");
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }

  static async login (req: Request, res: Response) {
    try {
      const request = req.body as LoginRequest;
      const response = await UserService.loginUser(request);
      successResponse(res, 200, "Login successful", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }
}