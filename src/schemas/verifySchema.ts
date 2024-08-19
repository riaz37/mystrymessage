import { z } from "zod";

export const verifySchema = z.object({
    verifyCode: z
        .string()
        .length(6, "Verify code must be at  6 characters")

})