/*
  Warnings:

  - You are about to drop the column `rentTimeType` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `rentType` on the `Order` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `rentTimeType`,
    DROP COLUMN `rentType`,
    ADD COLUMN `priceType` ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY') NOT NULL DEFAULT 'MONTHLY',
    ADD COLUMN `totalPrice` INTEGER NOT NULL,
    MODIFY `contractId` VARCHAR(191) NULL;
