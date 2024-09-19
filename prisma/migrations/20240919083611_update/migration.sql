/*
  Warnings:

  - You are about to alter the column `dueDate` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_cardId_fkey`;

-- AlterTable
ALTER TABLE `tasks` MODIFY `dueDate` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `cards`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
