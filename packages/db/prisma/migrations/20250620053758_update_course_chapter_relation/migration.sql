/*
  Warnings:

  - You are about to drop the column `courseId` on the `Chapter` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_courseId_fkey";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "courseId",
ADD COLUMN     "courseVersionId" TEXT;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_courseVersionId_fkey" FOREIGN KEY ("courseVersionId") REFERENCES "CourseVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
