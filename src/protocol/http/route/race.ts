
import { Route } from '../../../core/interfaces';
import { Router } from 'express';
import RaceController from '../controller/race';

class RaceRoute implements Route {
    public path = '/api/race';
    public router = Router();

    public RaceController = new RaceController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}/search`,
            this.RaceController.searchRace
        );

    }
}

export default RaceRoute;