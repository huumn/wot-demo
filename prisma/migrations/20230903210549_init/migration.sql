-- CreateTable
CREATE TABLE "web" (
    "name" TEXT NOT NULL,

    CONSTRAINT "web_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "prize" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "web_name" TEXT NOT NULL,

    CONSTRAINT "prize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "human" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prize_id" INTEGER NOT NULL,
    "web_name" TEXT NOT NULL,

    CONSTRAINT "human_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trust" (
    "from_id" INTEGER NOT NULL CHECK ("from_id" <> "to_id"),
    "to_id" INTEGER NOT NULL,
    "trust" INTEGER NOT NULL CHECK ("trust" >= 1 AND "trust" <= 5),

    CONSTRAINT "trust_pkey" PRIMARY KEY ("from_id","to_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prize_name_web_name_key" ON "prize"("name", "web_name");

-- CreateIndex
CREATE UNIQUE INDEX "human_name_web_name_key" ON "human"("name", "web_name");

-- AddForeignKey
ALTER TABLE "prize" ADD CONSTRAINT "prize_web_name_fkey" FOREIGN KEY ("web_name") REFERENCES "web"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "human" ADD CONSTRAINT "human_prize_id_fkey" FOREIGN KEY ("prize_id") REFERENCES "prize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "human" ADD CONSTRAINT "human_web_name_fkey" FOREIGN KEY ("web_name") REFERENCES "web"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trust" ADD CONSTRAINT "trust_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "human"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trust" ADD CONSTRAINT "trust_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "human"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
