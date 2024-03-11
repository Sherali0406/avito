-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL,
    "characteristics" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "region_name" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "Sub_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
