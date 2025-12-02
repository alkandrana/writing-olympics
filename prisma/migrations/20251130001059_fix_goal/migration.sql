/*
  Warnings:

  - Added the required column `title` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Goal` ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `start` DATE NOT NULL,
    MODIFY `stop` DATE NOT NULL;
