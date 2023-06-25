import { RouteHandler } from "../types/routehandler";
import { Router } from "express";

const router = Router();

router.all('/', (req, res) => { res.send('Hello World!') });

export default {
    route: '/test',
    router
} as RouteHandler;