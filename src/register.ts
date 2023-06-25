import fs from 'node:fs/promises';
import path from 'node:path';
import { InteractionHandler } from './types/interactionhandler';
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from '@discordjs/core';
import { REST } from '@discordjs/rest';

async function register() {

    // Load the environment variables
    const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID!;
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN!;
    
    // Load the discord client
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
    
    // Load the interaction handlers
    const interactionFiles = await fs.readdir(path.join(__dirname, 'interactions'));
    
    const interactionData: RESTPostAPIApplicationCommandsJSONBody[] = interactionFiles.map(file => {
        const handler = (require(path.join(__dirname, 'interactions', file)).default as InteractionHandler);
        return handler.data;
    });
    
    // Register the interaction handlers
    try {
        const result = await rest.put(Routes.applicationCommands(DISCORD_APPLICATION_ID), { body: interactionData });
        console.log(result);
    } catch (err) {
        console.error(err);
    }

}

register();