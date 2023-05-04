import { Prisma } from "@prisma/client";
import "dotenv/config";
import { UserListResponse, UserRequestResponse, UserRequestResponses, UserResponse } from "../packages/user";
import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";
import { CreateUserRequest } from "../packages/user/request";
import { LoginRequest } from "../packages/auth/request";
import jwtUtils from "../utils/jwt";

class AuthService {
    async register(data: CreateUserRequest): Promise<UserRequestResponses> {
        data.password = await bcrypt.hash(data.password, 10);
        try {
            const createUser = await prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                }
            })

            const response: UserRequestResponses = {
                message: "User has been created",
                data: Object(createUser)
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    async login(data: LoginRequest) {
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) throw new Error("User not found");

        // validation password
        const isValidPassword = await bcrypt.compare(data.password, user.password!);
        if (!isValidPassword) throw new Error("Invalid password");

        const accessToken = await jwtUtils.accessToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });
        const refreshToken = await jwtUtils.refreshToken({
            id: user.id,
            email: user.email,
            role: user.role,
        });

        return { accessToken: accessToken, refreshToken: refreshToken };
    }
}

export default AuthService;