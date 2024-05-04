/*
  Warnings:

  - You are about to drop the column `common_count` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "common_count",
ADD COLUMN     "comment_count" INTEGER NOT NULL DEFAULT 0;
