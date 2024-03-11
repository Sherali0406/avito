-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
