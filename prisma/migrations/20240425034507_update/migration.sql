/*
  Warnings:

  - Added the required column `landlordName` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tenantName` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` ADD COLUMN `landlordName` VARCHAR(191) NOT NULL,
    ADD COLUMN `tenantName` VARCHAR(191) NOT NULL;
