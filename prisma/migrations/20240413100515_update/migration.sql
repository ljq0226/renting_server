/*
  Warnings:

  - You are about to drop the column `listingAboutId` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the `ListingAbout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ListingAbout` DROP FOREIGN KEY `ListingAbout_listingId_fkey`;

-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `listingAboutId`,
    ADD COLUMN `about` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `listingIntro` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `others` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `tenantPermission` VARCHAR(191) NOT NULL DEFAULT '';

-- DropTable
DROP TABLE `ListingAbout`;
