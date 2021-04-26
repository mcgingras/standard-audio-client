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

-- CreateIndex
CREATE UNIQUE INDEX "Bid_tapeId_unique" ON "Bid"("tapeId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_tapeId_unique" ON "Sale"("tapeId");

-- AddForeignKey
ALTER TABLE "Bid" ADD FOREIGN KEY ("tapeId") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD FOREIGN KEY ("tapeId") REFERENCES "Tape"("id") ON DELETE CASCADE ON UPDATE CASCADE;
