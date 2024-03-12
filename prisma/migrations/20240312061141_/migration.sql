/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `User` table. All the data in the column will be lost.
  - Added the required column `address` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "refresh_token";
