
import { Route } from './core/interfaces';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import * as dotenv from 'dotenv';
dotenv.config()

class App {
    private app: express.Application;

    public port: string | number;


    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
    }

    public listen() {
        const http = require('http').createServer(this.app);

        http.listen(this.port, () => {
            console.info(`Server is listening on port ${this.port}`);
        });
    }

    private initializeMiddleware() {
        this.app.use(morgan('combined'));
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    public initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }
    
    private connectToDatabase() {
        const connectString = process.env.MONGODB_URI || "mongodb://localhost:27017";
        if (!connectString) {
            console.error('Connection string is invalid');
            return;
        }

        mongoose.set('strictQuery', true).connect(connectString)
            .catch((reason) => {
                console.error(reason);
            });
        console.info('Database connected...');
    }
    
}

export default App;