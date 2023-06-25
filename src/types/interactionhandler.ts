import { NextFunction, Request, Response } from "express";
import { RESTPostAPIApplicationCommandsJSONBody } from '@discordjs/core';

export interface InteractionHandler {

    data: RESTPostAPIApplicationCommandsJSONBody;
    handler: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    
}