import { z } from "zod";

export const createPowerUnitRequest = z.object({
    name: z.string().min(3),
});

export const updatePowerUnitRequest = z.object({
    name: z.string().min(3).optional(),
});

export type CreatePowerUnitRequest = z.infer<typeof createPowerUnitRequest>;
export type UpdatePowerUnitRequest = z.infer<typeof updatePowerUnitRequest>;