/*
  Warnings:

  - A unique constraint covering the columns `[livroId]` on the table `reservas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `livros` ADD COLUMN `reservaId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `reservas_livroId_key` ON `reservas`(`livroId`);
