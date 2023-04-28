import { BaseResponse } from "../base/index";
import { PaginatedResponse } from "../base/index";

export type PowerUnitResponse = {
    id: string;
    name: string;
    createdAt: string;
}

export type PowerUnitRequestResponse = {
    id: string;
    name: string;
    createdAt: string;
}

export type PowerUnitListResponse = PaginatedResponse<PowerUnitResponse[]>;
export type PowerUnitRequestResponses = BaseResponse<PowerUnitRequestResponse>;