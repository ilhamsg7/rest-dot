import { envSchema } from "./packages/env.schema";

export const envConfig = envSchema.parse(process.env);