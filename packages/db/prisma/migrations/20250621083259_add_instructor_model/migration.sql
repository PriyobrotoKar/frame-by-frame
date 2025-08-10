-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "specialization" TEXT,
    "profilePic" TEXT,
    "experienceYears" INTEGER NOT NULL DEFAULT 0,
    "followers" INTEGER NOT NULL DEFAULT 0,
    "revenue" INTEGER NOT NULL DEFAULT 0,
    "courseVersionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_courseVersionId_fkey" FOREIGN KEY ("courseVersionId") REFERENCES "CourseVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
