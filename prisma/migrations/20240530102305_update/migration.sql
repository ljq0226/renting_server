-- AlterTable
ALTER TABLE `Listing` MODIFY `about` LONGTEXT NOT NULL,
    MODIFY `listingIntro` LONGTEXT NOT NULL,
    MODIFY `others` LONGTEXT NOT NULL,
    MODIFY `tenantPermission` LONGTEXT NOT NULL;
