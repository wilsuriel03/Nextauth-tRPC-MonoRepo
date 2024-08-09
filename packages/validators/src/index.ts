import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const EmailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
});

export const SignInWithUserTypeSchema = SignInSchema.extend({
  userType: z.enum(["admin", "customer"]),
});

export const SignUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().min(1, { message: "First name cannot be empty." }),
  lastName: z.string().min(1, { message: "Last name cannot be empty." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter." })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter." })
    .regex(/[0-9]/, { message: "Password must include a number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must include a special character." }),
});

export const InviteSignUpSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must include an uppercase letter." })
    .regex(/[a-z]/, { message: "Password must include a lowercase letter." })
    .regex(/[0-9]/, { message: "Password must include a number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must include a special character." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  token: z.string(), // Unique token sent in the invitation email
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const InviteStaffSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  role: z.enum(['admin', 'marketing', 'shipper']),
});