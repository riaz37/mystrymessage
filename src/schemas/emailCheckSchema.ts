import { z } from "zod";

export const emailCheckSchema = z.object({
    email: z
        .string()
        .email("Invalid email")
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
})
