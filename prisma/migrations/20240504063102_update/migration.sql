/*
  Warnings:

  - You are about to drop the column `isRetail` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Landlord` ADD COLUMN `cardId` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `isUpdate` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `realname` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `signature` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `isRetail`,
    ADD COLUMN `isShortTermRental` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Tenant` ADD COLUMN `isUpdate` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `realname` VARCHAR(191) NOT NULL DEFAULT '';
