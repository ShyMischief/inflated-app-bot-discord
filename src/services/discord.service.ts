import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { Service } from "../types/service";
import { Client, GatewayDispatchEvents, GatewayIntentBits } from "@discordjs/core";
import { singleton } from "tsyringe";

@singleton()
export default class DiscordService implements Service {

    public rest: REST;
    public gateway: WebSocketManager;
    public client: Client;

    constructor() {
        this.rest = new REST({ version: '10'}).setToken(process.env.DISCORD_TOKEN!);
        this.gateway = new WebSocketManager({ token: process.env.DISCORD_TOKEN!, rest: this.rest, intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages });
        this.client = new Client({ gateway: this.gateway, rest: this.rest });
    }

    async init() {
        this.client.on(GatewayDispatchEvents.Ready, (event) => {
            console.log(`Logged in as ${event.data.user.username}#${event.data.user.discriminator}!`);
        });
    }

    async start() {
        await this.gateway.connect();
    }

    async stop() {
        await this.gateway.destroy();
    }

}