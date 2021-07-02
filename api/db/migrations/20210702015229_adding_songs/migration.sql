-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "tapeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Song" ADD FOREIGN KEY ("tapeId") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;
