/*
  Warnings:

  - Made the column `landlordId` on table `Listing` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Listing` DROP FOREIGN KEY `Listing_landlordId_fkey`;

-- AlterTable
ALTER TABLE `Listing` MODIFY `landlordId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_landlordId_fkey` FOREIGN KEY (`landlordId`) REFERENCES `Landlord`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
