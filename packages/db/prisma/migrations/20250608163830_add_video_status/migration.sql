-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('NOT_STARTED', 'PENDING', 'PROCESSING', 'READY', 'FAILED');

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "status" "VideoStatus" NOT NULL DEFAULT 'NOT_STARTED';
