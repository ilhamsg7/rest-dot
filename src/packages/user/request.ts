import { z } from "zod";

export const createUserRequest = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().min(10).max(15),
});

export const updateUserRequest = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8).optional(),
    phone: z.string().min(10).max(15).optional(),
});

export type CreateUserRequest = z.infer<typeof createUserRequest>;
export type UpdateUserRequest = z.infer<typeof updateUserRequest>;