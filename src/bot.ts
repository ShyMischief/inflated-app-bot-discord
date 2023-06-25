import 'reflect-metadata';
import { container } from 'tsyringe';
import ExpressService from './services/express.service';

async function close() {
    await container.resolve(ExpressService).stop();
}

async function init() {
    await container.resolve(ExpressService).init();
}

async function start() {
    await container.resolve(ExpressService).start();
}

async function main() {
    process.on('SIGINT', close);
    process.on('SIGTERM', close);

    await init();
    await start();
}

main();