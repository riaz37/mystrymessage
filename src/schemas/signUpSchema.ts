import { z } from "zod";

export const userNameValidation = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters");

export const signUpSchema = z.object({
    username: userNameValidation,
    email: z
        .string()
        .email("Invalid email")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters"),
    confirmPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be less than 20 characters")
})
    .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
});
