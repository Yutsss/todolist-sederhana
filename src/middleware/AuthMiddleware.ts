import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ResponseError } from './../error/ResponseError';
import { errorResponse } from '../utils/api-response';
import { BlacklistedTokenRepository } from '../repository/BlacklistedTokenRepository';
import { AuthRequest, TokenPayload } from '../model/AuthModel';

export const AuthMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return errorResponse(res, new ResponseError(401, 'Unauthorized'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const isBlacklisted = await BlacklistedTokenRepository.findByToken(token);
    if (isBlacklisted) {
      throw new ResponseError(401, 'Unauthorized');
    }

    const secret: string = process.env.SECRET_KEY as string;
    if (!secret) {
      throw new ResponseError(500, 'Internal Server Error: Secret key is not set');
    }

    const decoded = jwt.verify(token, secret) as TokenPayload;
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return errorResponse(res, new ResponseError(401, 'Unauthorized'));
    }

    return errorResponse(res, err instanceof ResponseError ? err : new ResponseError(500, 'Internal Server Error'));
  }
};