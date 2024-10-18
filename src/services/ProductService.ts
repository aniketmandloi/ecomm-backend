import createError from "http-errors";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

export const ProductService = {
  async list(options: any): Promise<Product[]> {
    try {
      const products = await prisma.product.findMany({
        where: options,
      });
      return products;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async getProductById(id: number): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      return product;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },
};