
import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character.' }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Please enter your password.' }),
});

export type LoginValues = z.infer<typeof loginSchema>;


export const profileSchema = z.object({
  weight: z.string().min(1, { message: "Weight is required." }),
  height: z.string().min(1, { message: "Height is required." }),
  age: z.string().min(1, { message: "Age is required." }),
  gender: z.string({ required_error: "Please select a gender." }),
  location: z.string().min(2, { message: "Location is required." }),
  state: z.string().min(2, { message: "State is required." }),
  village: z.string().min(2, { message: "Village is required." }),
  weightPhoto: z.any().optional(),
});

export type ProfileValues = z.infer<typeof profileSchema>;
