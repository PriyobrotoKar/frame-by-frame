-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "videoTrashId" TEXT;

-- CreateTable
CREATE TABLE "VideoTrash" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "order" INTEGER NOT NULL,
    "status" "VideoStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "duration" INTEGER NOT NULL DEFAULT 0,
    "courseVersionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VideoTrash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttachmentTrash" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" "AttachmentType" NOT NULL,
    "size" INTEGER NOT NULL,
    "courseVersionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttachmentTrash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoTrash_courseVersionId_slug_key" ON "VideoTrash"("courseVersionId", "slug");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_videoTrashId_fkey" FOREIGN KEY ("videoTrashId") REFERENCES "VideoTrash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoTrash" ADD CONSTRAINT "VideoTrash_courseVersionId_fkey" FOREIGN KEY ("courseVersionId") REFERENCES "CourseVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttachmentTrash" ADD CONSTRAINT "AttachmentTrash_courseVersionId_fkey" FOREIGN KEY ("courseVersionId") REFERENCES "CourseVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
