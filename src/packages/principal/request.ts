import { z } from "zod";

export const createPrincipalRequest = z.object({
    name: z.string().min(3),
    placeOfBirth: z.string().min(3),
    dateOfBirth: z.string().min(3),
    nationality: z.string().min(3),
});

export const updateDriverRequest = z.object({
    name: z.string().min(3).optional(),
    placeOfBirth: z.string().min(3).optional(),
    dateOfBirth: z.string().min(3).optional(),
    nationality: z.string().min(3).optional(),
});

export type CreatePrincipalRequest = z.infer<typeof createPrincipalRequest>;
export type UpdatePrincipalRequest = z.infer<typeof updateDriverRequest>;