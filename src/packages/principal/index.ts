import { BaseResponse } from "../base/index";
import { PaginatedResponse } from "../base/index";

export type PrincipalResponse = {
    id: string;
    name: string;
    placeOfBirth: string | null;
    dateOfBirth: string | null;
    nationality: number;
    teamId: string;
    team: {
        name: string;
        base: string;
        founded: string | null;
        logo: string | null;
        chasis: string;
        entryYear: number;
    }
    createdAt: string;
}

export type PrincipalRequestResponse = {
    id: string;
    name: string;
    placeOfBirth: string | null;
    dateOfBirth: string | null;
    nationality: string;
    teamId: string;
    createdAt: string;
}

export type PrincipalListResponse = PaginatedResponse<PrincipalResponse>;
export type PrincipalRequestResponses = BaseResponse<PrincipalRequestResponse>;