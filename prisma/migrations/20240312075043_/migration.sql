/*
  Warnings:

  - You are about to drop the column `characteristics` on the `Post` table. All the data in the column will be lost.
  - Added the required column `characteristics_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "characteristics",
ADD COLUMN     "characteristics_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Characteristics" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_year" INTEGER NOT NULL,

    CONSTRAINT "Characteristics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_characteristics_id_fkey" FOREIGN KEY ("characteristics_id") REFERENCES "Characteristics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
