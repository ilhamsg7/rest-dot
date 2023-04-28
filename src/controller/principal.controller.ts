import "reflect-metadata";
import { type Request, type Response } from "express";
import { inject, injectable } from "tsyringe";
import { wrapError } from "../utils/wrap";
import PrincipalService from "../service/principal.service";
import { searchRequest } from "../packages/base/search";
import { createPrincipalRequest, updateDriverRequest } from "../packages/principal/request";
import { StatusCodes } from "http-status-codes";

@injectable()
class PrincipalController {
    constructor(@inject(PrincipalService) public service: PrincipalService) {}

    async getAllPrincipal(req: Request, res: Response) {
        await wrapError(res, async() => {
            const pages = req.query.page;
            const search = searchRequest.parse(req.query);
            const response = await this.service.getAllPrincipal(Number(pages), search);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async getPrincipalById(req: Request, res: Response) {
        await wrapError(res, async() => {
            const id = req.params.id;
            const response = await this.service.getPrincipalById(id);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async createPrincipal(req: Request, res: Response) {
        await wrapError(res, async() => {
            const inputData = createPrincipalRequest.parse(req.body);
            const response = await this.service.createPrincipal(inputData);
            res.status(StatusCodes.CREATED).json(response);
        });
    }

    async updatePrincipal(req: Request, res: Response) {
        await wrapError(res, async() => {
            const id = req.params.id;
            const inputData = updateDriverRequest.parse(req.body);
            const response = await this.service.updatePrincipal(id, inputData);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async deletePrincipal(req: Request, res: Response) {
        await wrapError(res, async() => {
            const id = req.params.id;
            const response = await this.service.deletePrincipal(id);
            res.status(StatusCodes.OK).json(response);
        });
    }
}

export default PrincipalController;