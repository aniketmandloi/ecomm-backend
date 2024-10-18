import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
const prisma = new PrismaClient();

export const AuthService = {
  async register(data: any) {
    const { email, password } = data;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        throw createError(409, "Email is already taken!");
      }
      return await prisma.user.create({
        data: {
          email,
          password,
        },
      });
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async login(data: any) {
    const { email, password } = data;

    try {
      //check if user exists
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw createError(401, "Incorrect username or password!");
      }

      if (user.password !== password) {
        throw createError(401, "Incorrect username or password!");
      }

      return user;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },
};
