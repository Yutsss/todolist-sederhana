import { Request } from "express";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface TokenPayload {
  id: number;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}
