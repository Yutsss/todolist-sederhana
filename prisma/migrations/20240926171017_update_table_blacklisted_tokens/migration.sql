/*
  Warnings:

  - You are about to alter the column `dueDate` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `expiry` to the `blacklisted_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blacklisted_tokens` ADD COLUMN `expiry` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tasks` MODIFY `dueDate` DATETIME NULL;
