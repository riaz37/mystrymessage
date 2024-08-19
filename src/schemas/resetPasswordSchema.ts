import { z } from "zod";

export const resetPasswordSchema = z.object({
    otp: z
        .string()
        .min(6, "OTP must be at least 6 characters"),
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