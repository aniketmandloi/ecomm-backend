import express, { Express, NextFunction, Request, Response } from "express";
import { PassportStatic } from "passport";
import { AuthService } from "../services/AuthService";

const router = express.Router();

export const authRouter = (app: Express, passport: PassportStatic) => {
  app.use("/api/auth", router);

  // Registration Endpoint
  router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body;
        // console.log(data);
        const response = await AuthService.register(data);
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  // Login Endpoint
  router.post(
    "/login",
    passport.authenticate("local"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password } = req.body;
        // console.log(username);
        const response = await AuthService.login({ email: username, password });
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
