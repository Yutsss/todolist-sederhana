import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import { CreateUserRequest } from "../model/UserModel";
import { successResponse, errorResponse } from "../utils/api-response";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest, LoginRequest } from "../model/AuthModel";

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

  static async loginWithGoogle (req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const response = await UserService.loginWithGoogle(request);
      successResponse(res, 200, "Login with Google successful", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }

  static async get (req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const response = await UserService.getUser(request);
      successResponse(res, 200, "Success Getting User", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }

  static async getAll (req: Request, res: Response) {
    try {
      const response = await UserService.getAllUsers();
      successResponse(res, 200, "Success Getting User", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }

  static async update (req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const data = request.body;
      const response = await UserService.updateUser(request, data);
      successResponse(res, 200, "User updated successfully", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }

  static async updateGoogleUserPassword (req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const data = request.body;
      const response = await UserService.updatePasswordForGoogleUser(request, data);
      successResponse(res, 200, "User updated successfully", response);
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }

  static async logout (req: Request, res: Response) {
    try {
      const request = req as AuthRequest;
      const token = request.headers.authorization?.split(" ")[1] as string;
      await UserService.logout(request, token);
      successResponse(res, 200, "Logout successfully");
      
    } catch (err) {
      if (err instanceof Error) {
        errorResponse(res, err);
      } else {
        errorResponse(res, new ResponseError (500, 'Internal Server Error'));
      }
    }
  }
}