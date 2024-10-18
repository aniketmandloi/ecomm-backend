import passport from "passport";
import { routeLoader } from "../routes";
import { expressLoader } from "./express";
import { passportLoader } from "./passport";
import { Express } from "express";

export const loaders = async (app: Express) => {
  // Load express middleware
  const expressApp = await expressLoader(app);

  // Load Passport middleware
  const passport = await passportLoader(expressApp);

  // Load API route handlers
  await routeLoader(app, passport);

  // Error Handler
  app.use((err: any, req: any, res: any, next: any) => {
    const { message, status } = err;

    return res.status(status).send({ message });
  });
};
