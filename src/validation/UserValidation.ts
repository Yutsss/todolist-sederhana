import {z, ZodType} from "zod";

export class UserValidation {

  static readonly REGISTER : ZodType = z.object({
    email : z.string().email("Invalid email format").min(1, "Email must contain at least 1 character").max(100, "Email cannot be longer than 100 characters"),
    password: z.string().min(1, "Password must contain at least 1 character").max(100, "Password cannot be longer than 100 characters"),
    name: z.string().min(1, "Name must contain at least 1 character").max(100, "Name cannot be longer than 100 characters") 
  });

  static readonly LOGIN : ZodType = z.object({
    email : z.string().email("Invalid email format").min(1, "Email must contain at least 1 character").max(100, "Email cannot be longer than 100 characters"),
    password: z.string().min(1, "Password must contain at least 1 character").max(100, "Password cannot be longer than 100 characters")
  });

  static readonly UPDATE : ZodType = z.object({
    email : z.string().email("Invalid email format").min(1, "Email must contain at least 1 character").max(100, "Email cannot be longer than 100 characters").optional(),
    password: z.string().min(1, "Password must contain at least 1 character").max(100, "Password cannot be longer than 100 characters").optional(),
    name: z.string().min(1, "Name must contain at least 1 character").max(100, "Name cannot be longer than 100 characters").optional()
  });
}