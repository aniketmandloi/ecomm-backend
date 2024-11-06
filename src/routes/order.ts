import { User } from "@prisma/client";
import express, { Application, NextFunction, Request, Response } from "express";
import { OrderService } from "../services/OrderService";

const router = express.Router();

export const orderRouter = (app: Application) => {
  app.use("/api/order", router);

  // router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { id } = req.user as User;

  //     const response = await OrderService.list(id);
  //     res.status(200).send(response);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  router.get(
    "/orderId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { orderId } = req.params;

        const response = await OrderService.findById(parseInt(orderId));
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
