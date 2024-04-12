/*
  Warnings:

  - You are about to drop the column `rating` on the `Review` table. All the data in the column will be lost.
  - Made the column `phone` on table `Landlord` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ratingId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Landlord` ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `phone` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Review` DROP COLUMN `rating`,
    ADD COLUMN `ratingId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cleanliness` DOUBLE NOT NULL,
    `description` DOUBLE NOT NULL,
    `checkIn` DOUBLE NOT NULL,
    `communication` DOUBLE NOT NULL,
    `location` DOUBLE NOT NULL,
    `value` DOUBLE NOT NULL,
    `totalScore` DOUBLE NOT NULL,
    `listingId` VARCHAR(191) NOT NULL,
    `reviewId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Rating_reviewId_key`(`reviewId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
