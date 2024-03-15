-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "soldQuantity" DROP NOT NULL,
ALTER COLUMN "soldQuantity" SET DEFAULT 0;
