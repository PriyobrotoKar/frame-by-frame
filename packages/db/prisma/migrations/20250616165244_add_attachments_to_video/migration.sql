-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_documentId_fkey";

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "videoId" TEXT,
ALTER COLUMN "documentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;
