/*
  Warnings:

  - You are about to drop the column `tapeId` on the `Song` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_tapeId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "tapeId";

-- CreateTable
CREATE TABLE "_SongToTape" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SongToTape_AB_unique" ON "_SongToTape"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToTape_B_index" ON "_SongToTape"("B");

-- AddForeignKey
ALTER TABLE "_SongToTape" ADD FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToTape" ADD FOREIGN KEY ("B") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;
