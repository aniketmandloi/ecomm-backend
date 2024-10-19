import express, { Application, NextFunction, Response, Request } from "express";
import { UserService } from "../services/UserService";

const router = express.Router();

export const userRoute = (app: Application) => {
  app.use("/api/users", router);

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.list();
      res.status(200).send(users);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;
        const response = await UserService.getUserById(parseInt(userId));
        res.status(200).json(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { userId } = req.params;
        const data = req.body;

        const response = await UserService.updateUserById({
          id: parseInt(userId),
          ...data,
        });
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
