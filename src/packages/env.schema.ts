import { z } from "zod";

export const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.string(),
    DATABASE_URL: z.string(),
    JWT_SECRET_KEY: z.string(),
    JWT_REFRESH_KEY: z.string(),
    BASE_URL: z.string(),
    ACCESS_TOKEN_EXPIRED: z.string(),
    REFRESH_TOKEN_EXPIRED: z.string(),
    JWT_REFRESH_COOKIE_NAME: z.string(),
    REFRESH_TOKEN_COOKIE_TTL_DAYS: z.coerce.number(),
});

export type EnvSchema = z.infer<typeof envSchema>;