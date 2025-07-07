/*
  Warnings:

  - You are about to drop the column `videoTrashId` on the `Attachment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_videoTrashId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "videoTrashId";
