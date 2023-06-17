import { NextFunction, Request, Response } from 'express';
import RaceService from '../../../service/Race';
import { BodyResponse } from '../../../core/utils/response';
import SearchRaceDto from '../dtos/race/searchRace';
import { HttpException } from '../../../core/exceptions';

export default class RaceController {
    private RaceService = new RaceService();

    public searchRace = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query as SearchRaceDto;
            let listRace = await this.RaceService.searchRace(query);

            const resp: BodyResponse = new BodyResponse(0, "success", listRace);
            res.status(200).json(resp);
        } catch (error: any) {
            let err = error as HttpException;
            const resp: BodyResponse = new BodyResponse(err.code, err.message, {});
            res.status(400).json(resp);
        }
    };
}