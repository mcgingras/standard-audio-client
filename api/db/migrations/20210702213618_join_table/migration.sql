/*
  Warnings:

  - You are about to drop the `_SongToTape` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SongToTape" DROP CONSTRAINT "_SongToTape_A_fkey";

-- DropForeignKey
ALTER TABLE "_SongToTape" DROP CONSTRAINT "_SongToTape_B_fkey";

-- DropTable
DROP TABLE "_SongToTape";

-- CreateTable
CREATE TABLE "SongsOnTapes" (
    "id" SERIAL NOT NULL,
    "tapeId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SongsOnTapesToTape" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SongToSongsOnTapes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SongsOnTapes.tapeId_songId_unique" ON "SongsOnTapes"("tapeId", "songId");

-- CreateIndex
CREATE UNIQUE INDEX "_SongsOnTapesToTape_AB_unique" ON "_SongsOnTapesToTape"("A", "B");

-- CreateIndex
CREATE INDEX "_SongsOnTapesToTape_B_index" ON "_SongsOnTapesToTape"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SongToSongsOnTapes_AB_unique" ON "_SongToSongsOnTapes"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToSongsOnTapes_B_index" ON "_SongToSongsOnTapes"("B");

-- AddForeignKey
ALTER TABLE "SongsOnTapes" ADD FOREIGN KEY ("tapeId") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnTapes" ADD FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongsOnTapesToTape" ADD FOREIGN KEY ("A") REFERENCES "SongsOnTapes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongsOnTapesToTape" ADD FOREIGN KEY ("B") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToSongsOnTapes" ADD FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToSongsOnTapes" ADD FOREIGN KEY ("B") REFERENCES "SongsOnTapes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
