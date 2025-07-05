-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_documentId_fkey";

-- DropForeignKey
ALTER TABLE "UserActivity" DROP CONSTRAINT "UserActivity_videoId_fkey";

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
