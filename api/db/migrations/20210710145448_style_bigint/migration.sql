/*
  Warnings:

  - You are about to alter the column `capacity` on the `Tape` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Tape" ALTER COLUMN "capacity" SET DATA TYPE INTEGER,
ALTER COLUMN "style" SET DATA TYPE BIGINT;
