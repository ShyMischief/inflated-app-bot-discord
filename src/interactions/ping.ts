import 'reflect-metadata';
import { NextFunction, Request, Response } from "express";
import { InteractionHandler } from "../types/interactionhandler";
import { container } from "tsyringe";
import DiscordService from "../services/discord.service";

const discordService = container.resolve(DiscordService);

async function handler(req: Request, res: Response, next: NextFunction) {

    const APPLICATION_ID = process.env.DISCORD_APPLICATION_ID!;
    const { type, data, token } = req.body;
    const { id, options, type: commandType } = data;

    console.log({ options });

    if (!options || options[0].value == false)
        return res.status(200).json({ type: 4, data: { content: 'Pong!' }});

    // Deferred response
    res.status(200).json({ type: 5 });

    //wait 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Edit original response
    await discordService.client.api.interactions.editReply(APPLICATION_ID, token, { content: 'Pong!' });
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