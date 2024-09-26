import jwt from "jsonwebtoken";

export const extractTokenExpiry = (token: string): number => {
  const decoded = jwt.decode(token) as { exp: number };
  return decoded.exp;
};