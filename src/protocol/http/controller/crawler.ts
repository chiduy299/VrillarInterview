import { NextFunction, Request, Response } from 'express';
import CrawlerService from '../../../service/crawler';
import { BodyResponse } from '../../../core/utils/response';

export default class CrawlerController {
    private CrawlerService = new CrawlerService();

    public crawlerRaceData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.CrawlerService.crawlerAndInsertDataRace();

            const resp: BodyResponse = new BodyResponse(0, "success", {});
            res.status(200).json(resp);
        } catch (error) {
            next(error);
        }
    };
}