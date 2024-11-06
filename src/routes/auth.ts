import express, { Express, NextFunction, Request, Response } from "express";
import { PassportStatic } from "passport";
import { AuthService } from "../services/AuthService";
import { User } from "@prisma/client";
import { CartService } from "../services/CartService";
import { UserService } from "../services/UserService";

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

  router.get(
    "/logged_in",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.user as User;

        const cart = await CartService.loadCart(id);
        const user = await UserService.getUserById(id);

        res.status(200).send({
          user,
          loggedIn: true,
          cart,
        });
      } catch (err) {
        next(err);
      }
    }
  );
};
