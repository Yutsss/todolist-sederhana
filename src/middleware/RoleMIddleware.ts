import { type Role } from "@prisma/client";
import { Response, NextFunction } from "express";
import { ResponseError } from "../error/ResponseError";
import { AuthRequest } from "../model/AuthModel";
import { errorResponse } from "../utils/api-response";

export const RoleMiddleware = (allowedRole: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as Role;

    if (!allowedRole.includes(userRole)) {
      return errorResponse(res, new ResponseError(403, "You are not allowed to access this resource"));
    }
      
    next();
  };
}