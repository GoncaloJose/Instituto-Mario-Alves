/*
  Warnings:

  - You are about to drop the `_historicotolivro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `livroId` to the `historicos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_historicotolivro` DROP FOREIGN KEY `_HistoricoToLivro_A_fkey`;

-- DropForeignKey
ALTER TABLE `_historicotolivro` DROP FOREIGN KEY `_HistoricoToLivro_B_fkey`;

-- AlterTable
ALTER TABLE `historicos` ADD COLUMN `livroId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_historicotolivro`;

-- AddForeignKey
ALTER TABLE `historicos` ADD CONSTRAINT `historicos_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `livros`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
