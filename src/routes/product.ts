import express, { Application, NextFunction, Response, Request } from "express";
import { ProductService } from "../services/ProductService";

const router = express.Router();

export const productRouter = (app: Application) => {
  app.use("/api/products", router);

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const queryParams = req.query;

      const response = await ProductService.list(queryParams);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:productId",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const productId = req.params.productId;
        const response = await ProductService.getProductById(
          parseInt(productId)
        );
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
};
