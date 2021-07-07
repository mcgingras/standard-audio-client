/*
  Warnings:

  - You are about to drop the `_SongToSongsOnTapes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SongsOnTapesToTape` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SongToSongsOnTapes" DROP CONSTRAINT "_SongToSongsOnTapes_A_fkey";

-- DropForeignKey
ALTER TABLE "_SongToSongsOnTapes" DROP CONSTRAINT "_SongToSongsOnTapes_B_fkey";

-- DropForeignKey
ALTER TABLE "_SongsOnTapesToTape" DROP CONSTRAINT "_SongsOnTapesToTape_A_fkey";

-- DropForeignKey
ALTER TABLE "_SongsOnTapesToTape" DROP CONSTRAINT "_SongsOnTapesToTape_B_fkey";

-- AlterTable
ALTER TABLE "SongsOnTapes" ALTER COLUMN "tapeId" DROP NOT NULL,
ALTER COLUMN "songId" DROP NOT NULL;

-- DropTable
DROP TABLE "_SongToSongsOnTapes";

-- DropTable
DROP TABLE "_SongsOnTapesToTape";
