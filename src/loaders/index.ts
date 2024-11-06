import passport from "passport";
import { routeLoader } from "../routes";
import { expressLoader } from "./express";
import { passportLoader } from "./passport";
import {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";

export const loaders = async (app: Express) => {
  // Load express middleware
  const expressApp = await expressLoader(app);

  // Load Passport middleware
  const passport = await passportLoader(expressApp);

  // Load API route handlers
  await routeLoader(app, passport);

  // Error Handler
  // Error Handler
  const errorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { message, status } = err;

    // Set a default status if undefined
    const statusCode = status || 500;

    console.error("Error:", message); // Log error message for debugging
    res.status(statusCode).send({ message });
  };

  app.use(errorHandler);
};
