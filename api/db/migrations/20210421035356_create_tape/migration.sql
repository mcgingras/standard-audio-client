-- CreateTable
CREATE TABLE "Tape" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "style" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
