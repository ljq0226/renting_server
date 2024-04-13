/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Landlord` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Tenant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `username` VARCHAR(191) NOT NULL DEFAULT 'admin',
    MODIFY `role` ENUM('LANDLORD', 'ADMIN', 'VISITOR') NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE `Landlord` MODIFY `username` VARCHAR(191) NOT NULL DEFAULT 'landlord',
    MODIFY `role` ENUM('LANDLORD', 'ADMIN', 'VISITOR') NOT NULL DEFAULT 'LANDLORD';

-- CreateIndex
CREATE UNIQUE INDEX `Admin_username_key` ON `Admin`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Landlord_username_key` ON `Landlord`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Tenant_username_key` ON `Tenant`(`username`);
