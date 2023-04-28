import { createPaginator } from "prisma-pagination";
import { Prisma } from "@prisma/client";
import "dotenv/config";
import prisma from "../utils/prisma";
import { SearchRequest } from "../packages/base/search";
import { PowerUnitListResponse, PowerUnitRequestResponse, PowerUnitRequestResponses, PowerUnitResponse } from "../packages/power-unit";
import { CreatePowerUnitRequest, UpdatePowerUnitRequest } from "../packages/power-unit/request";
const paginate = createPaginator({ perPage: 5 });

class PowerUnitService {
    async getAllPowerUnit(pages: number, search: SearchRequest): Promise<PowerUnitListResponse> {
        const getAllPowerUnit = await paginate<
            PowerUnitResponse, Prisma.PowerUnitFindManyArgs
        >(
            prisma.powerUnit,
                {
                    select: {
                        id: true,
                        name: true,
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
            const response: PowerUnitListResponse = {
                message: "All Power Unit in Formula 1",
                data: getAllPowerUnit.data,
                meta: getAllPowerUnit.meta
            }
            return response;
    }

    async getPowerUnitById(id: string): Promise<PowerUnitRequestResponses> {
        const getPowerUnitById = await prisma.powerUnit.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                name: true,
                createdAt: true,
            }
        });
        const response: PowerUnitRequestResponses = {
            message: "Power Unit Detail",
            data: Object(getPowerUnitById)
        }
        return response;
    }

    async createPowerUnit(data: CreatePowerUnitRequest): Promise<PowerUnitRequestResponses> {
        try {
            const createPowerUnit = await prisma.powerUnit.create({
                data: {
                    name: data.name
                },
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                }
            });

            if(!createPowerUnit) throw new Error("Failed to create Power Unit");

            const response: PowerUnitRequestResponses = {
                message: "Power Unit Created",
                data: Object(createPowerUnit)
            }
            return response;
        } catch (err) {
            throw err;
        }
    }

    async updatePowerUnit(id: string, data: UpdatePowerUnitRequest): Promise<PowerUnitRequestResponses> {
        const updatePowerUnit = await prisma.powerUnit.update({
            where: {
                id: id
            },
            data: data
        });

        if(!updatePowerUnit) throw new Error("Failed to update Power Unit");
        const response: PowerUnitRequestResponses = {
            message: `Power Unit with id ${id} has successfully updated`,
        }

        return response;
    }

    async deletePowerUnit(id: string): Promise<PowerUnitRequestResponses> {
        const deletePowerUnit = await prisma.powerUnit.update({
            where: {
                id: id
            },
            data: {
                deletedAt: new Date()
            }
        });

        if(!deletePowerUnit) throw new Error("Failed to delete Power Unit");
        const response: PowerUnitRequestResponses = {
            message: `Power Unit with id ${id} has successfully deleted`,
        }

        return response;
    }
}

export default PowerUnitService;