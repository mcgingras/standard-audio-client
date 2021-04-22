/*
  Warnings:

  - Changed the type of `capacity` on the `Tape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quality` on the `Tape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `style` on the `Tape` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Tape" DROP COLUMN "capacity",
ADD COLUMN     "capacity" INTEGER NOT NULL,
DROP COLUMN "quality",
ADD COLUMN     "quality" INTEGER NOT NULL,
DROP COLUMN "style",
ADD COLUMN     "style" INTEGER NOT NULL;
