import { userRoles } from "@/db/schema";
import { z } from "zod/v4";

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(userRoles),
});
