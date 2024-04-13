/*
  Warnings:

  - You are about to drop the column `userId` on the `Listing` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `Listing` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `code` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `userId`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    MODIFY `status` INTEGER NOT NULL DEFAULT 0;
