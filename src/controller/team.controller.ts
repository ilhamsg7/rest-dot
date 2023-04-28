import { type Request, type Response } from "express";
import "reflect-metadata";
import { autoInjectable, inject, injectable } from "tsyringe";
import { wrapError } from "../utils/wrap";
import TeamService from "../service/team.service";
import { StatusCodes } from "http-status-codes";
import { searchRequest } from "../packages/base/search";
import { createTeamRequest, updateTeamRequest } from "../packages/team/request";

@injectable()
class TeamController {
    constructor(@inject(TeamService) public service: TeamService) {}

    async getAllTeam(req: Request, res: Response) {
        await wrapError(res, async () => {
            const pages = req.query.page;
            const search = searchRequest.parse(req.query);
            const response = await this.service.getAllTeam(Number(pages), search);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async getTeamById(req: Request, res: Response) {
        await wrapError(res, async () => {
            const id = req.params.id;
            const response = await this.service.getTeamById(id);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async createTeam(req: Request, res: Response) {
        await wrapError(res, async () => {
            const inputData = createTeamRequest.parse(req.body);
            const response = await this.service.createTeam(inputData);
            res.status(StatusCodes.CREATED).json(response);
        });
    }

    async updateTeam(req: Request, res: Response) {
        await wrapError(res, async () => {
            const id = req.params.id;
            const inputData = updateTeamRequest.parse(req.body);
            const response = await this.service.updateTeam(id, inputData);
            res.status(StatusCodes.OK).json(response);
        });
    }

    async deleteTeam(req: Request, res: Response) {
        await wrapError(res, async () => {
            const id = req.params.id;
            const response = await this.service.deleteTeam(id);
            res.status(StatusCodes.OK).json(response);
        });
    }
}

export default TeamController;