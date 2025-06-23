/*
  Warnings:

  - A unique constraint covering the columns `[trailerId]` on the table `CourseVersion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CourseVersion" ADD COLUMN     "trailerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CourseVersion_trailerId_key" ON "CourseVersion"("trailerId");

-- AddForeignKey
ALTER TABLE "CourseVersion" ADD CONSTRAINT "CourseVersion_trailerId_fkey" FOREIGN KEY ("trailerId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
