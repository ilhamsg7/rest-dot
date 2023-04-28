import { z } from "zod";

export const searchRequest = z.object({
  search: z.string().optional(),
});

export type SearchRequest = z.infer<typeof searchRequest>;
