import 'reflect-metadata';
import { NextFunction, Request, Response } from "express";
import { InteractionHandler } from "../types/interactionhandler";
import { container } from "tsyringe";
import DiscordService from "../services/discord.service";
import { request as httpsRequest } from 'node:https';
import { ClientRequest } from 'node:http';
import OpenAI from '../services/openai.service';
import { buffer } from 'stream/consumers';

const discordService = container.resolve(DiscordService);
const openAiService = container.resolve(OpenAI);

async function handler(req: Request, res: Response, next: NextFunction) {
    // Deferred response
    res.status(200).json({ type: 5 });

    // Get the prompt
    const { options } = req.body.data;
    const prompt = options[0].value;

    // Get the response from OpenAI
    const response = await openAiService.api.createChatCompletion({
        model: 'gpt-3.5-turbo-16k-0613',
        messages: [
            { role: 'system', content: prompt }
        ]
    });

    // Send the response
    await discordService.client.api.interactions.editReply(process.env.DISCORD_APPLICATION_ID!, req.body.token, { content: response.data.choices[0].message?.content });
}

export default {
    data: {
        name: 'ask',
        description: 'Ask the bot a question!',
        dm_permission: false,
        options: [
            {
                name: 'prompt',
                description: 'The prompt to ask the bot',
                type: 3,
                required: true
            }
        ]
    },
    handler
} as InteractionHandler