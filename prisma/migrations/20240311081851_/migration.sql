/*
  Warnings:

  - You are about to drop the column `address` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "address";

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "parentId" INTEGER DEFAULT 0,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Region" ADD CONSTRAINT "Region_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;
