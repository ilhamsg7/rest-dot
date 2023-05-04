import { type Request, type Response } from "express";
import "reflect-metadata";
import { autoInjectable, inject, injectable } from "tsyringe";
import { wrapError } from "../utils/wrap";
import AuthService from "../service/auth.service";
import { StatusCodes } from "http-status-codes";
import { createUserRequest, updateUserRequest } from "../packages/user/request";
import { loginRequest } from "../packages/auth/request";
import { AuthResponse } from "../packages/auth";
import { envConfig } from "../env.config";
import { addDays } from "date-fns";

@injectable()
class AuthController {
    constructor(@inject(AuthService) public service: AuthService) {}

    async register(req: Request, res: Response) {
        await wrapError(res, async () => {
            const inputData = createUserRequest.parse(req.body);
            const response = await this.service.register(inputData);
            res.status(StatusCodes.CREATED).json(response);
        });
    }

    async login(req: Request, res: Response) {
        await wrapError(res, async () => {
            const inputData = loginRequest.parse(req.body);
            const token = await this.service.login(inputData);
            let response: AuthResponse = {
                message: "success login",
                data: token,
              };
              res.cookie(envConfig.JWT_REFRESH_COOKIE_NAME, token.refreshToken, {
                secure: false,
                httpOnly: true,
                expires: addDays(new Date(), envConfig.REFRESH_TOKEN_COOKIE_TTL_DAYS), // 7 days from now
              });
              res.status(StatusCodes.OK).json(response);
        });
    }
}

export default AuthController;