import { ZodError } from 'zod'; 
import { ResponseError } from '../error/ResponseError';
import { Response } from 'express'; 

export const successResponse = (res: Response, code: number, message: string, data?: any): void => {
  if (data === undefined) {
    res.status(code).json({
      resultCode: code,
      resultMessage: message,
    });
  } else {
    res.status(code).json({
      resultCode: code,
      resultMessage: message,
      data: data,
    });
  }
};

export const errorResponse = (res: Response, error: Error): void => {
  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errorCode: error.status,
      errorMessage: error.message,
    });
  } else if (error instanceof ZodError) {
    res.status(400).json({
      errorCode: 400,
      errorMessage: error.errors[0].message,
    });
  } else {
    res.status(500).json({
      errorCode: 500,
      errorMessage: "Internal Server Error",
    });
  }
};
