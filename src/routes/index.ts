import { PassportStatic } from "passport";
import { authRouter } from "./auth";
import { Express } from "express";

export const routeLoader = (app: Express, passport: PassportStatic) => {
  authRouter(app, passport);
};
