/*
  Warnings:

  - Made the column `cardId` on table `Tenant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Tenant` MODIFY `phone` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `cardId` VARCHAR(191) NOT NULL DEFAULT '';
