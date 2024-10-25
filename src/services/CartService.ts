import prisma from "../prisma";
import { Cart, CartItem, Order } from "@prisma/client";
import { get } from "http";
import createError from "http-errors";
import Stripe from "stripe";
import envVars from "../config";

// Init Stripe with secret key
// const stripe = new Stripe(envVars.STRIPE_SECRET_KEY);

export const CartService = {
  async create(userId: number): Promise<Cart> {
    try {
      const cart = await prisma.cart.create({
        data: { userId },
      });
      return cart;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async loadCart(userId: number): Promise<Cart | null> {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: userId,
        },
        include: {
          items: true,
        },
      });
      return cart;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async get(data: any): Promise<Cart | null> {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: data.id,
        },
        include: {
          items: true,
        },
      });
      return cart;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async addItem(
    userId: number,
    item: Omit<CartItem, "cartId">
  ): Promise<CartItem> {
    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id: userId,
        },
      });

      if (!cart) {
        throw createError(404, "Cart not found");
      }

      const cartItem = await prisma.cartItem.create({
        data: { cartId: cart.id, ...item },
      });

      return cartItem;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async updateItem(
    cartItemId: number,
    data: Partial<CartItem>
  ): Promise<CartItem> {
    try {
      const cartItem = await prisma.cartItem.update({
        where: {
          id: cartItemId,
        },
        data: data,
      });
      return cartItem;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async removeItem(cartItemId: number): Promise<CartItem> {
    try {
      const cartItem = await prisma.cartItem.delete({
        where: {
          id: cartItemId,
        },
      });
      return cartItem;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  // async checkout(
  //   cartId: number,
  //   userId: number,
  //   paymentInfo: any
  // ): Promise<any> {
  //   try {
  //     // Load cart items
  //     const cartItems = await prisma.cartItem.findMany({
  //       where: { cartId },
  //       include: {
  //         product: true,
  //       },
  //     });

  //     if (cartItems.length === 0) throw createError(400, "Cart is empty");

  //     // Generate total price from cart items
  //     const total = cartItems.reduce(
  //       (total, item) => total + Number(item.product.price) * item.qty,
  //       0
  //     );

  //     // Generate initial order
  //     const order = await prisma.order.create({
  //       data: {
  //         total,
  //         userId: userId,
  //         status: "PENDING",
  //         items: {
  //           create: cartItems.map((item) => ({
  //             productId: item.productId,
  //             qty: item.qty,
  //             price: Number(item.product.price),
  //             name: item.product.name,
  //             description: item.product.description,
  //           })),
  //         },
  //       },
  //     });

  //     // Make charge to Payment method
  //     await stripe.charges.create({
  //       amount: total,
  //       currency: "usd",
  //       source: paymentInfo.id,
  //       description: `Order Completion Payment ${order.id}`,
  //     });

  //     // On success update order status
  //     const completedOrder = await prisma.order.update({
  //       where: {
  //         id: order.id,
  //       },
  //       data: {
  //         status: "COMPLETED",
  //       },
  //     });

  //     return completedOrder;
  //   } catch (err: any) {
  //     throw createError(500, err.message);
  //   }
  // },
};
