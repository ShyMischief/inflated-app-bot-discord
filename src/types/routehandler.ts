import { NextFunction, Request, Response, Router } from "express";

export interface RouteHandler {

    route: string | RegExp;
    router: Router;

}