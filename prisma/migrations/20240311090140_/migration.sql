/*
  Warnings:

  - You are about to drop the column `region_id` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_region_id_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "region_id";

-- CreateTable
CREATE TABLE "PostOnRegions" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "PostOnRegions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostOnRegions" ADD CONSTRAINT "PostOnRegions_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOnRegions" ADD CONSTRAINT "PostOnRegions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
