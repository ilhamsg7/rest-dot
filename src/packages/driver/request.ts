import { z } from "zod";

export const createDriverRequest = z.object({
    name: z.string().min(3),
    placeOfBirth: z.string().min(3),
    dateOfBirth: z.string().min(3),
    nationality: z.string().min(3),
    carNumber: z.number().min(1),
    teamId: z.string().min(3),
});

export const updateDriverRequest = z.object({
    name: z.string().min(3).optional(),
    placeOfBirth: z.string().min(3).optional(),
    dateOfBirth: z.string().min(3).optional(),
    nationality: z.string().min(3).optional(),
    carNumber: z.number().min(1).optional(),
    teamId: z.string().min(3).optional(),
});

export type CreateDriverRequest = z.infer<typeof createDriverRequest>;
export type UpdateDriverRequest = z.infer<typeof updateDriverRequest>;