/*
  Warnings:

  - You are about to drop the column `sub_category_id` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_sub_category_id_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "sub_category_id",
ADD COLUMN     "parentId" INTEGER DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
