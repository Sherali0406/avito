/*
  Warnings:

  - Added the required column `soldQuantity` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalQuantity` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "soldQuantity" INTEGER NOT NULL,
ADD COLUMN     "totalQuantity" INTEGER NOT NULL;
