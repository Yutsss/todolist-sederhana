/*
  Warnings:

  - You are about to alter the column `dueDate` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `dueDate` DATETIME NULL;

-- CreateIndex
CREATE INDEX `blacklisted_tokens_token_idx` ON `blacklisted_tokens`(`token`);

-- CreateIndex
CREATE INDEX `users_email_idx` ON `users`(`email`);
