/*
  Warnings:

  - You are about to drop the `PostOnRegions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostOnRegions" DROP CONSTRAINT "PostOnRegions_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostOnRegions" DROP CONSTRAINT "PostOnRegions_regionId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "region_id" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "PostOnRegions";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_region_id_fkey" FOREIGN KEY ("region_id") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
