import { BaseResponse } from "../base/index";
import { PaginatedResponse } from "../base/index";

export type DriverResponse = {
    id: string;
    name: string;
    placeOfBirth: string | null;
    dateOfBirth: string | null;
    nationality: string;
    carNumber: number;
    teamId: string;
    team: {
        name: string;
        base: string;
        founded: string | null;
        logo: string | null;
        chasis: string;
        entryYear: number;
    }
    createdAt: true;
}

export type DriverRequestResponse = {
    id: string;
    name: string;
    placeOfBirth: string | null;
    dateOfBirth: string | null;
    nationality: string;
    carNumber: number;
    teamId: string;
    createdAt: string;
}

export type DriverListResponse = PaginatedResponse<DriverResponse[]>;
export type DriverRequestResponses = BaseResponse<DriverRequestResponse>;