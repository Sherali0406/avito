/*
  Warnings:

  - You are about to drop the column `region_name` on the `Post` table. All the data in the column will be lost.
  - Added the required column `address` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main_photo` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photos` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "region_name",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "main_photo" TEXT NOT NULL,
ADD COLUMN     "photos" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "token" TEXT,
    "role" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
