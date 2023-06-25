import { verifyInteraction } from "../helpers/verifyInteraction";
import { RouteHandler } from "../types/routehandler";
import { Router } from "express";
import path from 'node:path';
import fs from 'node:fs/promises';

const router = Router();

router.post('/', verifyInteraction(process.env.DISCORD_PUBLIC_KEY!), async (req, res, next) => {

    // Get relevant data from the request
    const { type, data } = req.body;

    // Ping interactions
    if (type === 1) return res.status(200).json({ type: 1 });

    // Autocomplete interactions
    if (type === 3) {
        console.log('Autocomplete interaction received', JSON.stringify(data, null, 2));
    }

    // search for the interaction handler
    const handlerPath = path.join(__dirname, '..', 'interactions', `${data.name}.js`);

    try {
        // If the handler exists, run it
        const handler = (await import(handlerPath)).default;
        return handler.handler(req, res, next);
    } catch (err) {
        // Otherwise, return an error
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while handling the interaction' });
    }

});

export default {
    route: '/interactions',
    router
} as RouteHandler;