import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const db = globalForPrisma.prisma || new PrismaClient();
export * from '../generated/prisma';

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
