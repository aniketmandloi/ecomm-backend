import { PassportStatic } from "passport";
import { authRouter } from "./auth";
import { Express } from "express";
import { productRouter } from "./product";
import { userRoute } from "./user";
import { cartRouter } from "./cart";

export const routeLoader = (app: Express, passport: PassportStatic) => {
  authRouter(app, passport);
  productRouter(app);
  userRoute(app);
  cartRouter(app);
};
