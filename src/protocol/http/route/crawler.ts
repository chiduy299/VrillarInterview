
import { Route } from '../../../core/interfaces';
import { Router } from 'express';
import CrawlerController from '../controller/Crawler';

class CrawlerRoute implements Route {
    public path = '/api/crawler';
    public router = Router();

    public CrawlerController = new CrawlerController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(
            `${this.path}/race`,
            this.CrawlerController.crawlerRaceData
        );

    }
}

export default CrawlerRoute;