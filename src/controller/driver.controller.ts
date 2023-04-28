import { type Request, type Response } from "express";
import "reflect-metadata";
import { autoInjectable, inject, injectable } from "tsyringe";
import { wrapError } from "../utils/wrap";
import DriverService from "../service/driver.service";
import { StatusCodes } from "http-status-codes";
import { searchRequest } from "../packages/base/search";
import { createDriverRequest, updateDriverRequest } from "../packages/driver/request";

@injectable()
class DriverController {
    constructor(@inject(DriverService) public service: DriverService) {}

    async getAllDrivers(req: Request, res: Response) {
        await wrapError(res, async () => {
            const pages = req.query.page;
            const search = searchRequest.parse(req.query);
            const response = await this.service.getAllDrivers(Number(pages), search);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async getDriverById(req: Request, res: Response) {
        await wrapError(res, async () => {
            const id = req.params.id;
            const response = await this.service.getDriverById(id);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async createDriver(req: Request, res: Response) {
        await wrapError(res, async () => {
            const body = createDriverRequest.parse(req.body);
            const response = await this.service.createDriver(body);
            res.status(StatusCodes.CREATED).json(response);
        });
    }

    async updateDriver(req: Request, res: Response) {
        await wrapError(res, async () => {
            const id = req.params.id;
            const body = updateDriverRequest.parse(req.body);
            const response = await this.service.updateDriver(id, body);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async deleteDriver(req: Request, res: Response) {
        await wrapError(res, async () => {
            const id = req.params.id;
            const response = await this.service.deleteDriver(id);
            res.status(StatusCodes.OK).json(response);
        });
    }
}

export default DriverController;