import { createPaginator } from "prisma-pagination";
import { Prisma } from "@prisma/client";
import "dotenv/config";
import { SearchRequest } from "../packages/base/search";
const paginate = createPaginator({ perPage: 5 });
import prisma from "../utils/prisma";
import { PrincipalListResponse, PrincipalRequestResponse, PrincipalRequestResponses, PrincipalResponse } from "../packages/principal";
import { CreatePrincipalRequest, UpdatePrincipalRequest } from "../packages/principal/request";

class PrincipalService {
    async getAllPrincipal(pages: number, data: SearchRequest): Promise<PrincipalListResponse> {
        const getAllPrincipal = await paginate<PrincipalResponse, Prisma.PrincipalFindManyArgs>(
            prisma.principal,
            {
                select: {
                    id: true,
                    name: true,
                    placeOfBirth: true,
                    dateOfBirth: true,
                    nationality: true,
                    team: {
                        select: {
                            name: true,
                        }
                    },
                    createdAt: true,
                },
                where: {
                    OR: [
                        { name: { contains: data.search } },
                            { team: { 
                                OR: [
                                    { name: { contains: data.search } },
                                    { base: { contains: data.search } },
                                ]
                            } 
                        }
                    ]
                },
                orderBy: {
                    name: "asc"
                }
            },
            {page: pages}
        );

        const response: PrincipalListResponse = {
            message: "All Principal in Formula 1",
            data: getAllPrincipal.data,
            meta: getAllPrincipal.meta
        }
        return response;
    }

    async getPrincipalById(id: string): Promise<PrincipalRequestResponses> {
        const getPrincipalById = await prisma.principal.findUnique({
            where: { id: id},
            select: {
                id: true,
                    name: true,
                    placeOfBirth: true,
                    dateOfBirth: true,
                    nationality: true,
                    team: {
                        select: {
                            name: true,
                        }
                    },
                    createdAt: true,
            }
        });

        const response: PrincipalRequestResponses = {
            message: "Principal Detail",
            data: Object(getPrincipalById)
        }
        return response;
    }

    async createPrincipal(data: CreatePrincipalRequest): Promise<PrincipalRequestResponses> {
        try {
            const createPrincipal = await prisma.principal.create({
                data: data
            })

            if(!createPrincipal) {
                throw new Error("Failed to create Principal");
            }

            const response: PrincipalRequestResponses = {
                message: "Principal Created",
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    async updatePrincipal(id: string, data: UpdatePrincipalRequest) {
        const updatePrincipal = await prisma.principal.update({
            where: { id: id },
            data: data
        });

        const response: PrincipalRequestResponses = {
            message: `Principal with id ${id} has successfully updated`,
            data: Object(updatePrincipal)
        }

        return response;
    }

    async deletePrincipal(id: string) {
        const deletePrincipal = await prisma.principal.update({
            where: { id: id },
            data: { deletedAt: new Date() }
        });

        const response: PrincipalRequestResponses = {
            message: `Principal with id ${id} has successfully deleted`,
            data: Object(deletePrincipal)
        }

        return response;
    }
}

export default PrincipalService;