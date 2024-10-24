import prisma from "../prisma";
import { Cart, CartItem } from "@prisma/client";
import { get } from "http";
import createError from "http-errors";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

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

  async checkout(cartId: number, userId: number, paymentInfo: any) {
    try {
      const stripe = 

      const cartItems = await prisma.cartItem.findMany({
        where: {cartId}
      });

      if ()
    }
  }
};
