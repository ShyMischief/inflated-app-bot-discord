import { Configuration, OpenAIApi } from "openai";
import { Service } from "../types/service";
import { singleton } from "tsyringe";

@singleton()
export default class OpenAI implements Service {

    public configuation: Configuration;
    public api: OpenAIApi;

    constructor() {
        this.configuation = new Configuration({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.api = new OpenAIApi(this.configuation);
    }

    async init() {}

    async start() {}

    async stop() {}

}