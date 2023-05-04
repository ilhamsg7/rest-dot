import { createPaginator } from "prisma-pagination";
import { Prisma } from "@prisma/client";
import "dotenv/config";
import prisma from "../utils/prisma";
import { SearchRequest } from "../packages/base/search";
import { TeamListResponse, TeamRequestResponse, TeamRequestResponses, TeamResponse } from "../packages/team";
import { CreateTeamRequest, UpdateTeamRequest } from "../packages/team/request";
const paginate = createPaginator({ perPage: 5 });

class TeamService {
    async getAllTeam(pages: number, search: SearchRequest): Promise<TeamListResponse> {
        const getAllTeam = await paginate<
            TeamResponse, Prisma.TeamFindManyArgs
        >(
            prisma.team,
                {
                    select: {
                        id: true,
                        name: true,
                        base: true,
                        logo: true,
                        founded: true,
                        chasis: true,
                        entryYear: true,
                        powerUnit: {
                            select: {
                                name: true
                            }
                        },
                        principal: {
                            select: {
                                name: true
                            }
                        },
                        createdAt: true,
                    },
                    where: {
                        name: { contains: search.search }
                    },
                    orderBy: {
                        name: "asc"
                    }
                },
                {page: pages}
            );
            const response: TeamListResponse = {
                message: "All Team in Formula 1",
                data: Object(getAllTeam.data),
                meta: getAllTeam.meta
            }
            return response;
    }

    async getTeamById(id: string): Promise<TeamRequestResponses> {
        const getTeamById = await prisma.team.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                base: true,
                logo: true,
                founded: true,
                chasis: true,
                entryYear: true,
                powerUnit: {
                    select: {
                        name: true
                    }
                },
                principal: {
                    select: {
                        name: true
                    }
                },
                createdAt: true,
            }
        });
        const response: TeamRequestResponses = {
            message: "Team Detail",
            data: Object(getTeamById)
        }
        return response;
    }

    async createTeam(data: CreateTeamRequest): Promise<TeamRequestResponses> {
        try {
            const createTeam = await prisma.team.create({
                data: data,
                select: {
                    id: true,
                    name: true,
                    base: true,
                    logo: true,
                    founded: true,
                    chasis: true,
                    entryYear: true,
                    powerUnit: {
                        select: {
                            name: true
                        }
                    },
                    principal: {
                        select: {
                            name: true
                        }
                    },
                    createdAt: true,
                }
            });
            const response: TeamRequestResponses = {
                message: "Team Created",
                data: Object(createTeam)
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    async updateTeam(id: string, data: UpdateTeamRequest): Promise<TeamRequestResponses> {
        const updateTeam = await prisma.team.update({
            where: { id: id },
            data: data,
        });

        const response: TeamRequestResponses = {
            message: `Team with id ${id} has successfully updated`,
            data: Object(updateTeam)
        }
        return response;
    }

    async deleteTeam(id: string): Promise<TeamRequestResponses> {
        const deleteTeam = await prisma.team.delete({
            where: { id: id },
        });

        const response: TeamRequestResponses = {
            message: `Team with id ${id} has successfully deleted`,
            data: Object(deleteTeam)
        }
        return response;
    }
}

export default TeamService;