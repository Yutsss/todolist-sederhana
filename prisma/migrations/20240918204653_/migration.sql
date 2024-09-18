/*
  Warnings:

  - You are about to alter the column `dueDate` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[token]` on the table `blacklisted_tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tasks` MODIFY `dueDate` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `blacklisted_tokens_token_key` ON `blacklisted_tokens`(`token`);
