// Node imports
import { Server } from "node:http";
import fs from 'node:fs/promises';
import path from 'node:path';

// NPM imports
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import { singleton } from "tsyringe";

// Local imports
import { RouteHandler } from "../types/routehandler";
import { Service } from "../types/service";

@singleton()
export default class ExpressService implements Service {

    public app: Application;
    public server!: Server

    constructor() {
        this.app = express();
    }

    async init() {

        this.app.use(morgan('combined'));
        this.app.use(cors());
        this.app.use(express.json());

        // Load routers
        const routerFiles = await fs.readdir(path.join(__dirname, '..', 'routers'));
        routerFiles.forEach(async file => {
            const router = (await import(path.join(__dirname, '..', 'routers', file))).default as RouteHandler;
            this.app.use(router.route, router.router);
        });

    }

    async start() {

        this.server = this.app.listen(80, () => {
            console.log('Server started on port 80');
        });

    }

    async stop() {

        this.server.closeAllConnections();
        this.server.close(() => {
            console.log('Server stopped');
        });

    }

}