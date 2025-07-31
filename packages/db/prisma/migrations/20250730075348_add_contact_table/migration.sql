-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "contentFrequency" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "desiredIncome" TEXT NOT NULL,
    "currentIncome" TEXT NOT NULL,
    "interest" TEXT NOT NULL,
    "amountToInvest" TEXT NOT NULL,
    "bookedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");
