/*
  Warnings:

  - You are about to drop the column `bookedAt` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookingId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BookingCreator" AS ENUM ('USER', 'APP');

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "bookedAt",
ADD COLUMN     "bookingId" TEXT;

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "createdBy" "BookingCreator" NOT NULL DEFAULT 'APP',
    "eventId" TEXT,
    "bookedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_bookingId_key" ON "Contact"("bookingId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
