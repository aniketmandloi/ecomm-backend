import passport from "passport";
import { routeLoader } from "../routes";
import { expressLoader } from "./express";
import { Express } from "express";

export const loaders = async (app: Express) => {
  expressLoader(app);
  routeLoader(app, passport);
};
