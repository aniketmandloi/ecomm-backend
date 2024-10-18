import { PassportStatic } from "passport";
import { authRouter } from "./auth";
import { Express } from "express";
import { productRouter } from "./product";

export const routeLoader = (app: Express, passport: PassportStatic) => {
  authRouter(app, passport);
  productRouter(app);
};
