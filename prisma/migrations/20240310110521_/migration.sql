/*
  Warnings:

  - The `main_photo` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `photos` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "main_photo",
ADD COLUMN     "main_photo" TEXT[],
DROP COLUMN "photos",
ADD COLUMN     "photos" TEXT[];
