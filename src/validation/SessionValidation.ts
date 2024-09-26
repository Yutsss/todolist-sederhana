import { z, ZodType } from 'zod';

export class SessionValidation {
  static readonly REFRESH_TOKEN : ZodType = z.object({
    refreshToken : z.string({
      required_error: "Refresh token is required"
    }).min(1, "Refresh token must contain at least 1 character").max(255, "Refresh token cannot be longer than 100 characters"),
    userAgent: z.string({
      required_error: "User agent is required"
    }).min(1, "User agent must contain at least 1 character").max(255, "User agent cannot be longer than 100 characters")
  });
}