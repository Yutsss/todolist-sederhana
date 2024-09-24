/*
  Warnings:

  - You are about to alter the column `dueDate` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `dueDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
