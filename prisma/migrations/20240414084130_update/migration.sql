-- DropIndex
DROP INDEX `Listing_landlordId_fkey` ON `Listing`;

-- AlterTable
ALTER TABLE `Listing` MODIFY `isChecked` INTEGER NOT NULL DEFAULT 0;
