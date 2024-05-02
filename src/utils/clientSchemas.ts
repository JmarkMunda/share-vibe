import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "name must be at least 3 characters" })
    .max(25, { message: "name cannot exceed 25 characters" }),
  email: z.string().email({ message: "please provde a valid email" }),
  username: z.string().regex(/^[a-zA-Z0-9]+$/, {
    message: "username should contain letters and numbers",
  }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" })
    .max(25, { message: "password cannot exceed 25 characters" }),
  confirmPassword: z
    .string()
    .min(8, { message: "password must be at least 8 characters" })
    .max(25, { message: "password cannot exceed 25 characters" }),
  image: z.string({ required_error: "please provide an image" }),
});

// ADD REFINE HERE
