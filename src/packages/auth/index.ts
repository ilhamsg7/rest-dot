import { z } from "zod";
import { BaseResponse } from "../base/index";

export const authRequest = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const authResponse = z.object({
  message: z.string(),
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
});

export type AuthRequest = z.infer<typeof authRequest>;

type Response = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = BaseResponse<Response>;

