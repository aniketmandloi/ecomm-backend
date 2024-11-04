import createError from "http-errors";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import prisma from "../prisma";
import envVars from "../config";

const saltRounds = parseInt(envVars.SALT_ROUNDS);

export const AuthService = {
  async register(data: any): Promise<any> {
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

      // Use bcrypt to hash password and store it
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      return await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async login(data: any): Promise<User> {
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

      if (!user.password) {
        throw createError(401, "Incorrect username or password!");
      }

      // Use bcrypt to compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw createError(401, "Incorrect username or password!");
      }

      return user;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async googleLogin(profile: {
    id: string;
    displayName: string;
  }): Promise<User | null> {
    const { id, displayName } = profile;
    try {
      const user = await prisma.user.findFirst({
        where: {
          google: {
            path: ["id"],
            equals: id,
          },
        },
      });

      if (!user) {
        return await prisma.user.create({
          data: {
            google: { id, displayName },
          },
        });
      }

      return user;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },

  async facebookLogin(profile: {
    id: string;
    displayName: string;
  }): Promise<User | null> {
    const { id, displayName } = profile;
    try {
      const user = await prisma.user.findFirst({
        where: {
          facebook: {
            path: ["id"],
            equals: id,
          },
        },
      });

      if (!user) {
        return await prisma.user.create({
          data: {
            facebook: { id, displayName },
          },
        });
      }

      return user;
    } catch (err: any) {
      throw createError(500, err.message);
    }
  },
};
