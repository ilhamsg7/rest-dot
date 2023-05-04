import { injectable, inject } from "tsyringe";
import "reflect-metadata";
import { createDriverRequest, updateDriverRequest } from "../packages/driver/request";
import PowerUnitService from "../service/power-unit.service";
import { searchRequest } from "../packages/base/search";
import { type Request, type Response } from "express";
import { wrapError } from "../utils/wrap";
import { StatusCodes } from "http-status-codes";
import { createPowerUnitRequest } from "../packages/power-unit/request";

@injectable()
class PowerUnitController {
    constructor(@inject(PowerUnitService) private service: PowerUnitService) {}

    async getAllPowerUnit(req: Request, res: Response) {
        await wrapError(res, async() => {
            const pages = req.query.page;
            const search = searchRequest.parse(req.query);
            const response = await this.service.getAllPowerUnit(Number(pages), search);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async getPowerUnitById(req: Request, res: Response) {
        await wrapError(res, async() => {
            const id = req.params.id;
            const response = await this.service.getPowerUnitById(id);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async createPowerUnit(req: Request, res: Response) {
        await wrapError(res, async() => {
            const inputData = createPowerUnitRequest.parse(req.body);
            const response = await this.service.createPowerUnit(inputData);
            res.status(StatusCodes.CREATED).json(response);
        });
    }

    async updatePowerUnit(req: Request, res: Response) {
        await wrapError(res, async() => {
            const id = req.params.id;
            const inputData = updateDriverRequest.parse(req.body);
            const response = await this.service.updatePowerUnit(id, inputData);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async deletePowerUnit(req: Request, res: Response) {
        await wrapError(res, async() => {
            const id = req.params.id;
            const response = await this.service.deletePowerUnit(id);
            res.status(StatusCodes.OK).json(response);
        });
    }
}

export default PowerUnitController;