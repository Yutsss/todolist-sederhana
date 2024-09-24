/*
  Warnings:

  - You are about to alter the column `dueDate` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[googleId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `dueDate` DATETIME NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `googleId` VARCHAR(100) NULL,
    MODIFY `password` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_googleId_key` ON `users`(`googleId`);
