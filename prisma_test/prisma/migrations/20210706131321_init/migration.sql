-- CreateTable
CREATE TABLE "Tape" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "quality" INTEGER NOT NULL,
    "style" INTEGER NOT NULL,
    "proof" TEXT[],
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,
    "claimLock" BOOLEAN NOT NULL DEFAULT false,
    "ipfsHash" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bid" (
    "id" SERIAL NOT NULL,
    "tapeId" INTEGER NOT NULL,
    "bidder" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "tapeId" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "uri" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SongsOnTapes" (
    "id" SERIAL NOT NULL,
    "tapeId" INTEGER,
    "songId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongsOnTapes.tapeId_songId_unique" ON "SongsOnTapes"("tapeId", "songId");

-- AddForeignKey
ALTER TABLE "Bid" ADD FOREIGN KEY ("tapeId") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD FOREIGN KEY ("tapeId") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnTapes" ADD FOREIGN KEY ("tapeId") REFERENCES "Tape"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnTapes" ADD FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;
