import { RequestHandler } from "express";

export const toRequestHandler = (middleware: any) => {
  return middleware as RequestHandler;
}