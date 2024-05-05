/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ratingId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Rating` DROP FOREIGN KEY `Rating_reviewId_fkey`;

-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `reviewId`;

-- CreateIndex
CREATE UNIQUE INDEX `Review_ratingId_key` ON `Review`(`ratingId`);

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_ratingId_fkey` FOREIGN KEY (`ratingId`) REFERENCES `Rating`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
