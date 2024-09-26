/*
  Warnings:

  - You are about to alter the column `dueDate` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Changed the type of `expiry` on the `blacklisted_tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `blacklisted_tokens` DROP COLUMN `expiry`,
    ADD COLUMN `expiry` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tasks` MODIFY `dueDate` DATETIME NULL;
