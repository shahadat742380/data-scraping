import { z } from "zod";

export const customerSchema = z.object({
  user_name: z
    .string()
    .trim()
    .min(1, "User name is required")
    .max(256, "User name is too big!"), 

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(100, "Max character limit should be 100")
    .email("Invalid email address"),

  dob: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()); 
  }, "Invalid date format"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .max(16, "Phone number is too long!"), 
});


