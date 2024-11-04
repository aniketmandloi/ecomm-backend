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

  // Google Login Endpoint
  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] })
  );

  // Google Login Callback Endpoint
  router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req: Request, res: Response): Promise<void> => {
      res.redirect("/");
    }
  );

  // Facebook Login Endpoint
  router.get("/facebook", passport.authenticate("facebook"));

  // Facebook Login Callback Endpoint
  router.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    async (req: Request, res: Response): Promise<void> => {
      res.redirect("/");
    }
  );
};
