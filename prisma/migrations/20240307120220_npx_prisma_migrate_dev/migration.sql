/*
  Warnings:

  - Added the required column `sub_category_id` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "sub_category_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Sub_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Sub_category_pkey" PRIMARY KEY ("id")
);
