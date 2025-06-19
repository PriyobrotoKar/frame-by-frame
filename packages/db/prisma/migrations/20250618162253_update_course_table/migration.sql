-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "currency" TEXT DEFAULT 'INR',
ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "price" INTEGER;
