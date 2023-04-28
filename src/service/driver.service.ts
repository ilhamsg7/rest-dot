import { createPaginator } from "prisma-pagination";
import { Prisma } from "@prisma/client";
import "dotenv/config";
import { DriverListResponse, DriverRequestResponses, DriverRequestResponse, DriverResponse } from "../packages/driver";
import { CreateDriverRequest, UpdateDriverRequest } from "../packages/driver/request";
import { SearchRequest } from "../packages/base/search";
const paginate = createPaginator({ perPage: 5 });
import prisma from "../utils/prisma";

class DriverService {
    async getAllDrivers(pages: number, data: SearchRequest): Promise<DriverListResponse> {
        const getAllDriver = await paginate<
            DriverResponse, Prisma.DriverFindManyArgs
        >(
            prisma.driver,
                {
                    select: {
                        id: true,
                        name: true,
                        placeOfBirth: true,
                        dateOfBirth: true,
                        nationality: true,
                        carNumber: true,
                        team: {
                            select: {
                                name: true,
                                base: true,
                                founded: true,
                                chasis: true,
                                entryYear: true,
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
            const response: DriverListResponse = {
                message: "All Driver in Formula 1",
                data: getAllDriver.data,
                meta: getAllDriver.meta
            }
            return response;
    }

    async getDriverById(id: string): Promise<DriverRequestResponses> {
        const getDriverById = await prisma.driver.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                placeOfBirth: true,
                dateOfBirth: true,
                nationality: true,
                carNumber: true,
                team: {
                    select: {
                        name: true,
                    }
                },
                createdAt: true,
            }
        });

        const response: DriverRequestResponses = {
            message: "Driver by Id",
            data: Object(getDriverById)
        }
        return response;
    }

    async createDriver(data: CreateDriverRequest): Promise<DriverRequestResponses> {
        try {
            const createDriver = await prisma.driver.create({
                data: data,
                select: {
                    id: true,
                    name: true,
                    placeOfBirth: true,
                    dateOfBirth: true,
                    nationality: true,
                    carNumber: true,
                    teamId: true,
                    createdAt: true,
                },
            });

            if(createDriver === null) {
                throw new Error("Failed to create driver");
            }

            const response: DriverRequestResponses = {
                message: "Driver created successfully",
                data: Object(createDriver)
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    async updateDriver(id: string, data: UpdateDriverRequest): Promise<DriverRequestResponses> {
        const updateDriver = await prisma.driver.update({
            where: { id: id },
            data: { ...data },
            select: {
                id: true,
                name: true,
                placeOfBirth: true,
                dateOfBirth: true,
                nationality: true,
                carNumber: true,
                teamId: true,
                createdAt: true,
            }
        });

        const response: DriverRequestResponses = {
            message: "Driver updated successfully",
            data: {
                ...updateDriver,
                createdAt: updateDriver.createdAt.toISOString(),
            }
        }

        return response;
    }

    async deleteDriver(id: string): Promise<DriverRequestResponses> {
        const deleteDriver = await prisma.driver.update({
            where: { id: id },
            data: { deletedAt: new Date() },
        });

        const response: DriverRequestResponses = {
            message: `Driver with id ${id} has successfully deleted`,
        }
        return response;
    }
}

export default DriverService;