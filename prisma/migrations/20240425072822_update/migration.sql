/*
  Warnings:

  - You are about to drop the column `endTime` on the `Contract` table. All the data in the column will be lost.
  - Added the required column `listingId` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingTitle` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listingTitle` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contract` DROP COLUMN `endTime`,
    ADD COLUMN `listingId` VARCHAR(191) NOT NULL,
    ADD COLUMN `listingTitle` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `listingId` VARCHAR(191) NOT NULL,
    ADD COLUMN `listingTitle` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
