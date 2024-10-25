import express, { Application, NextFunction, Response, Request } from "express";
import { CartService } from "../services/CartService";
import { User } from "@prisma/client";

const router = express.Router();

export const cartRouter = (app: Application) => {
  app.use("/api/carts", router);

  router.get(
    "/mine",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.user as User;
        const response = await CartService.loadCart(id);
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/mine",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.user as User;
        const data = req.body;
        const response = await CartService.get({ id });
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/mine",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.user as User;

        const response = await CartService.create(id);
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/mine/items",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.user as User;
        const data = req.body;

        const response = await CartService.addItem(id, data);
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "mine/items/:cartItemId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { cartItemId } = req.params;
        const data = req.body;

        const response = await CartService.updateItem(
          parseInt(cartItemId),
          data
        );
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "mine/items/:cartItemId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { cartItemId } = req.params;
        const response = await CartService.removeItem(parseInt(cartItemId));
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );

  // router.post(
  //   "/mine/checkout",
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const { id } = req.user as User;
  //       const { cartId, paymentInfo } = req.body;

  //       const response = await CartService.checkout(id, cartId, paymentInfo);
  //       res.status(200).send(response);
  //     } catch (err) {
  //       next(err);
  //     }
  //   }
  // );
};
