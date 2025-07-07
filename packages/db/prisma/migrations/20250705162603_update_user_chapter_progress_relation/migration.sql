-- DropForeignKey
ALTER TABLE "UserChapterProgress" DROP CONSTRAINT "UserChapterProgress_chapterId_fkey";

-- AddForeignKey
ALTER TABLE "UserChapterProgress" ADD CONSTRAINT "UserChapterProgress_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
