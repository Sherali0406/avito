/*
  Warnings:

  - Added the required column `price` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL,
ADD COLUMN     "viewsCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PostView" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PostView_pkey" PRIMARY KEY ("postId","userId")
);

-- CreateIndex
CREATE INDEX "PostView_userId_idx" ON "PostView"("userId");

-- AddForeignKey
ALTER TABLE "PostView" ADD CONSTRAINT "PostView_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostView" ADD CONSTRAINT "PostView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
