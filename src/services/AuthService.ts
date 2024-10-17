import createError from "http-errors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const AuthService = {
  async register(data: any) {
    const { email } = data;
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (user) {
        throw createError(409, "Email is already taken!");
      }
      return await prisma.user.create(data);
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },
};
