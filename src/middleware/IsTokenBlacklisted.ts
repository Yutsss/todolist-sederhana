import { Response, NextFunction, Request } from "express";
import { BlacklistedTokenRepository } from "../repository/BlacklistedTokenRepository";
import { ResponseError } from "../error/ResponseError";
import { errorResponse } from "../utils/api-response";

export const IsTokenBlacklisted = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return errorResponse(res, new ResponseError(401, "Unauthorized"));
  }

  try {
    const blacklistedToken = await BlacklistedTokenRepository.findByToken(token);

    if (blacklistedToken) {
      throw new ResponseError(401, "Unauthorized");
    }

    next(); 
  } catch (error) {
    if (error instanceof ResponseError) {
      return errorResponse(res, error);
    } else {
      return errorResponse(res, new ResponseError(500, "Internal Server Error"));
    }
  }
};
