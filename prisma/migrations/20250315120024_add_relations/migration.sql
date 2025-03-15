-- CreateTable
CREATE TABLE "NFTMinting" (
    "id" SERIAL NOT NULL,
    "nftId" TEXT NOT NULL,
    "nftName" TEXT NOT NULL,
    "nftDescription" TEXT NOT NULL,
    "nftImage" TEXT NOT NULL,
    "nftPrice" TEXT NOT NULL,
    "nftOwnerAddress" TEXT NOT NULL,
    "nftCreatorAddress" TEXT NOT NULL,
    "nftStatus" TEXT NOT NULL,
    "nftCreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nftUpdatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NFTMinting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predicateEntry" (
    "id" SERIAL NOT NULL,
    "sellerId" TEXT NOT NULL,
    "predicateId" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "config" JSONB NOT NULL,

    CONSTRAINT "predicateEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFTMinting_nftId_key" ON "NFTMinting"("nftId");

-- CreateIndex
CREATE UNIQUE INDEX "predicateEntry_predicateId_key" ON "predicateEntry"("predicateId");

-- AddForeignKey
ALTER TABLE "predicateEntry" ADD CONSTRAINT "predicateEntry_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "NFTMinting"("nftId") ON DELETE RESTRICT ON UPDATE CASCADE;
