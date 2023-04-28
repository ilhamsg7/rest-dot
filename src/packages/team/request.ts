import { z } from "zod";

export const createTeamRequest = z.object({
    name: z.string().min(3),
    base: z.string().min(3),
    logo: z.string().min(3).optional(),
    founded: z.string().min(3).optional(),
    chasis: z.string().min(3),
    entryYear: z.number().min(3),
    powerUnitId: z.string().min(3),
    principalId: z.string().min(3),
});

export const updateTeamRequest = z.object({
    name: z.string().min(3).optional(),
    base: z.string().min(3).optional(),
    logo: z.string().min(3).optional(),
    founded: z.string().min(3).optional(),
    chasis: z.string().min(3).optional(),
    entryYear: z.number().min(3).optional(),
    powerUnitId: z.string().min(3).optional(),
    principalId: z.string().min(3).optional(),
});

export type CreateTeamRequest = z.infer<typeof createTeamRequest>;
export type UpdateTeamRequest = z.infer<typeof updateTeamRequest>;