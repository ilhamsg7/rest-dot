import { BaseResponse } from "../base/index";
import { PaginatedResponse } from "../base/index";

export type TeamResponse = {
    id: string;
    name: string;
    base: string;
    logo: string | null;
    founded: string | null;
    chasis: string;
    entryYear: number;
    powerUnitId: string;
    powerUnit: {
        name: string;
    }
    principalId: string;
    principal: {
        name: string;
    }
    createdAt: string;
}

export type TeamRequestResponse = {
    id: string;
    name: string;
    base: string;
    logo: string | null;
    founded: string | null;
    chasis: string;
    entryYear: number;
    powerUnitId: string;
    principalId: string;
    createdAt: string;
}

export type TeamListResponse = PaginatedResponse<TeamResponse>;
export type TeamRequestResponses = BaseResponse<TeamRequestResponse>;