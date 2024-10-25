import createError from "http-errors";
import prisma from "../prisma";
import { Order } from "@prisma/client";

export const OrderService = {
  async list(userId: number): Promise<Order[]> {
    try {
      const orders = await prisma.order.findMany({
        where: {
          userId: userId,
        },
        include: {
          items: true,
        },
      });
      return orders;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async findById(orderId: number): Promise<Order | null> {
    try {
      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
        include: {
          items: true,
        },
      });

      if (!order) {
        throw createError(404, "Order not found");
      }

      return order;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },
};
