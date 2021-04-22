-- AlterTable
ALTER TABLE "Tape" ADD COLUMN     "isClaimed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "claimLock" BOOLEAN NOT NULL DEFAULT false;
