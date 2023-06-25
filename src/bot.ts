import 'reflect-metadata';
import { container } from 'tsyringe';
import ExpressService from './services/express.service';
import DiscordService from './services/discord.service';
import OpenAI from './services/openai.service';

async function close() {
    await container.resolve(ExpressService).stop();
    await container.resolve(DiscordService).stop();
    await container.resolve(OpenAI).stop();
}

async function init() {
    await container.resolve(ExpressService).init();
    await container.resolve(DiscordService).init();
    await container.resolve(OpenAI).init();
}

async function start() {
    await container.resolve(ExpressService).start();
    await container.resolve(DiscordService).start();
    await container.resolve(OpenAI).start();
}

async function main() {
    process.on('SIGINT', close);
    process.on('SIGTERM', close);

    await init();
    await start();
}

main();