import { NextFunction, Request, Response } from "express";
import { InteractionHandler } from "../types/interactionhandler";

async function handler(req: Request, res: Response, next: NextFunction) {

    const {  } = req.body.data;
    console.log(req.body);

    res.status(200).json({ type: 4, data: { content: 'Pong!' }});

}

export default {
    data: {
        name: 'ping',
        description: 'Ping the bot',
        dm_permission: false,
        options: [
            {
                name: 'defer',
                description: 'Whether to defer the response',
                type: 5,
            }
        ]
    },
    handler
} as InteractionHandler