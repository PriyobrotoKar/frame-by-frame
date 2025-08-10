/*
  Warnings:

  - A unique constraint covering the columns `[courseVersionId,slug]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterId,slug]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterId,slug]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_documentId_fkey";

-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_videoId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_chapterId_fkey";

-- DropIndex
DROP INDEX "Chapter_slug_key";

-- DropIndex
DROP INDEX "Document_slug_key";

-- DropIndex
DROP INDEX "Video_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_courseVersionId_slug_key" ON "Chapter"("courseVersionId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Document_chapterId_slug_key" ON "Document"("chapterId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Video_chapterId_slug_key" ON "Video"("chapterId", "slug");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;
