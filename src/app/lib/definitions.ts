import { z } from "zod";


export const UserRoles = ["buyer", "seller", "admin"] as const;


const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot be longer than 50 characters." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  phone: z
    .string()
    .regex(phoneRegex, { message: "Please enter a valid phone number." })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
  role: z.enum(UserRoles, {
    errorMap: () => ({ message: "Please select a valid role." }),
  }),
});


export type SignupFormData = z.infer<typeof SignupFormSchema>;


export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
        password?: string[];
        role?: string[];
      };
      message?: string;
    }
  | undefined;