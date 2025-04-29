import { PrismaClient } from '../prisma/generated/client';

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const db = globalForPrisma.prisma || new PrismaClient();
export * from '../prisma/generated/client';

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
