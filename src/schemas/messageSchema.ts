import { z } from "zod";

export const messageSchema = z.object({
    content: z
        .string()
        .min(20, "Message must be at least 20 characters")
        .max(300, "Message must be less than 300 characters"),
    
})