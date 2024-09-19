import {z, ZodType} from 'zod';

export class TaskValidation {

  static readonly ADD: ZodType = z.object({
    title: z.string({
      required_error: "Title is required"
    }).min(1, "Title must contain at least 1 character").max(100, "Title cannot be longer than 100 characters"),
    cardId: z.number().int()
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().int(),
    title: z.string({
      required_error: "Title is required"
    }).min(1).max(100, "Title cannot be longer than 100 characters").optional(),
    dueDate: z.date().optional(),
    done: z.boolean().optional()
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().int()
  });
  
}