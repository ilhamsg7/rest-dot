import { BaseResponse } from "../base/index";
import { PaginatedResponse } from "../base/index";

export const USER_ROLE = {
    user: "user",
    admin: "admin",
} as const;
  
export type UserRole = keyof typeof USER_ROLE;

export type UserResponse = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    createdAt: string;
}

export type UserRequestResponse = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: UserRole;
    createdAt: string;
}

export type UserListResponse = PaginatedResponse<UserResponse>;
export type UserRequestResponses = BaseResponse<UserRequestResponse>;