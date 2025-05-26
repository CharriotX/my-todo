import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is requared" }).email({ message: "Incrorrect email adress" }),
    password: z.string().min(1, { message: "Password is required" }).min(3, { message: "Password must be at least 3 characters long" }),
    rememberMe: z.boolean(),
    captcha: z.string().optional()
})

export type Inputs = z.infer<typeof loginSchema>