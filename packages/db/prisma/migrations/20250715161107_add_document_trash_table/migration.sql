-- CreateTable
CREATE TABLE "DocumentTrash" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "order" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "courseVersionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentTrash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentTrash_courseVersionId_slug_key" ON "DocumentTrash"("courseVersionId", "slug");

-- AddForeignKey
ALTER TABLE "DocumentTrash" ADD CONSTRAINT "DocumentTrash_courseVersionId_fkey" FOREIGN KEY ("courseVersionId") REFERENCES "CourseVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
