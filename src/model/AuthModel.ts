import { Request } from "express";

export interface User {
  id: number;
  role: string;
}

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
  user: User;
}

