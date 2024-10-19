import createError from "http-errors";
import { User } from "@prisma/client";
import prisma from "../prisma";

interface UpdateUserData {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  google?: any;
  facebook?: any;
}

export const UserService = {
  async list(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async updateUserById(data: UpdateUserData): Promise<User | null> {
    const { id, ...updateData } = data;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: updateData,
      });
      return updatedUser;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },
};
