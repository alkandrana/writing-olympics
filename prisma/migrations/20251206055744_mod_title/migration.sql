/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Goal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Goal_title_key` ON `Goal`(`title`);
