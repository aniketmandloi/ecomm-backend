import { PrismaClient } from "@prisma/client";

declare global {
  // Extend the global object with a prisma property
  var prisma: PrismaClient | undefined;
}

export {};
